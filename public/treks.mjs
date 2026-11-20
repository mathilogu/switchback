import { getStore } from "@netlify/blobs";

export default async (req) => {
  const pass = process.env.TREK_PASSPHRASE;
  if (!pass) return new Response("TREK_PASSPHRASE not set", { status: 500 });
  if (req.headers.get("x-pass") !== pass) return new Response("Unauthorized", { status: 401 });
  const store = getStore("treks");
  if (req.method === "GET") {
    const d = await store.get("data", { type: "json" });
    return Response.json(d || { treks: [], del: {} });
  }
  if (req.method === "PUT") {
    let b;
    try { b = await req.json(); } catch { return new Response("Bad JSON", { status: 400 }); }
    if (!Array.isArray(b.treks) || JSON.stringify(b).length > 2e6) return new Response("Bad data", { status: 400 });
    await store.setJSON("data", { treks: b.treks, del: b.del || {} });
    return Response.json({ ok: true });
  }
  return new Response("Method not allowed", { status: 405 });
};

export const config = { path: "/api/treks" };
