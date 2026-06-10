import { drizzle } from "drizzle-orm/d1";

import * as schema from "@/db/schema";
import type { CloudflareEnv } from "@/types/cloudflare";

export const createDb = (env: CloudflareEnv) => {
  return drizzle(env.DB, { schema });
};

export type DbClient = ReturnType<typeof createDb>;
