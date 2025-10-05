import { NextRequest } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

type Body = {
  input?: string;
  modifiers?: { role?: string; industry?: string; companySize?: string };
};

export async function POST(req: NextRequest) {
  let body: Body = {};
  try {
    body = (await req.json()) as Body;
  } catch {}

  const file = path.join(process.cwd(), ",Project/offers/asic-compliance-sprint/filled-offers-data.json");
  let pitch = "AFSL compliance officer retainer. Book a 14‑day sprint.";

  try {
    const raw = await fs.readFile(file, "utf8");
    const data = JSON.parse(raw) as any;
    const first = Array.isArray(data?.offers) ? data.offers[0] : undefined;
    const name = first?.name as string | undefined;
    const interval = first?.magicFramework?.interval as string | undefined;
    const goal = first?.magicFramework?.goal as string | undefined;
    if (name || interval || goal) {
      const parts = [name, goal ? `– ${goal}` : undefined, interval ? `in ${interval}` : undefined].filter(Boolean);
      pitch = parts.join(" ");
    }
  } catch {}

  const input = (body.input || "").trim();

  // Attempt dynamic AI streaming via Vercel AI SDK; fallback to static reply if unavailable
  try {
    const ai: any = await import("ai"); // dynamic to avoid hard dependency
    const provider: any = await import("@ai-sdk/openai");
    const { streamText } = ai;
    const { openai } = provider;

    const bundlePath = path.join(
      process.cwd(),
      ",Project/offers/asic-compliance-sprint/ai-bundles/hero.json"
    );
    let system =
      "You are Nicholas Gousis’s AFSL compliance retainer rep. Answer in <20 words, benefit-first. No legal advice or guarantees.";
    try {
      const rawB = await fs.readFile(bundlePath, "utf8");
      const bundle = JSON.parse(rawB) as any;
      if (bundle?.prompt?.system) system = String(bundle.prompt.system);
    } catch {}

    const contextBits = [pitch].filter(Boolean).join("\n");
    const userPrompt = input || "Explain the sprint value in one line.";

    const result = await streamText({
      model: openai("gpt-4o-mini"),
      system: `${system}\nPolicies: no refunds; no guaranteed outcomes; no legal advice.`,
      prompt: `Context:\n${contextBits}\n\nUser: ${userPrompt}`,
    });

    // Return streaming response (works when 'ai' is installed and key is set)
    if (typeof result?.toAIStreamResponse === "function") {
      return result.toAIStreamResponse();
    }
  } catch {
    // fall through to static
  }

  const base = pitch || "AFSL compliance officer retainer";
  const reply = input ? `${base}` : base;
  return new Response(reply, { status: 200, headers: { "content-type": "text/plain; charset=utf-8" } });
}
