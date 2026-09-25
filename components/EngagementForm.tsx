"use client";

import { useState } from "react";
import {
  ENGAGEMENT_CHANNELS,
  ENGAGEMENT_STATUSES,
  ENGAGEMENT_TYPES,
  validateEngagement,
  type Engagement,
  type EngagementChannel,
  type EngagementErrors,
  type EngagementStatus,
  type EngagementType,
} from "@/lib/engagements";

const inputClass =
  "w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] focus:outline-none";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-red-600">
      {message}
    </p>
  );
}

export default function EngagementForm({
  engagement,
  isNew,
  projectOptions,
  stakeholderOptions,
  onSave,
  onCancel,
}: {
  engagement: Engagement;
  isNew: boolean;
  projectOptions: string[];
  stakeholderOptions: string[];
  onSave: (engagement: Engagement) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState<Engagement>(engagement);
  const [errors, setErrors] = useState<EngagementErrors>({});
  const [newStakeholder, setNewStakeholder] = useState("");

  const options = [
    ...new Set([...stakeholderOptions, ...draft.stakeholders]),
  ].sort((a, b) => a.localeCompare(b));

  const set = <K extends keyof Engagement>(key: K, value: Engagement[K]) =>
    setDraft((prev) => ({ ...prev, [key]: value }));

  const setFollowUp = <K extends keyof Engagement["followUp"]>(
    key: K,
    value: Engagement["followUp"][K],
  ) => setDraft((prev) => ({ ...prev, followUp: { ...prev.followUp, [key]: value } }));

  const toggleStakeholder = (stakeholder: string) =>
    setDraft((prev) => ({
      ...prev,
      stakeholders: prev.stakeholders.includes(stakeholder)
        ? prev.stakeholders.filter((s) => s !== stakeholder)
        : [...prev.stakeholders, stakeholder],
    }));

  const addStakeholder = () => {
    const value = newStakeholder.trim();
    if (!value || draft.stakeholders.includes(value)) {
      setNewStakeholder("");
      return;
    }
    set("stakeholders", [...draft.stakeholders, value]);
    setNewStakeholder("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validateEngagement(draft);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    onSave(draft);
  };

  const errorCount = Object.keys(errors).length;

  return (
    <div className="animate-fade-in mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <button
          onClick={onCancel}
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e] focus-visible:ring-offset-2 rounded"
        >
          ← Back to engagement register
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          {isNew ? "Log Engagement" : "Edit Engagement"}
        </h1>
        <p className="mt-2 text-gray-600">
          Record what happened, who took part, and what must happen next.
        </p>
      </div>

      {errorCount > 0 && (
        <div
          role="alert"
          className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4"
        >
          <p className="text-sm font-semibold text-red-900">
            {errorCount} field{errorCount !== 1 ? "s need" : " needs"} attention
            before this engagement can be saved.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <section className="rounded-xl border border-gray-200 bg-white p-6 space-y-6">
          <h2 className="text-lg font-bold text-gray-900">Context</h2>

          <div>
            <label
              htmlFor="engagement-project"
              className="block text-sm font-medium text-gray-900 mb-1.5"
            >
              Project <span className="text-red-500">*</span>
            </label>
            {projectOptions.length > 0 ? (
              <select
                id="engagement-project"
                value={draft.projectName}
                onChange={(e) => set("projectName", e.target.value)}
                aria-invalid={!!errors.projectName}
                aria-describedby={
                  errors.projectName ? "engagement-project-error" : undefined
                }
                className={`${inputClass} bg-white`}
              >
                <option value="">Select a project</option>
                {projectOptions.map((project) => (
                  <option key={project} value={project}>
                    {project}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id="engagement-project"
                type="text"
                value={draft.projectName}
                onChange={(e) => set("projectName", e.target.value)}
                aria-invalid={!!errors.projectName}
                aria-describedby={
                  errors.projectName ? "engagement-project-error" : undefined
                }
                placeholder="e.g., Ndlovu Water Infrastructure Project"
                className={inputClass}
              />
            )}
            <FieldError
              id="engagement-project-error"
              message={errors.projectName}
            />
          </div>

          <fieldset>
            <legend className="block text-sm font-medium text-gray-900 mb-1.5">
              Stakeholders <span className="text-red-500">*</span>
            </legend>
            {options.length > 0 && (
              <div className="space-y-2 mb-3">
                {options.map((stakeholder) => (
                  <label
                    key={stakeholder}
                    className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${
                      draft.stakeholders.includes(stakeholder)
                        ? "border-[#0f766e] bg-[#f0fdfa]"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={draft.stakeholders.includes(stakeholder)}
                      onChange={() => toggleStakeholder(stakeholder)}
                      className="mt-0.5 accent-[#0f766e]"
                    />
                    <span className="text-sm text-gray-900">{stakeholder}</span>
                  </label>
                ))}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={newStakeholder}
                onChange={(e) => setNewStakeholder(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addStakeholder();
                  }
                }}
                aria-label="Add a stakeholder"
                placeholder="Add a stakeholder group or representative"
                className={inputClass}
              />
              <button
                type="button"
                onClick={addStakeholder}
                className="inline-flex h-11 flex-shrink-0 items-center justify-center rounded-lg border border-gray-300 px-5 text-gray-700 font-medium transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e] focus-visible:ring-offset-2"
              >
                Add
              </button>
            </div>
            <FieldError
              id="engagement-stakeholders-error"
              message={errors.stakeholders}
            />
          </fieldset>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="engagement-date"
                className="block text-sm font-medium text-gray-900 mb-1.5"
              >
                Date <span className="text-red-500">*</span>
              </label>
              <input
                id="engagement-date"
                type="date"
                value={draft.date}
                onChange={(e) => set("date", e.target.value)}
                aria-invalid={!!errors.date}
                aria-describedby={
                  errors.date ? "engagement-date-error" : undefined
                }
                className={inputClass}
              />
              <FieldError id="engagement-date-error" message={errors.date} />
            </div>
            <div>
              <label
                htmlFor="engagement-time"
                className="block text-sm font-medium text-gray-900 mb-1.5"
              >
                Time
              </label>
              <input
                id="engagement-time"
                type="time"
                value={draft.time}
                onChange={(e) => set("time", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="engagement-type"
                className="block text-sm font-medium text-gray-900 mb-1.5"
              >
                Engagement type <span className="text-red-500">*</span>
              </label>
              <select
                id="engagement-type"
                value={draft.type}
                onChange={(e) => set("type", e.target.value as EngagementType)}
                aria-invalid={!!errors.type}
                aria-describedby={
                  errors.type ? "engagement-type-error" : undefined
                }
                className={`${inputClass} bg-white`}
              >
                <option value="">Select a type</option>
                {ENGAGEMENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <FieldError id="engagement-type-error" message={errors.type} />
            </div>
            <div>
              <label
                htmlFor="engagement-channel"
                className="block text-sm font-medium text-gray-900 mb-1.5"
              >
                Channel <span className="text-red-500">*</span>
              </label>
              <select
                id="engagement-channel"
                value={draft.channel}
                onChange={(e) =>
                  set("channel", e.target.value as EngagementChannel)
                }
                aria-invalid={!!errors.channel}
                aria-describedby={
                  errors.channel ? "engagement-channel-error" : undefined
                }
                className={`${inputClass} bg-white`}
              >
                <option value="">Select a channel</option>
                {ENGAGEMENT_CHANNELS.map((channel) => (
                  <option key={channel} value={channel}>
                    {channel}
                  </option>
                ))}
              </select>
              <FieldError
                id="engagement-channel-error"
                message={errors.channel}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="engagement-location"
              className="block text-sm font-medium text-gray-900 mb-1.5"
            >
              Location
            </label>
            <input
              id="engagement-location"
              type="text"
              value={draft.location}
              onChange={(e) => set("location", e.target.value)}
              placeholder="e.g., Mzamomhle community hall"
              className={inputClass}
            />
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 space-y-6">
          <h2 className="text-lg font-bold text-gray-900">Record</h2>

          <div>
            <label
              htmlFor="engagement-purpose"
              className="block text-sm font-medium text-gray-900 mb-1.5"
            >
              Purpose / topic <span className="text-red-500">*</span>
            </label>
            <textarea
              id="engagement-purpose"
              rows={2}
              value={draft.purpose}
              onChange={(e) => set("purpose", e.target.value)}
              aria-invalid={!!errors.purpose}
              aria-describedby={
                errors.purpose ? "engagement-purpose-error" : undefined
              }
              placeholder="What was this engagement about?"
              className={inputClass}
            />
            <FieldError id="engagement-purpose-error" message={errors.purpose} />
          </div>

          <div>
            <label
              htmlFor="engagement-participants"
              className="block text-sm font-medium text-gray-900 mb-1.5"
            >
              Participants
            </label>
            <textarea
              id="engagement-participants"
              rows={2}
              value={draft.participants}
              onChange={(e) => set("participants", e.target.value)}
              placeholder="Who attended, and in what capacity?"
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="engagement-status"
              className="block text-sm font-medium text-gray-900 mb-1.5"
            >
              Status <span className="text-red-500">*</span>
            </label>
            <select
              id="engagement-status"
              value={draft.status}
              onChange={(e) =>
                set("status", e.target.value as EngagementStatus)
              }
              className={`${inputClass} bg-white`}
            >
              {ENGAGEMENT_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="engagement-outcome"
              className="block text-sm font-medium text-gray-900 mb-1.5"
            >
              Outcome
              {draft.status === "Completed" && (
                <span className="text-red-500"> *</span>
              )}
            </label>
            <textarea
              id="engagement-outcome"
              rows={3}
              value={draft.outcome}
              onChange={(e) => set("outcome", e.target.value)}
              aria-invalid={!!errors.outcome}
              aria-describedby={
                errors.outcome ? "engagement-outcome-error" : undefined
              }
              placeholder="What was agreed, raised or concluded?"
              className={inputClass}
            />
            <FieldError id="engagement-outcome-error" message={errors.outcome} />
          </div>

          <div>
            <label
              htmlFor="engagement-notes"
              className="block text-sm font-medium text-gray-900 mb-1.5"
            >
              Notes
            </label>
            <textarea
              id="engagement-notes"
              rows={3}
              value={draft.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Minutes, interpretation arrangements, attachments held elsewhere…"
              className={inputClass}
            />
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Follow-up</h2>
            <p className="mt-1 text-sm text-gray-500">
              Track the next action arising from this engagement. Commitments
              and incidents remain in their own modules.
            </p>
          </div>

          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={draft.followUp.required}
              onChange={(e) => setFollowUp("required", e.target.checked)}
              className="mt-0.5 accent-[#0f766e]"
            />
            <span className="text-sm text-gray-900">
              This engagement requires a follow-up action
            </span>
          </label>

          {draft.followUp.required && (
            <div className="space-y-6 pl-6">
              <div>
                <label
                  htmlFor="engagement-followup-action"
                  className="block text-sm font-medium text-gray-900 mb-1.5"
                >
                  Follow-up action <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="engagement-followup-action"
                  rows={2}
                  value={draft.followUp.action}
                  onChange={(e) => setFollowUp("action", e.target.value)}
                  aria-invalid={!!errors.followUpAction}
                  aria-describedby={
                    errors.followUpAction
                      ? "engagement-followup-action-error"
                      : undefined
                  }
                  placeholder="What must happen next?"
                  className={inputClass}
                />
                <FieldError
                  id="engagement-followup-action-error"
                  message={errors.followUpAction}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="engagement-followup-owner"
                    className="block text-sm font-medium text-gray-900 mb-1.5"
                  >
                    Owner
                  </label>
                  <input
                    id="engagement-followup-owner"
                    type="text"
                    value={draft.followUp.owner}
                    onChange={(e) => setFollowUp("owner", e.target.value)}
                    placeholder="e.g., Community Liaison Officer"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="engagement-followup-due"
                    className="block text-sm font-medium text-gray-900 mb-1.5"
                  >
                    Due date <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="engagement-followup-due"
                    type="date"
                    value={draft.followUp.dueDate}
                    onChange={(e) => setFollowUp("dueDate", e.target.value)}
                    aria-invalid={!!errors.followUpDueDate}
                    aria-describedby={
                      errors.followUpDueDate
                        ? "engagement-followup-due-error"
                        : undefined
                    }
                    className={inputClass}
                  />
                  <FieldError
                    id="engagement-followup-due-error"
                    message={errors.followUpDueDate}
                  />
                </div>
              </div>

              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={draft.followUp.completed}
                  onChange={(e) => setFollowUp("completed", e.target.checked)}
                  className="mt-0.5 accent-[#0f766e]"
                />
                <span className="text-sm text-gray-900">
                  Follow-up action is complete
                </span>
              </label>
            </div>
          )}
        </section>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-12 items-center justify-center rounded-lg border border-gray-300 px-6 text-gray-700 font-medium transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e] focus-visible:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-[#0f766e] px-8 text-white font-medium transition-colors hover:bg-[#115e59] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e] focus-visible:ring-offset-2"
          >
            {isNew ? "Save Engagement" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
