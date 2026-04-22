import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// 1 request per 24 hours per IP, stored persistently in Upstash Redis
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(1, "24 h"),
  prefix: "contact_ratelimit",
});

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: "You can only send one message per day. Please try again tomorrow!" },
      { status: 429 }
    );
  }

  let body: { name?: string; email?: string; subject?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, subject, message } = body;

  // Server-side validation
  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Please complete the form above." }, { status: 400 });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.error("EmailJS environment variables are not configured.");
    return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
  }

  const emailjsPayload = {
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    template_params: { name, email, subject, message },
  };

  const emailjsResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(emailjsPayload),
  });

  if (!emailjsResponse.ok) {
    const errorText = await emailjsResponse.text();
    console.error("EmailJS error:", errorText);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 502 }
    );
  }

  // Rate limit already recorded by Upstash on the limit() call above
  return NextResponse.json({ success: true }, { status: 200 });
}
