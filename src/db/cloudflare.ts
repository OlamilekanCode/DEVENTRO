import { getCloudflareContext } from "@opennextjs/cloudflare";

import { createDb } from "@/db/client";

export const getDb = async () => {
  const { env } = await getCloudflareContext({ async: true });

  return createDb({ DB: env.DB });
};
