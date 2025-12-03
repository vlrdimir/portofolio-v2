"use client";

import { Github } from "lucide-react";
import AnimatedLink from "@/components/AnimatedLink";
import { useTranslations } from "next-intl";

const Highlight = ({ children }: { children: React.ReactNode }) => (
  <span className="text-primary font-serif font-medium italic">{children}</span>
);

export default function Portfolio() {
  const t = useTranslations("HomePage");

  return (
    <>
      {/* Welcome Section */}
      <section className="mb-20">
        <h1 className="mb-8 font-serif text-4xl font-bold tracking-tight md:text-5xl">
          {t("title")}
          <span className="text-primary">.</span>
        </h1>

        <div className="text-foreground space-y-6 leading-relaxed">
          <p className="text-lg">{t("greeting")}</p>
          <p>{t("intro1")}</p>
          <p>{t("intro2")}</p>
        </div>
      </section>

      {/* Journey Section */}
      <section className="mb-24" id="projects">
        <h2 className="mb-8 font-serif text-2xl font-bold tracking-tight">
          {t("journeyTitle")}
          <span className="text-primary">.</span>
        </h2>
        {/* Replaced list format with a narrative storytelling approach */}
        <div className="text-foreground space-y-6 leading-relaxed">
          <p>
            {t.rich("journey1", {
              phpNative: (chunks) => <Highlight>{chunks}</Highlight>,
              javascript: (chunks) => <Highlight>{chunks}</Highlight>,
            })}
          </p>
          <p>
            {t.rich("journey2", {
              tailwind: (chunks) => <Highlight>{chunks}</Highlight>,
              react: (chunks) => <Highlight>{chunks}</Highlight>,
              git: (chunks) => <Highlight>{chunks}</Highlight>,
              automationBots: (chunks) => <Highlight>{chunks}</Highlight>,
              university: (chunks) => <Highlight>{chunks}</Highlight>,
            })}
          </p>
        </div>
      </section>

      <div className="border-border/40 mb-12 border-t border-dashed" />

      {/* What's Next Section */}
      <section>
        <h2 className="mb-6 font-serif text-2xl font-bold tracking-tight">
          {t("connectTitle")}
          <span className="text-primary">.</span>
        </h2>
        <div className="text-foreground space-y-6">
          <p className="leading-relaxed">{t("connectDescription")}</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <AnimatedLink
              href="mailto:your.email@example.com"
              className="group border-border/50 bg-card hover:border-primary/40 hover:bg-secondary-hover/50 flex items-center gap-4 rounded-lg border p-4 transition-all hover:shadow-sm"
            >
              <div className="bg-secondary group-hover:bg-secondary-hover border-border/20 flex h-10 w-10 items-center justify-center rounded-full border transition-colors">
                <svg
                  className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-foreground font-serif font-medium">
                  {t("emailTitle")}
                </div>
                <div className="text-muted-foreground font-mono text-sm">
                  {t("emailSubtitle")}
                </div>
              </div>
            </AnimatedLink>

            <AnimatedLink
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group border-border/50 bg-card hover:border-primary/40 hover:bg-secondary-hover/50 flex items-center gap-4 rounded-lg border p-4 transition-all hover:shadow-sm"
            >
              <div className="bg-secondary group-hover:bg-secondary-hover border-border/20 flex h-10 w-10 items-center justify-center rounded-full border transition-colors">
                <Github className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors" />
              </div>
              <div>
                <div className="text-foreground font-serif font-medium">
                  {t("githubTitle")}
                </div>
                <div className="text-muted-foreground font-mono text-sm">
                  {t("githubSubtitle")}
                </div>
              </div>
            </AnimatedLink>

            <AnimatedLink
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group border-border/50 bg-card hover:border-primary/40 hover:bg-secondary-hover/50 flex items-center gap-4 rounded-lg border p-4 transition-all hover:shadow-sm"
            >
              <div className="bg-secondary group-hover:bg-secondary-hover border-border/20 flex h-10 w-10 items-center justify-center rounded-full border transition-colors">
                <svg
                  className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <div>
                <div className="text-foreground font-serif font-medium">
                  {t("linkedinTitle")}
                </div>
                <div className="text-muted-foreground font-mono text-sm">
                  {t("linkedinSubtitle")}
                </div>
              </div>
            </AnimatedLink>

            <AnimatedLink
              href="https://t.me/repmybio"
              target="_blank"
              rel="noopener noreferrer"
              className="group border-border/50 bg-card hover:border-primary/40 hover:bg-secondary-hover/50 flex items-center gap-4 rounded-lg border p-4 transition-all hover:shadow-sm"
            >
              <div className="bg-secondary group-hover:bg-secondary-hover border-border/20 flex h-10 w-10 items-center justify-center rounded-full border transition-colors">
                <svg
                  className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </div>
              <div>
                <div className="text-foreground font-serif font-medium">
                  {t("telegramTitle")}
                </div>
                <div className="text-muted-foreground font-mono text-sm">
                  {t("telegramSubtitle")}
                </div>
              </div>
            </AnimatedLink>
          </div>
        </div>
      </section>
    </>
  );
}
