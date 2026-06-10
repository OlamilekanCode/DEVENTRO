import type { D1Database } from "@cloudflare/workers-types";

export type CloudflareEnv = {
  DB: D1Database;
};
