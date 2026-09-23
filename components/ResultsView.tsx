"use client";

import { useMemo } from "react";
import {
  computeAssessmentResult,
  type Assessment,
} from "@/lib/assessment";

function ScoreBar({ score, color }: { score: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2.5 rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${score}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-sm font-bold text-gray-900 w-10 text-right">
        {score}%
      </span>
    </div>
  );
}

export default function ResultsView({
  assessment,
  onViewReport,
  onReset,
}: {
  assessment: Assessment;
  onViewReport: () => void;
  onReset: () => void;
}) {
  const result = useMemo(
    () => computeAssessmentResult(assessment.responses),
    [assessment.responses],
  );

  const applicableCount = result.dimensionResults.filter(
    (d) => d.isApplicable,
  ).length;
  const naCount = result.dimensionResults.reduce(
    (sum, d) => sum + d.naQuestions,
    0,
  );

  return (
    <div className="animate-fade-in mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="no-print mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Social Licence Readiness Profile
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {assessment.projectProfile.projectName}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onViewReport}
            className="inline-flex h-10 items-center justify-center rounded-lg bg-[#0f766e] px-6 text-white font-medium transition-colors hover:bg-[#115e59]"
          >
            View Full Report
          </button>
          <button
            onClick={onReset}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-300 px-5 text-gray-700 font-medium transition-colors hover:bg-gray-50"
          >
            Reset
          </button>
        </div>
      </div>

      {assessment.isDemo && (
        <div className="no-print mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm text-amber-800">
            <strong>Synthetic Demonstration Data:</strong> This is the Ndlovu
            Water Infrastructure Project — a fictional demonstration case. All
            responses and project details are synthetic.
          </p>
        </div>
      )}

      <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 mb-6 print-avoid-break">
        <div className="text-center">
          <div className="text-sm font-medium text-gray-500 mb-2">
            Overall Social Licence Readiness Profile
          </div>
          <div
            className="text-5xl font-bold"
            style={{ color: result.band.color }}
          >
            {result.overallReadiness}%
          </div>
          <div
            className="mt-2 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold"
            style={{
              backgroundColor: `${result.band.color}15`,
              color: result.band.color,
            }}
          >
            {result.band.label}
          </div>
          <p className="mt-4 max-w-lg mx-auto text-sm text-gray-600 leading-relaxed">
            {result.band.description}
          </p>
          <div className="mt-4 text-xs text-gray-400">
            Average of {applicableCount} applicable dimension{applicableCount !== 1 ? "s" : ""} ·
            {" "}
            {naCount} question{naCount !== 1 ? "s" : ""} marked Not Applicable
            (excluded from scoring)
          </div>
          <div className="mt-3 text-xs text-gray-400">
            This is a Social Licence <strong>Readiness Profile</strong>, not a
            validated Social Licence Score.
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 mb-6 print-avoid-break">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Dimension Results
        </h2>
        <div className="space-y-5">
          {result.dimensionResults.map((dr) => (
            <div key={dr.dimensionId}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">
                    {dr.dimensionName}
                  </span>
                  {dr.isStrength && (
                    <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                      Strength
                    </span>
                  )}
                  {dr.isPriority && (
                    <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                      Priority
                    </span>
                  )}
                  {!dr.isApplicable && (
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
                      N/A
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-400">
                  {dr.actualPoints}/{dr.maxApplicablePoints} pts · {dr.applicableQuestions} applicable
                  {dr.naQuestions > 0 && ` · ${dr.naQuestions} N/A`}
                </span>
              </div>
              {dr.isApplicable ? (
                <ScoreBar score={dr.score} color={dr.band.color} />
              ) : (
                <div className="text-xs text-gray-400 italic">
                  All questions marked Not Applicable — dimension excluded from
                  overall score.
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {result.strengths.length > 0 && (
        <section className="rounded-xl border border-green-200 bg-green-50 p-6 sm:p-8 mb-6 print-avoid-break">
          <h2 className="text-lg font-bold text-green-900 mb-4">Strengths</h2>
          <div className="space-y-3">
            {result.strengths.map((s) => (
              <div key={s.dimensionId} className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-green-600 flex-shrink-0" />
                <div>
                  <span className="text-sm font-semibold text-green-900">
                    {s.dimensionName}
                  </span>
                  <span className="text-sm text-green-700 ml-2">
                    ({s.score}% — {s.band.label})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {result.priorityAreas.length > 0 && (
        <section className="rounded-xl border border-red-200 bg-red-50 p-6 sm:p-8 mb-6 print-avoid-break">
          <h2 className="text-lg font-bold text-red-900 mb-4">Priority Areas</h2>
          <div className="space-y-3">
            {result.priorityAreas.map((p) => (
              <div key={p.dimensionId} className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-red-600 flex-shrink-0" />
                <div>
                  <span className="text-sm font-semibold text-red-900">
                    {p.dimensionName}
                  </span>
                  <span className="text-sm text-red-700 ml-2">
                    ({p.score}% — {p.band.label})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 mb-6 print-avoid-break">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Systemic Considerations
        </h2>
        <ul className="space-y-3">
          {result.systemicConsiderations.map((c, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1 text-gray-400 flex-shrink-0">•</span>
              <p className="text-sm text-gray-700 leading-relaxed">{c}</p>
            </li>
          ))}
        </ul>
      </section>

      {result.recommendedActions.length > 0 && (
        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 mb-6 print-avoid-break">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Recommended Actions
          </h2>
          <div className="space-y-6">
            {result.priorityAreas.map((area) => {
              const actions = result.recommendedActions.filter(
                (a) => a.dimensionId === area.dimensionId,
              );
              if (actions.length === 0) return null;
              return (
                <div key={area.dimensionId}>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    {area.dimensionName}
                    <span
                      className={`ml-2 rounded px-2 py-0.5 text-xs font-medium ${
                        actions[0].priority === "high"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {actions[0].priority} priority
                    </span>
                  </h3>
                  <ul className="space-y-2">
                    {actions.map((a, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 pl-4"
                      >
                        <span className="mt-1 text-gray-400 flex-shrink-0 text-xs">
                          {i + 1}.
                        </span>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {a.action}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <div className="no-print flex justify-center gap-3 mt-8">
        <button
          onClick={onViewReport}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-[#0f766e] px-6 text-white font-medium transition-colors hover:bg-[#115e59]"
        >
          View Full Report
        </button>
        <button
          onClick={onReset}
          className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-300 px-5 text-gray-700 font-medium transition-colors hover:bg-gray-50"
        >
          Start New Assessment
        </button>
      </div>
    </div>
  );
}
