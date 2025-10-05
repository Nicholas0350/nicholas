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
  const base = pitch || "AFSL compliance officer retainer";
  const reply = input ? `${base}` : base;

  return new Response(reply, {
    status: 200,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}

