import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "../types";

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is required but not set. Please configure it in your .env.local file.",
    );
  }

  if (!anonKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY is required but not set. Please configure it in your .env.local file.",
    );
  }

  return createBrowserClient<Database>(supabaseUrl, anonKey);
};
