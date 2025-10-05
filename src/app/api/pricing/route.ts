import { NextRequest } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

type Body = {
  input?: string;
  modifiers?: { role?: string; industry?: string; companySize?: string; seats?: number };
};

export async function POST(req: NextRequest) {
  let body: Body = {};
  try {
    body = (await req.json()) as Body;
  } catch {}

  const file = path.join(process.cwd(), ",Project/offers/asic-compliance-sprint/filled-offers-data.json");
  let text = "Tiers: 14-Day Sprint ($25k one-time), Autopilot System ($5k/mo), Forensic Audit ($35k one-time).";

  try {
    const raw = await fs.readFile(file, "utf8");
    const data = JSON.parse(raw) as any;
    const offer = Array.isArray(data?.offers) ? data.offers[0] : undefined;
    const price = offer?.price?.coreUSD ? `$${offer.price.coreUSD}` : undefined;
    const scarce = offer?.scarcity?.capacity ? `Limited to ${offer.scarcity.capacity} spots.` : undefined;
    const terms = offer?.price?.terms as string | undefined;
    const bits = [
      price ? `14-Day Sprint (${price} one-time)` : undefined,
      terms,
      scarce,
    ].filter(Boolean);
    if (bits.length) text = bits.join(" • ");
  } catch {}

  // Attempt dynamic AI streaming via Vercel AI SDK; fallback to static reply if unavailable
  try {
    const ai: any = await import("ai");
    const provider: any = await import("@ai-sdk/openai");
    const { streamText } = ai;
    const { openai } = provider;

    const bundlePath = path.join(
      process.cwd(),
      ",Project/offers/asic-compliance-sprint/ai-bundles/pricing.json"
    );
    let system =
      "Explain pricing succinctly, aligned to tiers. No legal advice. No guarantees. Be direct.";
    try {
      const rawB = await fs.readFile(bundlePath, "utf8");
      const bundle = JSON.parse(rawB) as any;
      if (bundle?.prompt?.system) system = String(bundle.prompt.system);
    } catch {}

    const prompt = (body.input || "What are the tiers?").toString();
    const grounding = text; // concise tier summary from JSON

    const result = await streamText({
      model: openai("gpt-4o-mini"),
      system: `${system}\nPolicies: no refunds; no guaranteed outcomes; no legal advice.`,
      prompt: `Context: ${grounding}\n\nQuestion: ${prompt}`,
    });
    if (typeof result?.toAIStreamResponse === "function") {
      return result.toAIStreamResponse();
    }
  } catch {
    // fall through
  }

  return new Response(text, { status: 200, headers: { "content-type": "text/plain; charset=utf-8" } });
}
