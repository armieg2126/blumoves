import Anthropic from "@anthropic-ai/sdk";

export const runtime = "nodejs";

const MODEL = "claude-3-5-sonnet-latest";
const MAX_TURNS = 20;

const SYSTEM_PROMPT = `You are the BluMoves assistant, a friendly, concise moving-quote helper for BluMoves, a local moving company serving Northern NJ and Morris County. Tagline: Easy & Done. Phone: 973-216-0926.
Your job: help the visitor get a moving estimate and capture their contact info as a lead.
Flow:
1. Greet warmly, ask what they're moving (home size like studio/1BR/2BR/3BR+, key heavy items, any stairs/elevator).
2. Ask where they're moving FROM and TO (town or ZIP), and their ideal date.
3. Give a ROUGH BALLPARK RANGE only — never a firm quote. Frame it clearly as an estimate, e.g. 'Most local moves like this usually run roughly $X–$Y, but your exact price depends on the details.' Use realistic local Northern NJ pricing as a guide: local moving crews are typically 2–3 movers, with most small apartment moves landing a few hundred to ~$1,500, and larger homes higher. Keep estimates reasonable for suburban NJ (do NOT quote inflated NYC prices).
4. ALWAYS finish by collecting their NAME and PHONE NUMBER, and tell them: 'We'll call you shortly with your exact, final price.' Make clear the final price comes from a real person at BluMoves.
Rules: Keep replies short and human. Never promise a guaranteed price. Never invent fake discounts. If asked something off-topic, gently steer back to their move. If they're ready to book, tell them to call 973-216-0926.`;

export async function POST(req) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "The assistant isn't configured yet. Please call us at 973-216-0926." },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const incoming = Array.isArray(body?.messages) ? body.messages : [];

  // Only keep user/assistant turns with string content, capped to the last ~20.
  const messages = incoming
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim() !== ""
    )
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, content: m.content }));

  if (messages.length === 0) {
    return Response.json({ error: "No message to respond to." }, { status: 400 });
  }

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const mstream = anthropic.messages.stream({
          model: MODEL,
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages,
        });

        mstream.on("text", (text) => {
          controller.enqueue(encoder.encode(text));
        });

        await mstream.finalMessage();
        controller.close();
      } catch (err) {
        const msg =
          "\n\nSorry — I'm having trouble right now. Please call us at 973-216-0926.";
        controller.enqueue(encoder.encode(msg));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
