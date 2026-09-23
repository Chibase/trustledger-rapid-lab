"use client";

import { useMemo } from "react";
import {
  computeAssessmentResult,
  RESPONSE_LABELS,
  type Assessment,
} from "@/lib/assessment";

export default function ReportView({
  assessment,
  onBack,
}: {
  assessment: Assessment;
  onBack: () => void;
}) {
  const result = useMemo(
    () => computeAssessmentResult(assessment.responses),
    [assessment.responses],
  );

  const profile = assessment.projectProfile;
  const dateStr = new Date(assessment.updatedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="no-print mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          ← Back to results
        </button>
        <button
          onClick={() => window.print()}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-[#0f766e] px-6 text-white font-medium transition-colors hover:bg-[#115e59]"
        >
          Print / Save as PDF
        </button>
      </div>

      <div className="space-y-8">
        {/* Cover */}
        <section className="print-avoid-break rounded-lg border border-gray-300 bg-white p-8 sm:p-12 text-center">
          <div className="text-xs font-semibold text-[#0f766e] tracking-wider uppercase mb-4">
            TrustLedger Rapid Lab — Prototype 01
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Social Licence to Build™
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0f766e] mb-8">
            Readiness Assessment Report
          </h2>
          <div className="mx-auto max-w-md space-y-1 text-sm text-gray-600">
            <div className="text-lg font-semibold text-gray-900">
              {profile.projectName}
            </div>
            <div>{profile.location}</div>
            <div>{profile.sector} — {profile.phase}</div>
            <div className="pt-2 text-xs text-gray-400">
              Prepared: {dateStr}
            </div>
            {profile.assessor && (
              <div className="text-xs text-gray-400">
                Assessor: {profile.assessor}
              </div>
            )}
          </div>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold"
            style={{
              backgroundColor: `${result.band.color}15`,
              color: result.band.color,
            }}
          >
            Overall Readiness: {result.overallReadiness}% — {result.band.label}
          </div>
        </section>

        {/* Project Profile */}
        <section className="print-break print-avoid-break rounded-lg border border-gray-300 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            1. Project Profile
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-xs font-medium text-gray-500">Project Name</div>
              <div className="text-gray-900">{profile.projectName}</div>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500">Location</div>
              <div className="text-gray-900">{profile.location}</div>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500">Sector</div>
              <div className="text-gray-900">{profile.sector}</div>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500">Phase</div>
              <div className="text-gray-900">{profile.phase}</div>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500">Assessor</div>
              <div className="text-gray-900">{profile.assessor || "—"}</div>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500">Assessment Date</div>
              <div className="text-gray-900">{profile.assessmentDate || "—"}</div>
            </div>
          </div>
          {profile.description && (
            <div className="mt-4">
              <div className="text-xs font-medium text-gray-500 mb-1">Description</div>
              <p className="text-sm text-gray-700 leading-relaxed">{profile.description}</p>
            </div>
          )}
        </section>

        {/* Assessment Method */}
        <section className="print-avoid-break rounded-lg border border-gray-300 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            2. Assessment Method
          </h2>
          <div className="text-sm text-gray-700 space-y-3 leading-relaxed">
            <p>
              This assessment uses a structured self-evaluation across eight
              dimensions of social licence readiness. Each dimension contains
              five questions, scored on a five-point scale:
            </p>
            <div className="pl-4 space-y-1">
              {([0, 1, 2, 3, 4] as const).map((v) => (
                <div key={v} className="text-sm">
                  <strong>{v}</strong> — {RESPONSE_LABELS[v]}: {RESPONSE_DESCRIPTIONS_SENTENCES[v]}
                </div>
              ))}
            </div>
            <p>
              Questions may also be marked <strong>Not Applicable</strong>,
              which excludes them from the denominator.
            </p>
            <p>
              <strong>Dimension Score</strong> = Actual Points / Maximum
              Applicable Points × 100
            </p>
            <p>
              <strong>Overall Readiness</strong> = Average of applicable
              dimension scores
            </p>
            <p>
              The result is a Social Licence <strong>Readiness Profile</strong>,
              not a validated Social Licence Score.
            </p>
          </div>
        </section>

        {/* Overall Readiness Profile */}
        <section className="print-avoid-break rounded-lg border border-gray-300 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            3. Overall Readiness Profile
          </h2>
          <div className="text-center py-4">
            <div
              className="text-4xl font-bold"
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
          </div>
        </section>

        {/* Dimension Results */}
        <section className="print-avoid-break rounded-lg border border-gray-300 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            4. Dimension Results
          </h2>
          <div className="space-y-4">
            {result.dimensionResults.map((dr) => (
              <div key={dr.dimensionId} className="print-avoid-break">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">
                    {dr.dimensionName}
                  </span>
                  <span className="text-sm font-bold" style={{ color: dr.isApplicable ? dr.band.color : "#6b7280" }}>
                    {dr.isApplicable ? `${dr.score}%` : "N/A"}
                  </span>
                </div>
                {dr.isApplicable ? (
                  <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${dr.score}%`, backgroundColor: dr.band.color }}
                    />
                  </div>
                ) : (
                  <div className="text-xs text-gray-400 italic">
                    All questions marked Not Applicable
                  </div>
                )}
                <div className="text-xs text-gray-400 mt-1">
                  {dr.isApplicable
                    ? `${dr.actualPoints}/${dr.maxApplicablePoints} points · ${dr.applicableQuestions} applicable question${dr.applicableQuestions !== 1 ? "s" : ""}${dr.naQuestions > 0 ? ` · ${dr.naQuestions} N/A` : ""} · ${dr.band.label}`
                    : `${dr.naQuestions} question${dr.naQuestions !== 1 ? "s" : ""} marked N/A`}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Strengths */}
        <section className="print-avoid-break rounded-lg border border-gray-300 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            5. Strengths
          </h2>
          {result.strengths.length > 0 ? (
            <ul className="space-y-2">
              {result.strengths.map((s) => (
                <li key={s.dimensionId} className="text-sm text-gray-700">
                  <strong>{s.dimensionName}</strong> — {s.score}% ({s.band.label})
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 italic">
              No dimensions scored at or above the strength threshold (70%).
            </p>
          )}
        </section>

        {/* Priority Areas */}
        <section className="print-avoid-break rounded-lg border border-gray-300 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            6. Priority Areas
          </h2>
          {result.priorityAreas.length > 0 ? (
            <ul className="space-y-2">
              {result.priorityAreas.map((p) => (
                <li key={p.dimensionId} className="text-sm text-gray-700">
                  <strong>{p.dimensionName}</strong> — {p.score}% ({p.band.label})
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 italic">
              No dimensions scored below the priority threshold (50%).
            </p>
          )}
        </section>

        {/* Systemic Considerations */}
        <section className="print-avoid-break rounded-lg border border-gray-300 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            7. Systemic Considerations
          </h2>
          <ul className="space-y-3">
            {result.systemicConsiderations.map((c, i) => (
              <li key={i} className="text-sm text-gray-700 leading-relaxed">
                {c}
              </li>
            ))}
          </ul>
        </section>

        {/* Recommended Actions */}
        <section className="print-avoid-break rounded-lg border border-gray-300 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            8. Recommended Actions
          </h2>
          {result.recommendedActions.length > 0 ? (
            <div className="space-y-5">
              {result.priorityAreas.map((area) => {
                const actions = result.recommendedActions.filter(
                  (a) => a.dimensionId === area.dimensionId,
                );
                if (actions.length === 0) return null;
                return (
                  <div key={area.dimensionId}>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                      {area.dimensionName}
                      <span className="ml-2 text-xs font-normal text-gray-500">
                        ({area.score}% — {actions[0].priority} priority)
                      </span>
                    </h3>
                    <ol className="space-y-2 pl-4">
                      {actions.map((a, i) => (
                        <li key={i} className="text-sm text-gray-700 leading-relaxed">
                          {i + 1}. {a.action}
                        </li>
                      ))}
                    </ol>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">
              No priority areas identified — no specific recommendations at this time.
            </p>
          )}
        </section>

        {/* Assessment Limitations */}
        <section className="print-avoid-break rounded-lg border border-gray-300 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            9. Assessment Limitations
          </h2>
          <ul className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <li>
              This is a self-assessment tool. Scores reflect the assessor&apos;s
              own judgement and may not represent the views of affected
              stakeholders.
            </li>
            <li>
              The assessment covers eight dimensions and forty questions. It does
              not capture all possible social licence factors relevant to every
              project context.
            </li>
            <li>
              Not Applicable responses reduce the number of scored questions.
              Dimensions with all questions marked N/A are excluded from the
              overall readiness calculation, which may affect comparability
              across projects.
            </li>
            <li>
              The tool does not verify evidence or triangulate responses against
              independent sources. Scores should be interpreted as indicative of
              readiness, not as a measure of actual social licence held.
            </li>
            <li>
              Recommended actions are generated from the assessment dimension
              structure and are illustrative, not prescriptive.
            </li>
          </ul>
        </section>

        {/* Prototype Disclaimer */}
        <section className="print-avoid-break rounded-lg border border-amber-300 bg-amber-50 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-amber-900 mb-4 border-b border-amber-200 pb-2">
            10. Prototype Disclaimer
          </h2>
          <div className="text-sm text-amber-800 space-y-3 leading-relaxed">
            <p>
              This report was generated by TrustLedger Rapid Lab Prototype 01 —
              a rapid prototyping environment, not a production TrustLedger
              product.
            </p>
            <p>
              The assessment produces a Social Licence <strong>Readiness
              Profile</strong>, not a validated Social Licence Score. The
              methodology, questions, and recommendations are illustrative and
              should not be used as the sole basis for project decisions.
            </p>
            {assessment.isDemo && (
              <p>
                <strong>Synthetic Data:</strong> This report uses the fictional
                Ndlovu Water Infrastructure Project. All project details,
                stakeholder groups, and assessment responses are synthetic and
                for demonstration purposes only.
              </p>
            )}
            <p>
              All data is stored locally in the browser. No data is transmitted
              to or stored on any server.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

const RESPONSE_DESCRIPTIONS_SENTENCES: Record<number, string> = {
  0: "No evidence of this practice exists yet.",
  1: "Practice exists informally or inconsistently, without structure.",
  2: "Practice is being developed but not yet fully implemented or systematic.",
  3: "Practice is established, documented, and consistently applied.",
  4: "Practice is exemplary, continuously improved, and could serve as a model.",
};
