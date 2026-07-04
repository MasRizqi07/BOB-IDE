import { NextResponse } from "next/server";

/**
 * POST /api/contact
 *
 * Current implementation: validates the payload and returns a success response
 * so the frontend can be wired to a real email provider with minimal changes.
 *
 * ─── To use Resend ───────────────────────────────────────────────────────────
 *  1. npm install resend
 *  2. Add RESEND_API_KEY to .env.local
 *  3. Uncomment the Resend block below and remove the mock success.
 *
 * ─── To use Formspree ────────────────────────────────────────────────────────
 *  Replace this route entirely with a direct client-side fetch() to
 *  https://formspree.io/f/{NEXT_PUBLIC_FORMSPREE_ID}
 */

interface ContactBody {
  name: string;
  email: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: Partial<ContactBody>;

  try {
    body = (await request.json()) as Partial<ContactBody>;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  const { name, email, message } = body;

  /* ── Validation ── */
  if (!name?.trim()) {
    return NextResponse.json({ error: "Name is required." }, { status: 422 });
  }
  if (!email?.trim() || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "A valid email address is required." },
      { status: 422 }
    );
  }
  if (!message?.trim() || message.trim().length < 20) {
    return NextResponse.json(
      { error: "Message must be at least 20 characters." },
      { status: 422 }
    );
  }

  /* ── Send via Resend (uncomment when RESEND_API_KEY is set) ── *
  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: "Portfolio <no-reply@pacoel.dev>",
    to: ["hello@pacoel.dev"],
    subject: `Portfolio inquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });
  if (error) {
    console.error("[contact] Resend error:", error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
  * ─────────────────────────────────────────────────────────────── */

  /* ── Mock success (remove once a real provider is wired up) ── */
  console.info(`[contact] Message from ${name} <${email}>`);

  return NextResponse.json(
    { success: true, message: "Message received." },
    { status: 200 }
  );
}
