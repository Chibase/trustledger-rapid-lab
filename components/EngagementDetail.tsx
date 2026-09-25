"use client";

import { useMemo, useState } from "react";
import type { ProjectProfile } from "@/lib/assessment";
import {
  STATUS_STYLES,
  buildRelatedTimeline,
  formatEngagementDate,
  hasOpenFollowUp,
  isFollowUpOverdue,
  type Engagement,
} from "@/lib/engagements";

function DetailField({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) {
  return (
    <div className="rounded-lg bg-gray-50 p-3">
      <dt className="text-xs font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900 whitespace-pre-line">
        {value && value.trim() ? value : "—"}
      </dd>
    </div>
  );
}

export default function EngagementDetail({
  engagement,
  engagements,
  projectProfile,
  onBack,
  onEdit,
  onDelete,
  onOpenEngagement,
  onOpenProject,
  onFilterByStakeholder,
  onToggleFollowUp,
}: {
  engagement: Engagement;
  engagements: Engagement[];
  projectProfile: ProjectProfile | null;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onOpenEngagement: (engagement: Engagement) => void;
  onOpenProject: () => void;
  onFilterByStakeholder: (stakeholder: string) => void;
  onToggleFollowUp: (completed: boolean) => void;
}) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const related = useMemo(
    () => buildRelatedTimeline(engagements, engagement),
    [engagements, engagement],
  );
  const status = STATUS_STYLES[engagement.status];
  const followUpOpen = hasOpenFollowUp(engagement);
  const followUpOverdue = isFollowUpOverdue(engagement);

  return (
    <div className="animate-fade-in mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e] focus-visible:ring-offset-2 rounded"
        >
          ← Back to engagement register
        </button>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${status.badge}`}
              >
                {engagement.status}
              </span>
              {followUpOpen && (
                <span
                  className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${
                    followUpOverdue
                      ? "bg-red-100 text-red-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {followUpOverdue ? "Follow-up overdue" : "Follow-up open"}
                </span>
              )}
              {engagement.isDemo && (
                <span className="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
                  Synthetic demonstration record
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              {engagement.purpose}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {formatEngagementDate(engagement.date, engagement.time)} ·{" "}
              {engagement.type || "Type not recorded"} ·{" "}
              {engagement.channel || "Channel not recorded"}
            </p>
          </div>
          <div className="flex flex-shrink-0 gap-3">
            <button
              onClick={onEdit}
              className="inline-flex h-10 items-center justify-center rounded-lg bg-[#0f766e] px-6 text-white font-medium transition-colors hover:bg-[#115e59] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e] focus-visible:ring-offset-2"
            >
              Edit
            </button>
            <button
              onClick={() => setConfirmingDelete(true)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-300 px-5 text-gray-700 font-medium transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e] focus-visible:ring-offset-2"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {confirmingDelete && (
        <div
          role="alertdialog"
          aria-labelledby="delete-engagement-title"
          className="mb-6 rounded-xl border border-red-200 bg-red-50 p-6"
        >
          <h2
            id="delete-engagement-title"
            className="text-sm font-bold text-red-900"
          >
            Delete this engagement record?
          </h2>
          <p className="mt-1 text-sm text-red-800">
            The record and its follow-up action will be removed from your local
            register. This cannot be undone.
          </p>
          <div className="mt-4 flex gap-3">
            <button
              onClick={onDelete}
              className="inline-flex h-10 items-center justify-center rounded-lg bg-red-600 px-5 text-white font-medium transition-colors hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
            >
              Delete engagement
            </button>
            <button
              onClick={() => setConfirmingDelete(false)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-300 bg-white px-5 text-gray-700 font-medium transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e] focus-visible:ring-offset-2"
            >
              Keep engagement
            </button>
          </div>
        </div>
      )}

      <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Linked records</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="text-xs font-medium text-gray-500">Project</div>
            <button
              onClick={onOpenProject}
              disabled={!projectProfile}
              className="mt-1 text-left text-sm font-semibold text-[#0f766e] underline underline-offset-2 hover:text-[#115e59] disabled:text-gray-900 disabled:no-underline disabled:cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e] focus-visible:ring-offset-2 rounded"
            >
              {engagement.projectName}
            </button>
            {projectProfile ? (
              <p className="mt-1 text-xs text-gray-500">
                {projectProfile.sector} · {projectProfile.phase} ·{" "}
                {projectProfile.location}
              </p>
            ) : (
              <p className="mt-1 text-xs text-gray-400">
                No project profile is loaded for this project in the current
                assessment.
              </p>
            )}
          </div>
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="text-xs font-medium text-gray-500">
              Stakeholders
            </div>
            {engagement.stakeholders.length > 0 ? (
              <ul className="mt-1 space-y-1">
                {engagement.stakeholders.map((stakeholder) => (
                  <li key={stakeholder}>
                    <button
                      onClick={() => onFilterByStakeholder(stakeholder)}
                      className="text-left text-sm text-[#0f766e] underline underline-offset-2 hover:text-[#115e59] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e] focus-visible:ring-offset-2 rounded"
                    >
                      {stakeholder}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 text-sm text-gray-400">
                No stakeholders recorded.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Engagement record
        </h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DetailField
            label="Date and time"
            value={formatEngagementDate(engagement.date, engagement.time)}
          />
          <DetailField label="Location" value={engagement.location} />
          <DetailField label="Type" value={engagement.type} />
          <DetailField label="Channel" value={engagement.channel} />
          <div className="sm:col-span-2">
            <DetailField label="Participants" value={engagement.participants} />
          </div>
          <div className="sm:col-span-2">
            <DetailField label="Outcome" value={engagement.outcome} />
          </div>
          <div className="sm:col-span-2">
            <DetailField label="Notes" value={engagement.notes} />
          </div>
        </dl>
      </section>

      <section
        className={`rounded-xl border p-6 sm:p-8 mb-6 ${
          followUpOverdue
            ? "border-red-200 bg-red-50"
            : followUpOpen
              ? "border-amber-200 bg-amber-50"
              : "border-gray-200 bg-white"
        }`}
      >
        <h2 className="text-lg font-bold text-gray-900 mb-2">Follow-up</h2>
        {engagement.followUp.required ? (
          <div className="space-y-2">
            <p className="text-sm text-gray-900">{engagement.followUp.action}</p>
            <p className="text-xs text-gray-600">
              {engagement.followUp.owner || "Unassigned"} ·{" "}
              {engagement.followUp.dueDate
                ? `Due ${formatEngagementDate(engagement.followUp.dueDate, "")}`
                : "No due date"}{" "}
              · {engagement.followUp.completed ? "Complete" : "Open"}
            </p>
            <button
              onClick={() => onToggleFollowUp(!engagement.followUp.completed)}
              className="mt-2 inline-flex h-10 items-center justify-center rounded-lg border border-gray-300 bg-white px-5 text-sm text-gray-700 font-medium transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e] focus-visible:ring-offset-2"
            >
              {engagement.followUp.completed
                ? "Reopen follow-up"
                : "Mark follow-up complete"}
            </button>
            <p className="text-xs text-gray-500">
              Follow-ups recorded here stay with the engagement. Commitments and
              incidents remain separate records.
            </p>
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No follow-up action was recorded for this engagement.
          </p>
        )}
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
        <h2 className="text-lg font-bold text-gray-900 mb-1">
          Related engagement history
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Other engagements on the same project or with the same stakeholders.
        </p>
        {related.length === 0 ? (
          <p className="text-sm text-gray-500">
            This is the only engagement recorded for this project and these
            stakeholders.
          </p>
        ) : (
          <ol className="relative border-l border-gray-200 pl-6 space-y-6">
            {related.map((item) => (
              <li key={item.id} className="relative">
                <span
                  className="absolute -left-[1.6rem] top-1.5 h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: STATUS_STYLES[item.status].dot }}
                />
                <div className="text-xs text-gray-500">
                  {formatEngagementDate(item.date, item.time)} · {item.type}
                </div>
                <button
                  onClick={() => onOpenEngagement(item)}
                  className="mt-0.5 text-left text-sm font-medium text-[#0f766e] underline underline-offset-2 hover:text-[#115e59] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e] focus-visible:ring-offset-2 rounded"
                >
                  {item.purpose}
                </button>
                {item.outcome && (
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                    {item.outcome}
                  </p>
                )}
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}
