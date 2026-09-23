"use client";

import { useEffect, useState } from "react";

import { buildAssessmentResult } from "@/lib/assessment/results";
import type {
  AssessmentProject,
  AssessmentResponse,
} from "@/types/assessment";

const RESPONSES_KEY = "trustledger-assessment-responses";
const PROJECT_KEY = "trustledger-assessment-project";

export default function AssessmentResultsPage() {
  const [result, setResult] = useState<ReturnType<
    typeof buildAssessmentResult
  > | null>(null);

  const [project, setProject] = useState<AssessmentProject | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RESPONSES_KEY);

      if (!stored) {
        throw new Error("No assessment responses were found.");
      }

      const responses = JSON.parse(stored) as AssessmentResponse[];

      setResult(buildAssessmentResult(responses));

      const storedProject = localStorage.getItem(PROJECT_KEY);

      if (storedProject) {
        setProject(JSON.parse(storedProject) as AssessmentProject);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to build the assessment results.",
      );
    }
  }, []);

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900 sm:px-10">
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            TrustLedger Rapid Lab
          </p>

          <h1 className="mt-3 text-2xl font-bold">Results unavailable</h1>

          <p className="mt-3 text-slate-600">{error}</p>

          <a
            href="/assessment/questions/stakeholder_coverage"
            className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
          >
            Return to Assessment
          </a>
        </div>
      </main>
    );
  }

  if (!result) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-slate-500">Preparing results…</p>
        </div>
      </main>
    );
  }

  const strengths = [...result.dimensionResults]
    .filter((dimension) => dimension.score >= 60)
    .sort((a, b) => b.score - a.score);

  const priorityDimensions = [...result.dimensionResults]
    .filter((dimension) => dimension.score < 60)
    .sort((a, b) => a.score - b.score);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900 sm:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Report Header */}
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            TrustLedger Rapid Lab
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            Social Licence to Build™
          </h1>

          <p className="mt-2 text-xl font-semibold text-slate-700">
            Readiness Assessment Report
          </p>

          <p className="mt-4 max-w-3xl text-slate-600">
            A structured assessment of the project's social readiness across
            eight dimensions relevant to stakeholder relationships,
            participation, engagement, grievance readiness, transparency,
            empowerment alignment, institutional alignment, and social risk.
          </p>
        </header>

        {/* Project Information */}
        {project && (
          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Project Information
            </p>

            <h2 className="mt-2 text-2xl font-bold">{project.name}</h2>

            <div className="mt-5 grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
              <div>
                <p className="font-semibold text-slate-800">Project type</p>
                <p className="mt-1">{project.type}</p>
              </div>

              <div>
                <p className="font-semibold text-slate-800">Project stage</p>
                <p className="mt-1">{project.stage}</p>
              </div>

              <div>
                <p className="font-semibold text-slate-800">Location</p>
                <p className="mt-1">{project.location}</p>
              </div>

              <div>
                <p className="font-semibold text-slate-800">Sponsor</p>
                <p className="mt-1">{project.sponsor}</p>
              </div>

              <div>
                <p className="font-semibold text-slate-800">Assessment date</p>
                <p className="mt-1">{project.assessmentDate}</p>
              </div>

              {project.approximateValue && (
                <div>
                  <p className="font-semibold text-slate-800">
                    Approximate project value
                  </p>
                  <p className="mt-1">{project.approximateValue}</p>
                </div>
              )}

              {project.affectedCommunity && (
                <div>
                  <p className="font-semibold text-slate-800">
                    Affected community
                  </p>
                  <p className="mt-1">{project.affectedCommunity}</p>
                </div>
              )}

              {project.respondentRole && (
                <div>
                  <p className="font-semibold text-slate-800">
                    Respondent role
                  </p>
                  <p className="mt-1">{project.respondentRole}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Overall Result */}
        <section className="mt-8">
          <div className="grid gap-4 sm:grid-cols-3">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Overall readiness
              </p>

              <p className="mt-2 text-5xl font-bold tracking-tight">
                {result.overallScore}%
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Readiness band
              </p>

              <p className="mt-3 text-2xl font-bold">{result.band}</p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Overall priority
              </p>

              <p className="mt-3 text-2xl font-bold">{result.priority}</p>
            </article>
          </div>
        </section>

        {/* Interpretation */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Assessment Interpretation
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            What the readiness result indicates
          </h2>

          <p className="mt-4 max-w-4xl leading-7 text-slate-600">
            {result.description}
          </p>
        </section>

        {/* Dimension Results */}
        <section className="mt-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Assessment Dimensions
            </p>

            <h2 className="mt-2 text-2xl font-bold">Dimension Results</h2>

            <p className="mt-2 text-slate-600">
              The assessment examines eight dimensions. Each dimension score
              reflects the applicable responses recorded during the
              assessment.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {result.dimensionResults.map((dimension) => {
              const recommendation = result.recommendations.find(
                (item) => item.dimensionId === dimension.dimensionId,
              );

              return (
                <article
                  key={dimension.dimensionId}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {recommendation?.dimensionName ??
                          dimension.dimensionId}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {recommendation?.priority}
                      </p>
                    </div>

                    <span className="shrink-0 text-2xl font-bold">
                      {dimension.score}%
                    </span>
                  </div>

                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-slate-800"
                      style={{ width: `${dimension.score}%` }}
                      aria-label={`${dimension.score}%`}
                    />
                  </div>

                  <div className="mt-2 flex justify-between text-xs text-slate-400">
                    <span>0%</span>
                    <span>100%</span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Key Strengths */}
        {strengths.length > 0 && (
          <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Positive Areas
            </p>

            <h2 className="mt-2 text-2xl font-bold">Key Strengths</h2>

            <p className="mt-2 text-slate-600">
              These dimensions recorded scores of 60% or higher in this
              assessment.
            </p>

            <div className="mt-5 space-y-3">
              {strengths.map((dimension) => {
                const recommendation = result.recommendations.find(
                  (item) => item.dimensionId === dimension.dimensionId,
                );

                return (
                  <div
                    key={dimension.dimensionId}
                    className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4"
                  >
                    <span className="font-medium">
                      {recommendation?.dimensionName ??
                        dimension.dimensionId}
                    </span>

                    <span className="font-bold">{dimension.score}%</span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Priority Areas */}
        {priorityDimensions.length > 0 && (
          <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Priority Areas
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Areas Requiring Attention
            </h2>

            <p className="mt-2 text-slate-600">
              The following dimensions recorded scores below 60% and should be
              considered in planning improvement actions.
            </p>

            <div className="mt-6 space-y-5">
              {priorityDimensions.map((dimension) => {
                const recommendation = result.recommendations.find(
                  (item) => item.dimensionId === dimension.dimensionId,
                );

                if (!recommendation) {
                  return null;
                }

                return (
                  <article
                    key={dimension.dimensionId}
                    className="border-l-4 border-slate-800 pl-5"
                  >
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="font-bold">
                        {recommendation.dimensionName}
                      </h3>

                      <span className="text-sm font-semibold text-slate-500">
                        {dimension.score}% · {recommendation.priority}
                      </span>
                    </div>

                    <h4 className="mt-2 font-semibold">
                      {recommendation.title}
                    </h4>

                    <p className="mt-2 leading-6 text-slate-600">
                      {recommendation.action}
                    </p>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* Methodology */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Methodology
          </p>

          <h2 className="mt-2 text-2xl font-bold">How the result is calculated</h2>

          <p className="mt-4 leading-7 text-slate-600">
            The prototype uses eight assessment dimensions with five
            questions per dimension. Responses are recorded on a five-level
            scale from Not in place to Fully in place. Not Applicable
            responses are excluded from the applicable-question denominator.
            Dimension scores are calculated from the applicable responses and
            the overall readiness result is derived from the applicable
            dimension scores.
          </p>
        </section>

        {/* Prototype Notice */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-100 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Prototype Notice
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            This is a TrustLedger Rapid Lab prototype. The readiness bands,
            interpretation rules, and results have not been scientifically
            validated and should not be treated as a definitive measure of
            social licence. The results are intended to support structured
            discussion, assessment, and identification of areas for further
            review.
          </p>
        </section>

        {/* Actions */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row print:hidden">
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Print / Save as PDF
          </button>

          <button
            type="button"
            onClick={() => {
              window.localStorage.removeItem(RESPONSES_KEY);
              window.localStorage.removeItem(PROJECT_KEY);
              window.location.href = "/assessment";
            }}
            className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Start New Assessment
          </button>
        </div>

        <footer className="mt-10 border-t border-slate-200 pt-6 text-xs text-slate-500">
          <p>TrustLedger Rapid Lab · Social Licence to Build™</p>
          <p className="mt-1">
            Prototype assessment report generated from the responses recorded
            in this browser.
          </p>
        </footer>
      </div>
    </main>
  );
}