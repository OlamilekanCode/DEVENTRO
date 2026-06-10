export const ADMIN_SESSION_COOKIE = "deventro_admin_session";

const SESSION_DURATION_SECONDS = 60 * 60 * 8;

type AdminSession = {
  email: string;
  expiresAt: number;
};

type AdminConfig = {
  email?: string;
  password?: string;
  sessionSecret?: string;
};

const encoder = new TextEncoder();

const getAdminConfig = (): AdminConfig => ({
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
  sessionSecret: process.env.ADMIN_SESSION_SECRET,
});

const base64UrlEncode = (value: string | ArrayBuffer): string => {
  const bytes =
    typeof value === "string"
      ? encoder.encode(value)
      : new Uint8Array(value);

  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
};

const base64UrlDecode = (value: string): string => {
  const padded = value.padEnd(value.length + ((4 - (value.length % 4)) % 4), "=");
  const binary = atob(padded.replaceAll("-", "+").replaceAll("_", "/"));
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  return new TextDecoder().decode(bytes);
};

const sign = async (payload: string, secret: string): Promise<string> => {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));

  return base64UrlEncode(signature);
};

const safeEqual = async (left: string, right: string): Promise<boolean> => {
  const [leftHash, rightHash] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(left)),
    crypto.subtle.digest("SHA-256", encoder.encode(right)),
  ]);
  const leftBytes = new Uint8Array(leftHash);
  const rightBytes = new Uint8Array(rightHash);

  let diff = leftBytes.length ^ rightBytes.length;

  for (let index = 0; index < leftBytes.length; index += 1) {
    diff |= leftBytes[index] ^ (rightBytes[index] ?? 0);
  }

  return diff === 0;
};

export const isAdminConfigured = (): boolean => {
  const config = getAdminConfig();

  return Boolean(config.email && config.password && config.sessionSecret);
};

export const verifyAdminCredentials = async (
  email: string,
  password: string,
): Promise<boolean> => {
  const config = getAdminConfig();

  if (!config.email || !config.password) {
    return false;
  }

  const [emailMatches, passwordMatches] = await Promise.all([
    safeEqual(email.trim().toLowerCase(), config.email.trim().toLowerCase()),
    safeEqual(password, config.password),
  ]);

  return emailMatches && passwordMatches;
};

export const createAdminSessionCookie = async (email: string): Promise<string> => {
  const config = getAdminConfig();

  if (!config.sessionSecret) {
    throw new Error("ADMIN_SESSION_SECRET is required.");
  }

  const session: AdminSession = {
    email,
    expiresAt: Date.now() + SESSION_DURATION_SECONDS * 1000,
  };
  const payload = base64UrlEncode(JSON.stringify(session));
  const signature = await sign(payload, config.sessionSecret);

  return `${payload}.${signature}`;
};

export const getAdminSessionFromCookie = async (
  cookieValue?: string,
): Promise<AdminSession | null> => {
  const config = getAdminConfig();

  if (!cookieValue || !config.sessionSecret) {
    return null;
  }

  const [payload, signature] = cookieValue.split(".");

  if (!payload || !signature) {
    return null;
  }

  const expectedSignature = await sign(payload, config.sessionSecret);

  if (!(await safeEqual(signature, expectedSignature))) {
    return null;
  }

  try {
    const session = JSON.parse(base64UrlDecode(payload)) as AdminSession;

    if (!session.email || session.expiresAt < Date.now()) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
};

export const adminSessionCookieOptions = {
  httpOnly: true,
  maxAge: SESSION_DURATION_SECONDS,
  path: "/",
  sameSite: "lax" as const,
};

export const getAdminSessionCookieOptions = (requestUrl: string) => ({
  ...adminSessionCookieOptions,
  secure: new URL(requestUrl).protocol === "https:",
});

export const sanitizeAdminRedirect = (value: string | null): string => {
  if (!value || !value.startsWith("/admin") || value.startsWith("//")) {
    return "/admin";
  }

  return value;
};
