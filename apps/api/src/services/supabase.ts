import type { Database } from "@midday/supabase/types";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export async function createClient(accessToken?: string) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl) {
    throw new Error("SUPABASE_URL is required but not set in environment variables");
  }

  if (!serviceKey) {
    throw new Error("SUPABASE_SERVICE_KEY is required but not set in environment variables");
  }

  return createSupabaseClient<Database>(
    supabaseUrl,
    serviceKey,
    {
      accessToken() {
        return Promise.resolve(accessToken || "");
      },
    },
  );
}

export async function createAdminClient() {
  return createSupabaseClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
  );
}
