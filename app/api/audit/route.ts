import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type AuditPayload = {
  name: string;
  company: string;
  email: string;
  size?: string;
  message?: string;
};

function isString(v: unknown): v is string {
  return typeof v === 'string';
}

function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validate(body: unknown):
  | { ok: true; data: AuditPayload }
  | { ok: false; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  if (!body || typeof body !== 'object') {
    return { ok: false, errors: { _: 'Invalid payload.' } };
  }
  const b = body as Record<string, unknown>;

  const name = isString(b.name) ? b.name.trim() : '';
  const company = isString(b.company) ? b.company.trim() : '';
  const email = isString(b.email) ? b.email.trim() : '';
  const size = isString(b.size) ? b.size.trim() : undefined;
  const message = isString(b.message) ? b.message.trim() : undefined;

  if (!name) errors.name = 'Required.';
  if (!company) errors.company = 'Required.';
  if (!email) errors.email = 'Required.';
  else if (!validateEmail(email)) errors.email = 'Invalid email.';
  if (name.length > 200) errors.name = 'Too long.';
  if (company.length > 200) errors.company = 'Too long.';
  if (email.length > 320) errors.email = 'Too long.';
  if (message && message.length > 4000) errors.message = 'Please shorten your message.';

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data: { name, company, email, size, message } };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, errors: { _: 'Invalid JSON.' } }, { status: 400 });
  }

  const result = validate(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 400 });
  }

  // v1: log the lead. To wire to Resend / HubSpot / a database later, replace
  // this block with a call to that integration. Keep the fields stable.
  const { name, company, email, size, message } = result.data;
  console.log(
    JSON.stringify({
      kind: 'audit_request',
      receivedAt: new Date().toISOString(),
      name,
      company,
      email,
      size,
      messagePreview: message ? message.slice(0, 200) : undefined,
    }),
  );

  return NextResponse.json({ ok: true });
}
