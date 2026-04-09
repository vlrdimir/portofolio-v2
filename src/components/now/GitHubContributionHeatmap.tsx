"use client";

import { addDays, format, startOfWeek } from "date-fns";
import { enUS, id as idLocale } from "date-fns/locale";
import { useTranslations } from "next-intl";

import type { DayContribution } from "@/lib/github-activity-types";

function cellClassName(level: number, isFuture: boolean): string {
  if (isFuture) {
    return "bg-neutral-200/35 outline -outline-offset-1 outline-transparent dark:bg-neutral-800/40";
  }
  switch (level) {
    case 0:
      return "bg-neutral-300/55 outline -outline-offset-1 outline-border/30 dark:bg-neutral-800 dark:outline-neutral-700/80";
    case 1:
      return "bg-emerald-800/25 outline -outline-offset-1 outline-emerald-900/15 dark:bg-emerald-400/25 dark:outline-emerald-400/20";
    case 2:
      return "bg-emerald-800/40 outline -outline-offset-1 outline-emerald-900/20 dark:bg-emerald-400/45 dark:outline-emerald-400/30";
    case 3:
      return "bg-emerald-800/60 outline -outline-offset-1 outline-emerald-900/25 dark:bg-emerald-500/55 dark:outline-emerald-400/35";
    case 4:
    default:
      return "bg-emerald-900/75 outline -outline-offset-1 outline-emerald-950/30 dark:bg-emerald-400/70 dark:outline-emerald-300/40";
  }
}

export function GitHubContributionHeatmap({
  contributions,
  locale,
}: {
  contributions: DayContribution[];
  locale: string;
}) {
  const t = useTranslations("NowPage");
  const dfLocale = locale === "id" ? idLocale : enUS;

  const byDate = new Map(contributions.map((c) => [c.date, c]));

  const today = new Date();
  const todayStr = format(today, "yyyy-MM-dd");

  const sundayThisWeek = startOfWeek(today, { weekStartsOn: 0 });
  const firstSunday = addDays(sundayThisWeek, -52 * 7);
  const numWeeks = 53;

  const refSunday = addDays(firstSunday, 0);
  const dayLabels = [0, 1, 2, 3, 4, 5, 6].map((row) =>
    format(addDays(refSunday, row), "EEE", { locale: dfLocale }),
  );

  const monthLabels: string[] = [];
  let prevMonth = -1;

  const columns: {
    cells: {
      dateStr: string;
      level: number;
      count: number;
      isFuture: boolean;
    }[];
  }[] = [];

  let totalLastYearWindow = 0;

  for (let w = 0; w < numWeeks; w++) {
    const midWeek = addDays(firstSunday, w * 7 + 3);
    const m = midWeek.getMonth();
    monthLabels.push(
      m !== prevMonth ? format(midWeek, "MMM", { locale: dfLocale }) : "",
    );
    prevMonth = m;

    const cells = [];
    for (let row = 0; row < 7; row++) {
      const cellDate = addDays(firstSunday, w * 7 + row);
      const dateStr = format(cellDate, "yyyy-MM-dd");
      const isFuture = dateStr > todayStr;
      const data = byDate.get(dateStr);
      const count = data?.count ?? 0;
      const level = isFuture ? 0 : (data?.level ?? 0);
      if (!isFuture) {
        totalLastYearWindow += count;
      }
      cells.push({ dateStr, level, count, isFuture });
    }
    columns.push({ cells });
  }

  const countFormatted = new Intl.NumberFormat(
    locale === "id" ? "id-ID" : "en-US",
  ).format(totalLastYearWindow);

  const cellTw =
    "h-2.5 w-2.5 shrink-0 rounded-[2px] sm:h-3 sm:w-3 sm:rounded-sm";

  return (
    <div className="border-border/40 space-y-4 border-t pt-6">
      <p className="sr-only">{t("githubHeatmapAria")}</p>

      <p className="font-sans text-xl font-semibold tracking-tight text-neutral-900 tabular-nums sm:text-2xl dark:text-neutral-100">
        {t("githubContributionsLastYear", { count: countFormatted })}
      </p>

      <div className="flex min-w-0 gap-1.5 sm:gap-2">
        <div
          className="flex w-6 shrink-0 flex-col gap-[3px] pt-[18px] sm:w-7 sm:pt-[22px]"
          aria-hidden
        >
          {[0, 1, 2, 3, 4, 5, 6].map((row) => (
            <span
              key={row}
              className={`flex ${cellTw} items-center text-[9px] leading-none text-neutral-500 sm:text-[10px] dark:text-neutral-400`}
            >
              {row % 2 === 1 ? dayLabels[row] : "\u00a0"}
            </span>
          ))}
        </div>

        <div className="min-w-0 flex-1 overflow-x-auto pb-1">
          <div className="min-w-max space-y-[3px]">
            <div className="flex gap-[3px]" aria-hidden>
              {monthLabels.map((label, i) => (
                <div
                  key={i}
                  className={`flex ${cellTw} items-start justify-center`}
                >
                  {label ? (
                    <span className="text-[9px] leading-none text-neutral-500 sm:text-[10px] dark:text-neutral-400">
                      {label}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="flex gap-[3px]" role="img">
              {columns.map((col, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {col.cells.map((cell, ri) => {
                    const cn = cellClassName(cell.level, cell.isFuture);
                    const readableDate = format(
                      new Date(cell.dateStr + "T12:00:00Z"),
                      "PP",
                      { locale: dfLocale },
                    );
                    const title = cell.isFuture
                      ? undefined
                      : t("githubContributionCellTitle", {
                          count: cell.count,
                          date: readableDate,
                        });

                    return (
                      <div
                        key={`${wi}-${ri}`}
                        className={`${cellTw} ${cn}`}
                        title={title}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2">
        <span className="text-[10px] text-neutral-500 sm:text-xs dark:text-neutral-400">
          {t("githubLegendLess")}
        </span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((lv) => (
            <div
              key={lv}
              className={`${cellTw} ${cellClassName(lv, false)}`}
              aria-hidden
            />
          ))}
        </div>
        <span className="text-[10px] text-neutral-500 sm:text-xs dark:text-neutral-400">
          {t("githubLegendMore")}
        </span>
      </div>
    </div>
  );
}
