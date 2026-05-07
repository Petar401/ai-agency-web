'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { Input, Select, Textarea } from '@/components/ui/Field';
import { site } from '@/content/site';

type Status = 'idle' | 'submitting' | 'success' | 'error';

type Errors = Partial<Record<'name' | 'company' | 'email' | 'message', string>>;

function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function CTA() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState<string>('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const company = String(data.get('company') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const size = String(data.get('size') ?? '');
    const text = String(data.get('message') ?? '').trim();

    const next: Errors = {};
    if (!name) next.name = 'Please add your name.';
    if (!company) next.company = 'Please add your business.';
    if (!email) next.email = 'Email is required.';
    else if (!validateEmail(email)) next.email = 'Please use a valid email.';

    if (Object.keys(next).length > 0) {
      setErrors(next);
      setStatus('idle');
      setMessage('');
      return;
    }

    setErrors({});
    setStatus('submitting');
    setMessage('');

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company, email, size, message: text }),
      });
      if (!res.ok) throw new Error('non-2xx');
      setStatus('success');
      setMessage(`${site.cta.successMessage.replace('—', '—')}`);
      form.reset();
    } catch {
      setStatus('error');
      setMessage(
        'Something went wrong sending that. Please email hello@norfolkai.co.uk and we’ll pick it up.',
      );
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="px-4 sm:px-7">
      <div className="container pb-24">
        <div className="on-dark relative overflow-hidden rounded-3xl bg-panel p-8 text-white sm:p-14 lg:p-20">
          {/* glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[-200px] h-[500px] w-[1100px] -translate-x-1/2 glow-top opacity-50"
          />
          <div className="relative">
            <span className="text-eyebrow uppercase text-ink-3">{site.cta.eyebrow}</span>
            <h2 id="contact-title" className="mt-3 max-w-3xl text-display-lg text-white">
              {site.cta.title}
            </h2>
            <p className="mt-4 max-w-[620px] text-base leading-relaxed text-ink-2 sm:text-[17px]">
              {site.cta.description}
            </p>

            <form onSubmit={onSubmit} noValidate className="mt-10 grid max-w-3xl gap-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  label="Name"
                  name="name"
                  autoComplete="name"
                  placeholder="Your name"
                  error={errors.name}
                />
                <Input
                  label="Business"
                  name="company"
                  autoComplete="organization"
                  placeholder="Company name"
                  error={errors.company}
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.co.uk"
                  error={errors.email}
                />
                <Select label="Team size" name="size" defaultValue="1">
                  <option value="1">1–10 (small business)</option>
                  <option value="2">11–50</option>
                  <option value="3">51–250 (internal agent)</option>
                  <option value="4">250+</option>
                </Select>
              </div>
              <Textarea
                label="What should we automate first?"
                name="message"
                rows={3}
                placeholder="A quick line about your biggest time-sink…"
              />
              <div className="mt-2 flex flex-wrap items-center gap-4">
                <Button
                  type="submit"
                  disabled={status === 'submitting'}
                  leadingIcon={
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17 17 7" />
                      <path d="M8 7h9v9" />
                    </svg>
                  }
                >
                  {status === 'submitting' ? 'Sending…' : site.cta.submitLabel}
                </Button>
                <span className="text-[13px] text-ink-3">
                  No spam. We reply within one working day.
                </span>
              </div>
              <p
                role="status"
                aria-live="polite"
                className={
                  status === 'success'
                    ? 'mt-2 text-[14px] text-emerald-200'
                    : status === 'error'
                      ? 'mt-2 text-[14px] text-rose-200'
                      : 'sr-only'
                }
              >
                {message}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
