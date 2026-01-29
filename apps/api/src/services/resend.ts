import { Resend } from "resend";

// Only initialize Resend if API key is provided (optional for local dev)
export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : (null as unknown as Resend); // Type assertion for optional usage
