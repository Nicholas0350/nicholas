import { createClient } from "@supabase/supabase-js";

export type Session = {
  user: {
    id: string;
    email?: string;
    full_name?: string;
  };
  teamId?: string;
};

export async function verifyAccessToken(
  accessToken?: string,
): Promise<Session | null> {
  if (!accessToken) {
    console.error("[auth] No access token provided");
    return null;
  }

  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_KEY;

    if (!supabaseUrl || !serviceKey) {
      console.error("[auth] SUPABASE_URL or SUPABASE_SERVICE_KEY not set");
      return null;
    }

    // Use Supabase admin client to verify the token
    const supabase = createClient(supabaseUrl, serviceKey);
    const { data, error } = await supabase.auth.getUser(accessToken);

    if (error || !data.user) {
      console.error("[auth] Supabase auth.getUser failed:", error?.message);
      return null;
    }

    console.error("[auth] User verified:", data.user.id);

    return {
      user: {
        id: data.user.id,
        email: data.user.email,
        full_name: data.user.user_metadata?.full_name,
      },
    };
  } catch (error) {
    console.error("[auth] Verification failed:", error instanceof Error ? error.message : error);
    return null;
  }
}
