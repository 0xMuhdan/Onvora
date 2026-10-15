import "server-only";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

const globalForDb = globalThis as unknown as {
  pgClient?: ReturnType<typeof postgres>;
  dbInstance?: ReturnType<typeof drizzle<typeof schema>>;
};

function getDbInstance() {
  if (!connectionString) {
    return null;
  }
  if (!globalForDb.dbInstance) {
    const client = globalForDb.pgClient ?? postgres(connectionString, { max: 10 });
    if (process.env.NODE_ENV !== "production") {
      globalForDb.pgClient = client;
    }
    globalForDb.dbInstance = drizzle(client, { schema });
  }
  return globalForDb.dbInstance;
}

export const db = new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
  get(_target, prop) {
    const instance = getDbInstance();
    if (!instance) {
      throw new Error(
        "DATABASE_URL is not set. Copy .env.example to .env.local and configure PostgreSQL.",
      );
    }
    return (instance as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export const isDbConfigured = Boolean(connectionString);
export { schema };
