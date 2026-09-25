"use client";

import { useMemo } from "react";
import {
  ENGAGEMENT_STATUSES,
  ENGAGEMENT_TYPES,
  STATUS_STYLES,
  collectFollowUps,
  filterEngagements,
  formatEngagementDate,
  hasOpenFollowUp,
  isFollowUpOverdue,
  sortEngagements,
  type Engagement,
  type EngagementFilters,
  type EngagementSort,
} from "@/lib/engagements";

function StatusBadge({ engagement }: { engagement: Engagement }) {
  const style = STATUS_STYLES[engagement.status];
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${style.badge}`}
    >
      {engagement.status}
    </span>
  );
}

function FollowUpBadge({ engagement }: { engagement: Engagement }) {
  if (!hasOpenFollowUp(engagement)) return null;
  const overdue = isFollowUpOverdue(engagement);
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${
        overdue ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
      }`}
    >
      {overdue ? "Follow-up overdue" : "Follow-up open"}
    </span>
  );
}

export default function EngagementRegistry({
  engagements,
  filters,
  sort,
  isLoading,
  projectOptions,
  onFiltersChange,
  onSortChange,
  onCreate,
  onOpen,
  onLoadDemo,
}: {
  engagements: Engagement[];
  filters: EngagementFilters;
  sort: EngagementSort;
  isLoading: boolean;
  projectOptions: string[];
  onFiltersChange: (filters: EngagementFilters) => void;
  onSortChange: (sort: EngagementSort) => void;
  onCreate: () => void;
  onOpen: (engagement: Engagement) => void;
  onLoadDemo: () => void;
}) {
  const visible = useMemo(
    () => sortEngagements(filterEngagements(engagements, filters), sort),
    [engagements, filters, sort],
  );
  const followUps = useMemo(() => collectFollowUps(engagements), [engagements]);

  const update = (patch: Partial<EngagementFilters>) =>
    onFiltersChange({ ...filters, ...patch });

  const filtersActive =
    filters.query !== "" ||
    filters.status !== "All" ||
    filters.type !== "All" ||
    filters.project !== "All" ||
    filters.from !== "" ||
    filters.to !== "" ||
    filters.followUp !== "All";

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] focus:outline-none";

  return (
    <div className="animate-fade-in mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Engagement Register
          </h1>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed max-w-2xl">
            The operational record of stakeholder and project interactions.
            Engagements are stored locally in your browser alongside your
            readiness assessment.
          </p>
        </div>
        <button
          onClick={onCreate}
          className="inline-flex h-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#0f766e] px-6 text-white font-medium transition-colors hover:bg-[#115e59] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e] focus-visible:ring-offset-2"
        >
          Log Engagement
        </button>
      </div>

      {isLoading ? (
        <div
          className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8"
          role="status"
          aria-live="polite"
        >
          <div className="h-4 w-48 rounded bg-gray-100 animate-pulse" />
          <div className="mt-6 space-y-3">
            {[0, 1, 2, 3].map((row) => (
              <div
                key={row}
                className="h-12 rounded-lg bg-gray-50 animate-pulse"
              />
            ))}
          </div>
          <span className="sr-only">Loading engagements…</span>
        </div>
      ) : engagements.length === 0 ? (
        <section className="rounded-xl border border-gray-200 bg-white p-8 text-center">
          <h2 className="text-lg font-bold text-gray-900">
            No engagements recorded yet
          </h2>
          <p className="mt-2 mx-auto max-w-md text-sm text-gray-600 leading-relaxed">
            Log meetings, site visits, consultations and correspondence to build
            an auditable record of how the project engages its stakeholders.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onCreate}
              className="inline-flex h-10 items-center justify-center rounded-lg bg-[#0f766e] px-6 text-white font-medium transition-colors hover:bg-[#115e59] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e] focus-visible:ring-offset-2"
            >
              Log First Engagement
            </button>
            <button
              onClick={onLoadDemo}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-300 px-6 text-gray-700 font-medium transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e] focus-visible:ring-offset-2"
            >
              Load Demonstration Engagements
            </button>
          </div>
        </section>
      ) : (
        <>
          {followUps.length > 0 && (
            <section className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-6">
              <h2 className="text-lg font-bold text-amber-900">
                Open Follow-Up Actions
              </h2>
              <p className="mt-1 text-sm text-amber-800">
                Follow-ups recorded against engagements. Commitments and
                incidents are managed in their own modules.
              </p>
              <ul className="mt-4 space-y-3">
                {followUps.map((item) => (
                  <li key={item.engagementId} className="flex items-start gap-3">
                    <span
                      className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${
                        item.isOverdue ? "bg-red-600" : "bg-amber-500"
                      }`}
                    />
                    <div>
                      <button
                        onClick={() => {
                          const engagement = engagements.find(
                            (e) => e.id === item.engagementId,
                          );
                          if (engagement) onOpen(engagement);
                        }}
                        className="text-left text-sm font-semibold text-amber-900 underline underline-offset-2 hover:text-amber-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 rounded"
                      >
                        {item.action}
                      </button>
                      <div className="text-xs text-amber-700 mt-0.5">
                        {item.owner || "Unassigned"} ·{" "}
                        {item.dueDate
                          ? `Due ${formatEngagementDate(item.dueDate, "")}`
                          : "No due date"}
                        {item.isOverdue && " · Overdue"}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 mb-6">
            <h2 className="sr-only">Filter engagements</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="sm:col-span-2">
                <label
                  htmlFor="engagement-search"
                  className="block text-sm font-medium text-gray-900 mb-1.5"
                >
                  Search
                </label>
                <input
                  id="engagement-search"
                  type="search"
                  value={filters.query}
                  onChange={(e) => update({ query: e.target.value })}
                  placeholder="Search purpose, stakeholders, outcome…"
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="engagement-status"
                  className="block text-sm font-medium text-gray-900 mb-1.5"
                >
                  Status
                </label>
                <select
                  id="engagement-status"
                  value={filters.status}
                  onChange={(e) =>
                    update({
                      status: e.target.value as EngagementFilters["status"],
                    })
                  }
                  className={`${inputClass} bg-white`}
                >
                  <option value="All">All statuses</option>
                  {ENGAGEMENT_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="engagement-type-filter"
                  className="block text-sm font-medium text-gray-900 mb-1.5"
                >
                  Type
                </label>
                <select
                  id="engagement-type-filter"
                  value={filters.type}
                  onChange={(e) =>
                    update({ type: e.target.value as EngagementFilters["type"] })
                  }
                  className={`${inputClass} bg-white`}
                >
                  <option value="All">All types</option>
                  {ENGAGEMENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="engagement-project-filter"
                  className="block text-sm font-medium text-gray-900 mb-1.5"
                >
                  Project
                </label>
                <select
                  id="engagement-project-filter"
                  value={filters.project}
                  onChange={(e) => update({ project: e.target.value })}
                  className={`${inputClass} bg-white`}
                >
                  <option value="All">All projects</option>
                  {projectOptions.map((project) => (
                    <option key={project} value={project}>
                      {project}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="engagement-from"
                  className="block text-sm font-medium text-gray-900 mb-1.5"
                >
                  From
                </label>
                <input
                  id="engagement-from"
                  type="date"
                  value={filters.from}
                  onChange={(e) => update({ from: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="engagement-to"
                  className="block text-sm font-medium text-gray-900 mb-1.5"
                >
                  To
                </label>
                <input
                  id="engagement-to"
                  type="date"
                  value={filters.to}
                  onChange={(e) => update({ to: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="engagement-followup-filter"
                  className="block text-sm font-medium text-gray-900 mb-1.5"
                >
                  Follow-up
                </label>
                <select
                  id="engagement-followup-filter"
                  value={filters.followUp}
                  onChange={(e) =>
                    update({
                      followUp: e.target.value as EngagementFilters["followUp"],
                    })
                  }
                  className={`${inputClass} bg-white`}
                >
                  <option value="All">All engagements</option>
                  <option value="Open">Open follow-up</option>
                  <option value="Overdue">Overdue follow-up</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-sm text-gray-500" aria-live="polite">
                {visible.length} of {engagements.length} engagement
                {engagements.length !== 1 ? "s" : ""} shown
              </p>
              <div className="flex items-center gap-3">
                <label
                  htmlFor="engagement-sort"
                  className="text-sm font-medium text-gray-900"
                >
                  Sort
                </label>
                <select
                  id="engagement-sort"
                  value={sort}
                  onChange={(e) => onSortChange(e.target.value as EngagementSort)}
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] focus:outline-none"
                >
                  <option value="date-desc">Newest first</option>
                  <option value="date-asc">Oldest first</option>
                  <option value="updated-desc">Recently updated</option>
                </select>
                {filtersActive && (
                  <button
                    onClick={() =>
                      onFiltersChange({
                        query: "",
                        status: "All",
                        type: "All",
                        project: "All",
                        from: "",
                        to: "",
                        followUp: "All",
                      })
                    }
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e] focus-visible:ring-offset-2 rounded"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          </section>

          {visible.length === 0 ? (
            <section className="rounded-xl border border-gray-200 bg-white p-8 text-center">
              <h2 className="text-lg font-bold text-gray-900">
                No engagements match these filters
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Adjust the search term, date range or filters to see more
                records.
              </p>
            </section>
          ) : (
            <>
              <section className="hidden md:block rounded-xl border border-gray-200 bg-white overflow-hidden">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">
                    Engagements matching the current filters
                  </caption>
                  <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                    <tr>
                      <th scope="col" className="px-5 py-3 font-semibold">
                        Date
                      </th>
                      <th scope="col" className="px-5 py-3 font-semibold">
                        Purpose
                      </th>
                      <th scope="col" className="px-5 py-3 font-semibold">
                        Stakeholders
                      </th>
                      <th scope="col" className="px-5 py-3 font-semibold">
                        Type
                      </th>
                      <th scope="col" className="px-5 py-3 font-semibold">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {visible.map((engagement) => (
                      <tr key={engagement.id} className="hover:bg-gray-50">
                        <td className="px-5 py-4 text-gray-500 whitespace-nowrap align-top">
                          {formatEngagementDate(engagement.date, engagement.time)}
                        </td>
                        <td className="px-5 py-4 align-top">
                          <button
                            onClick={() => onOpen(engagement)}
                            className="text-left text-sm font-medium text-[#0f766e] underline underline-offset-2 hover:text-[#115e59] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e] focus-visible:ring-offset-2 rounded"
                          >
                            {engagement.purpose}
                          </button>
                          <div className="text-xs text-gray-500 mt-1">
                            {engagement.projectName}
                          </div>
                        </td>
                        <td className="px-5 py-4 text-gray-700 align-top">
                          {engagement.stakeholders.length > 0
                            ? engagement.stakeholders.join(", ")
                            : "—"}
                        </td>
                        <td className="px-5 py-4 text-gray-700 align-top">
                          {engagement.type || "—"}
                          <div className="text-xs text-gray-400 mt-1">
                            {engagement.channel}
                          </div>
                        </td>
                        <td className="px-5 py-4 align-top">
                          <div className="flex flex-col items-start gap-1.5">
                            <StatusBadge engagement={engagement} />
                            <FollowUpBadge engagement={engagement} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              <div className="md:hidden space-y-3">
                {visible.map((engagement) => (
                  <button
                    key={engagement.id}
                    onClick={() => onOpen(engagement)}
                    className="block w-full rounded-xl border border-gray-200 bg-white p-4 text-left transition-colors hover:border-[#0f766e] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e] focus-visible:ring-offset-2"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs text-gray-500">
                        {formatEngagementDate(engagement.date, engagement.time)}
                      </span>
                      <StatusBadge engagement={engagement} />
                    </div>
                    <p className="mt-2 text-sm font-medium text-gray-900">
                      {engagement.purpose}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {engagement.projectName} · {engagement.type}
                    </p>
                    {engagement.stakeholders.length > 0 && (
                      <p className="mt-2 text-xs text-gray-500">
                        {engagement.stakeholders.join(", ")}
                      </p>
                    )}
                    <div className="mt-2">
                      <FollowUpBadge engagement={engagement} />
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
