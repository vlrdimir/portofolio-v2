"use client";

import { useTranslations } from "next-intl";

export default function NowPageClient({
  musicHistorySection,
  githubSection,
}: {
  musicHistorySection: React.ReactNode;
  githubSection: React.ReactNode;
}) {
  const t = useTranslations("NowPage");

  return (
    <section>
      <h1 className="mb-4 font-mono text-4xl font-bold md:text-5xl">
        {t("title")}
        <span className="text-red-500">.</span>
      </h1>

      <p className="mb-12 text-neutral-500">{t("updated")}</p>

      <div className="space-y-12">
        <ul className="ml-5 list-outside list-disc space-y-4 leading-relaxed text-neutral-800 dark:text-neutral-200">
          <li>
            {t.rich("activity3", {
              blockchain: (chunks) => <strong>{chunks}</strong>,
            })}
          </li>
          <li>
            {t.rich("activity4", {
              devops: (chunks) => <strong>{chunks}</strong>,
            })}
          </li>
          <li>
            {t.rich("activity5", {
              deployment: (chunks) => <strong>{chunks}</strong>,
              mlpipelines: (chunks) => <strong>{chunks}</strong>,
            })}
          </li>
        </ul>

        {githubSection}

        <div>
          <h2 className="mb-6 font-mono text-2xl font-bold">
            {t("techStackTitle")}
          </h2>
          <p className="mb-6 text-neutral-800 dark:text-neutral-200">
            {t("techStackDescription")}
          </p>

          <ul className="ml-5 list-outside list-disc space-y-4 leading-relaxed text-neutral-800 dark:text-neutral-200">
            <li>
              {t.rich("tech1", {
                javascript: (chunks) => <strong>{chunks}</strong>,
                frontend: (chunks) => <strong>{chunks}</strong>,
                elysia: (chunks) => <strong>{chunks}</strong>,
                bun: (chunks) => <strong>{chunks}</strong>,
                drizzle: (chunks) => <strong>{chunks}</strong>,
              })}
            </li>
            <li>
              {t.rich("tech2", {
                python: (chunks) => <strong>{chunks}</strong>,
                golang: (chunks) => <strong>{chunks}</strong>,
                learning: (chunks) => (
                  <span className="text-neutral-600 dark:text-neutral-400">
                    {chunks}
                  </span>
                ),
              })}
            </li>
            <li>
              {t.rich("tech3", {
                arch: (chunks) => <strong>{chunks}</strong>,
                hyprland: (chunks) => <strong>{chunks}</strong>,
              })}
            </li>
          </ul>
        </div>

        {musicHistorySection}
      </div>
    </section>
  );
}
