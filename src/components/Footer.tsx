"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="mt-24 text-sm text-neutral-400">
      <p>{t("copyright", { year: new Date().getFullYear() })}</p>
    </footer>
  );
}
