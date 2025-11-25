"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "id" : "en");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="border-border hover:border-primary/40 hover:bg-secondary-hover/50 flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors"
      aria-label="Switch language"
    >
      <span className="text-base">{language === "en" ? "🇮🇩" : "🇬🇧"}</span>
      <span>{language === "en" ? "ID" : "EN"}</span>
    </button>
  );
}
