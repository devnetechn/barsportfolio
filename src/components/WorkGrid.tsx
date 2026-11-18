"use client";

import { useMemo, useState } from "react";
import { categories, projects, type Category } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

type Filter = "All" | Category;
const filters: Filter[] = ["All", ...categories];

const countFor = (f: Filter) =>
  f === "All" ? projects.length : projects.filter((p) => p.categories.includes(f)).length;

export default function WorkGrid() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter],
  );

  // The first project is featured only in the unfiltered view.
  const [featured, rest] = filter === "All" ? [visible[0], visible.slice(1)] : [null, visible];

  return (
    <>
      <div className="mt-12 flex flex-col gap-4 border-y border-line py-4 md:flex-row md:items-center md:justify-between">
        <div
          role="group"
          aria-label="Filter projects by type"
          className="-mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0"
        >
          {filters.map((f) => {
            const on = f === filter;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(f)}
                className={`flex min-h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-[0.925rem] transition-colors duration-200 ${
                  on
                    ? "border-ink bg-ink text-bg"
                    : "border-line-strong text-ink-2 hover:border-ink-2 hover:text-ink"
                }`}
              >
                {f}
                <span className={`text-xs tabular-nums ${on ? "text-bg/70" : "text-ink-3"}`}>{countFor(f)}</span>
              </button>
            );
          })}
        </div>
        <p role="status" aria-live="polite" className="shrink-0 text-sm text-ink-3">
          Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
        </p>
      </div>

      <div key={filter} className="filter-swap">
        {featured && (
          <div className="mt-14 md:mt-20">
            <ProjectCard project={featured} featured priority />
          </div>
        )}

        <ul className="mt-16 grid gap-x-10 gap-y-20 md:mt-24 md:grid-cols-2 md:gap-y-24">
          {rest.map((p, i) => (
            // Offset every second card on wide screens to break the strict grid.
            <li key={p.slug} className={i % 2 === 1 ? "md:translate-y-24" : ""}>
              <ProjectCard project={p} />
            </li>
          ))}
        </ul>
        {rest.length % 2 === 0 && rest.length > 0 && <div aria-hidden="true" className="hidden md:block md:h-24" />}
      </div>
    </>
  );
}
