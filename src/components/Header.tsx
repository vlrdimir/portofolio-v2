"use client";

import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("Header");

  return (
    <header className="border-border/40 bg-background/80 sticky top-0 z-50 mb-16 flex items-center justify-between border-b px-0 py-3 backdrop-blur-md transition-all">
      <Link
        href="/"
        className="text-foreground hover:text-primary font-serif text-2xl font-bold tracking-tight transition-colors"
      >
        dw<span className="text-primary">.</span>
      </Link>
      <nav className="text-muted-foreground flex items-center gap-6 text-sm font-medium">
        <Link
          href="/projects"
          className="hover:text-primary hover:decoration-primary transition-colors hover:underline hover:decoration-wavy"
        >
          {t("projects")}
        </Link>
        <Link
          href="/now"
          className="hover:text-primary hover:decoration-primary transition-colors hover:underline hover:decoration-wavy"
        >
          {t("now")}
        </Link>
        <Link
          href="/about"
          className="hover:text-primary hover:decoration-primary transition-colors hover:underline hover:decoration-wavy"
        >
          {t("about")}
        </Link>
        <LanguageSwitcher />
      </nav>
    </header>
  );
}
