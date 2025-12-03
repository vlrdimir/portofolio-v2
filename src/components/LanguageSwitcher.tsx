"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "id" : "en";

    // Update the cookie
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

    // Trigger a page refresh with transition
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <button
      onClick={toggleLanguage}
      disabled={isPending}
      className="border-border hover:border-primary/40 hover:bg-secondary-hover/50 flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50"
      aria-label="Switch language"
    >
      <span className="text-base">{locale === "en" ? "🇬🇧" : "🇮🇩"}</span>
      <span>{locale === "en" ? "EN" : "ID"}</span>
    </button>
  );
}
