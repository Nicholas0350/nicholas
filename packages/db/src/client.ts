import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { withReplicas } from "./replicas";
import * as schema from "./schema";

const isDevelopment = process.env.NODE_ENV === "development";

const connectionConfig = {
  max: isDevelopment ? 8 : 12,
  idleTimeoutMillis: isDevelopment ? 5000 : 60000,
  connectionTimeoutMillis: 15000,
  maxUses: isDevelopment ? 100 : 0,
  allowExitOnIdle: true,
};

// Only create primary pool if URL is provided
const primaryPool = process.env.DATABASE_PRIMARY_URL
  ? new Pool({
      connectionString: process.env.DATABASE_PRIMARY_URL,
      ...connectionConfig,
    })
  : null;

// Only create replica pools if URLs are provided
const fraPool = process.env.DATABASE_FRA_URL
  ? new Pool({
      connectionString: process.env.DATABASE_FRA_URL,
      ...connectionConfig,
    })
  : null;

const sjcPool = process.env.DATABASE_SJC_URL
  ? new Pool({
      connectionString: process.env.DATABASE_SJC_URL,
      ...connectionConfig,
    })
  : null;

const iadPool = process.env.DATABASE_IAD_URL
  ? new Pool({
      connectionString: process.env.DATABASE_IAD_URL,
      ...connectionConfig,
    })
  : null;

const hasReplicas = Boolean(
  fraPool && sjcPool && iadPool,
);

// Connection pool monitoring function
export const getConnectionPoolStats = () => {
  const getPoolStats = (pool: Pool, name: string) => {
    try {
      return {
        name,
        total: pool.options.max || 0,
        idle: pool.idleCount || 0,
        active: pool.totalCount - pool.idleCount,
        waiting: pool.waitingCount || 0,
        ended: pool.ended || false,
      };
    } catch (error) {
      return {
        name,
        error: error instanceof Error ? error.message : String(error),
        total: 0,
        idle: 0,
        active: 0,
        waiting: 0,
        ended: true,
      };
    }
  };

  // Only include pools that are actually being used
  const pools: Record<string, any> = {};

  if (primaryPool) {
    pools.primary = getPoolStats(primaryPool, "primary");
  }

  // Only add replica pools if they're configured
  if (hasReplicas) {
    if (fraPool) pools.fra = getPoolStats(fraPool, "fra");
    if (sjcPool) pools.sjc = getPoolStats(sjcPool, "sjc");
    if (iadPool) pools.iad = getPoolStats(iadPool, "iad");
  }

  const poolArray = Object.values(pools);
  const totalActive = poolArray.reduce(
    (sum: number, pool: any) => sum + (pool.active || 0),
    0,
  );
  const totalWaiting = poolArray.reduce(
    (sum: number, pool: any) => sum + (pool.waiting || 0),
    0,
  );
  const hasExhaustedPools = poolArray.some(
    (pool: any) =>
      (pool.active || 0) >= (pool.total || 0) || (pool.waiting || 0) > 0,
  );

  const connectionsPerPool = isDevelopment ? 8 : 12; // Match the actual config
  const totalConnections = hasReplicas
    ? connectionsPerPool * 4
    : connectionsPerPool;

  return {
    timestamp: new Date().toISOString(),
    region: process.env.FLY_REGION || "unknown",
    instance: process.env.FLY_ALLOC_ID || "local",
    pools,
    summary: {
      totalConnections,
      totalActive,
      totalWaiting,
      hasExhaustedPools,
      utilizationPercent: Math.round((totalActive / totalConnections) * 100),
    },
  };
};

if (!primaryPool) {
  throw new Error(
    "DATABASE_PRIMARY_URL is required but not set. Please configure your database connection.",
  );
}

export const primaryDb = drizzle(primaryPool, {
  schema,
  casing: "snake_case",
});

const getReplicaIndexForRegion = () => {
  switch (process.env.FLY_REGION) {
    case "fra":
      return 0;
    case "iad":
      return 1;
    case "sjc":
      return 2;
    default:
      return 0;
  }
};

// Create the database instance once and export it
const replicaIndex = getReplicaIndexForRegion();

// Only use replicas if all are configured
export const db = hasReplicas && fraPool && sjcPool && iadPool
  ? withReplicas(
      primaryDb,
      [
        // Order of replicas is important
        drizzle(fraPool, {
          schema,
          casing: "snake_case",
        }),
        drizzle(iadPool, {
          schema,
          casing: "snake_case",
        }),
        drizzle(sjcPool, {
          schema,
          casing: "snake_case",
        }),
      ],
      (replicas) => replicas[replicaIndex]!,
    )
  : primaryDb;

// Keep connectDb for backward compatibility, but just return the singleton
export const connectDb = async () => {
  return db;
};

export type Database = Awaited<ReturnType<typeof connectDb>>;

export type DatabaseWithPrimary = Database & {
  $primary?: Database;
  usePrimaryOnly?: () => Database;
};
