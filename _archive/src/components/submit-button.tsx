"use client";

import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export function SubmitButton({ children, className, disabled }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <>
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {pending ? "Submitting…" : ""}
      </div>
      <button
        type="submit"
        disabled={pending || disabled}
        className={className}
        aria-busy={pending}
      >
        {pending ? "Please wait…" : children}
      </button>
    </>
  );
}
