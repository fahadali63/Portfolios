"use client";

import { ArrowRight, Check, Loader2, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";
import { contact } from "@/content/contact";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string } | { kind: "mailto"; href: string };
type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

const endpoint = contact.formEndpoint;

/**
 * Contact form.
 * - Default: never pretends to send — "Continue in email" opens the visitor's email app with the message filled in.
 * - With NEXT_PUBLIC_FORM_ENDPOINT set: POSTs there (with a honeypot) and shows sending / sent / error honestly.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<Errors>({});

  function validate(data: FormData): Errors {
    const e: Errors = {};
    if (!String(data.get("name") || "").trim()) e.name = "Add your name.";
    const email = String(data.get("email") || "").trim();
    if (!email) e.email = "Add your email so I can reply.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Check the email address — it should look like name@example.com.";
    if (!String(data.get("subject") || "").trim()) e.subject = "Add a subject.";
    if (String(data.get("message") || "").trim().length < 10) e.message = "Write a few words about the role, project or opportunity.";
    return e;
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = new FormData(form);
    if (String(data.get("company") || "")) return; // honeypot
    const e = validate(data);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(e)[0]}"]`);
      first?.focus();
      return;
    }
    if (!endpoint) {
      const body = `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`;
      const href = `mailto:${contact.email}?subject=${encodeURIComponent(String(data.get("subject")))}&body=${encodeURIComponent(body)}`;
      setStatus({ kind: "mailto", href });
      window.location.href = href;
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const res = await fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus({ kind: "sent" });
    } catch {
      setStatus({ kind: "error", message: `The message didn't send. Your text is still here — try again, or email ${contact.email} directly.` });
    }
  }

  if (status.kind === "sent") {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center text-center" role="status">
        <span className="grid h-14 w-14 place-items-center rounded-full border border-[var(--glass-border)]">
          <Check size={24} strokeWidth={1.75} aria-hidden="true" />
        </span>
        <p className="t-heading mt-5">Message sent.</p>
        <p className="t-body mt-2">Thanks — I&apos;ll reply by email.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5" aria-describedby="form-note">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" error={errors.name} />
        <Field label="Email" name="email" type="email" autoComplete="email" inputMode="email" error={errors.email} />
      </div>
      <Field label="Subject" name="subject" error={errors.subject} />
      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className="input"
          placeholder="A few lines about the role, project or opportunity"
          aria-invalid={!!errors.message || undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="field-error">
            {errors.message}
          </p>
        )}
      </div>
      <div aria-hidden="true" className="hidden">
        <label>
          Company <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id="form-note" className="t-meta">
          {endpoint ? "I usually reply within a couple of days." : "Opens your email app with this message ready to send."}
        </p>
        <button type="submit" className="btn btn-primary" data-track="planning" disabled={status.kind === "sending"}>
          {status.kind === "sending" ? (
            <>
              Sending <Loader2 size={18} className="animate-spin" aria-hidden="true" />
            </>
          ) : endpoint ? (
            <>
              Send message <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
            </>
          ) : (
            <>
              Continue in email <Mail size={18} strokeWidth={1.75} aria-hidden="true" />
            </>
          )}
        </button>
      </div>
      <div aria-live="polite" className="t-body">
        {status.kind === "error" && <p className="field-error !text-[0.9375rem]">{status.message}</p>}
        {status.kind === "mailto" && (
          <p>
            Your email app should have opened. If it didn&apos;t,{" "}
            <a href={status.href} className="underline underline-offset-4">
              open it here
            </a>{" "}
            or write to {contact.email}.
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  inputMode,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "email" | "text";
  error?: string;
}) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="input"
        aria-invalid={!!error || undefined}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}
