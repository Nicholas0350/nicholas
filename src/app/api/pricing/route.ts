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

  return new Response(text, {
    status: 200,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}

