"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

type NewsletterFormProps = {
  source: string;
  theme?: "dark" | "light";
};

type FormState = {
  message: string;
  tone: "idle" | "success" | "error";
};

const initialState: FormState = {
  message: "",
  tone: "idle",
};

export function NewsletterForm({
  source,
  theme = "light",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [state, setState] = useState<FormState>(initialState);
  const isDark = theme === "dark";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setState(initialState);

    const formData = new FormData();
    formData.set("email", email);
    formData.set("source", source);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        setState({
          message: payload.message ?? "Newsletter signup failed.",
          tone: "error",
        });
        return;
      }

      setEmail("");
      setState({
        message: payload.message ?? "You are on the DevEntro list.",
        tone: "success",
      });
    } catch {
      setState({
        message: "Newsletter signup is temporarily unavailable.",
        tone: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={
        isDark
          ? "rounded-md border border-background/15 bg-background/5 p-4 lg:self-end"
          : "rounded-md border border-border bg-card p-4 shadow-sm"
      }
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          name="email"
          placeholder="you@example.com"
          autoComplete="email"
          className={
            isDark
              ? "h-11 min-w-0 flex-1 rounded-md border border-background/20 bg-background px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-4 focus:ring-teal-500/20"
              : "h-11 min-w-0 flex-1 rounded-md border border-border bg-background px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10"
          }
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={
            isDark
              ? "inline-flex h-11 items-center justify-center gap-2 rounded-md bg-teal-500 px-5 text-sm font-semibold text-white transition-colors hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-70"
              : "inline-flex h-11 items-center justify-center gap-2 rounded-md bg-foreground px-5 text-sm font-semibold text-background transition-colors hover:bg-foreground/85 disabled:cursor-not-allowed disabled:opacity-70"
          }
        >
          {isSubmitting ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <CheckCircle2 className="size-4" aria-hidden="true" />
          )}
          {isSubmitting ? "Joining" : "Join list"}
        </button>
      </div>
      <p
        className={
          isDark
            ? "mt-3 text-xs leading-5 text-background/55"
            : "mt-3 text-xs leading-5 text-muted-foreground"
        }
      >
        Early notes on tool tests, workflow experiments, and practical AI
        systems. No spam.
      </p>
      {state.message ? (
        <p
          className={[
            "mt-3 text-sm font-medium",
            state.tone === "success"
              ? isDark
                ? "text-teal-200"
                : "text-teal-700"
              : "",
            state.tone === "error"
              ? isDark
                ? "text-rose-200"
                : "text-destructive"
              : "",
          ].join(" ")}
          role="status"
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
