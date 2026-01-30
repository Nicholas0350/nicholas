"use server";

import { Cookies } from "@/utils/constants";
import { createClient } from "@midday/supabase/server";
import { addYears } from "date-fns";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { actionClient } from "./safe-action";

export const devPasswordSignInAction = actionClient
  .schema(
    z.object({
      email: z.string().email(),
      password: z.string(),
      redirectTo: z.string(),
    }),
  )
  .action(async ({ parsedInput: { email, password, redirectTo } }) => {
    // Only allow in development
    if (process.env.NODE_ENV !== "development") {
      throw new Error("Dev login only available in development mode");
    }

    // Hardcoded dev credentials
    const DEV_EMAIL = "compliance@nicholasgousis.com";
    const DEV_PASSWORD = "dev123";
    const DEV_USER_ID = "00000000-0000-0000-0000-000000000001";

    if (email !== DEV_EMAIL || password !== DEV_PASSWORD) {
      throw new Error("Invalid dev credentials");
    }

    const supabase = await createClient();

    // Verify dev user exists in database
    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("id", DEV_USER_ID)
      .single();

    if (!user) {
      throw new Error("Dev user not found in database. Run seed script first.");
    }

    // For local dev, we'll use admin client to create a session token
    const adminClient = await createClient({ admin: true });
    
    // Generate a magic link which creates a session
    const { data, error } = await adminClient.auth.admin.generateLink({
      type: "magiclink",
      email: DEV_EMAIL,
    });

    if (error || !data) {
      console.error("Dev login error:", error);
      throw new Error("Failed to create dev session");
    }

    // Extract the token from the magic link and verify it
    const url = new URL(data.properties.action_link);
    const token = url.searchParams.get("token");
    const tokenHash = url.searchParams.get("token_hash");

    if (token && tokenHash) {
      // Verify the OTP to create the session
      await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: "magiclink",
      });
    }

    (await cookies()).set(Cookies.PreferredSignInProvider, "dev", {
      expires: addYears(new Date(), 1),
    });

    redirect(redirectTo || "/");
  });
