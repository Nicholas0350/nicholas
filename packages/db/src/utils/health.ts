import { sql } from "drizzle-orm";
import { db } from "../client";

export async function checkHealth() {
  // Use executeOnReplica if available (replicas configured), otherwise use execute
  if ('executeOnReplica' in db && typeof db.executeOnReplica === 'function') {
    await db.executeOnReplica(sql`SELECT 1`);
  } else {
    await db.execute(sql`SELECT 1`);
  }
}
