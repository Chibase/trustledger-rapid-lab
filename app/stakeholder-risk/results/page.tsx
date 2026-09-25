"use client";

import { useEffect, useState } from "react";

import { buildRiskResult } from "@/lib/stakeholder-risk/results";
import type {
  RiskProject,
  RiskResponse,
} from "@/types/stakeholder-risk";

const RESPONSES_KEY = "trustledger-stakeholder-risk-responses";
const PROJECT_KEY = "trustledger-stakeholder-risk-project";

export default function StakeholderRiskResultsPage() {
  const [result, setResult] = useState<ReturnType<
    typeof buildRiskResult
  > | null>(null);

  const [project, setProject] = useState<RiskProject | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RESPONSES_KEY);

      if (!stored) {
        throw new Error("No risk assessment responses were found.");
      }

      const responses = JSON.parse(stored) as RiskResponse[];

      setResult(buildRiskResult(responses));

      const storedProject = localStorage.getItem(PROJECT_KEY);

      if (storedProject) {
        setProject(JSON.parse(storedProject) as RiskProject);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to build the risk assessment results.",
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
            href="/stakeholder-risk/questions/stakeholder_coverage"
            className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
          >
            Return to Risk Assessment
          </a>
        </div>
      </main>
    );
  }

  if (!result) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-slate-500">Preparing risk results…</p>
        </div>
      </main>
    );
  }

  const strengths = [...result.conditionResults]
    .filter((condition) => condition.score >= 70)
    .sort((a, b) => b.score - a.score);

  const priorityConditions = [...result.conditionResults]
    .filter((condition) => condition.score < 70)
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
            Stakeholder Risk Intelligence
          </h1>

          <p className="mt-2 text-xl font-semibold text-slate-700">
            Risk Assessment Report
          </p>

          <p className="mt-4 max-w-3xl text-slate-600">
            A structured assessment of stakeholder conditions evaluated through
            contextual risk lenses across financial, operational, regulatory, environmental,
            social, political, reputational, and market dimensions, establishing the
            foundation for stakeholder risk intelligence research.
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
          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Stakeholder Condition Score
              </p>

              <p className="mt-2 text-5xl font-bold tracking-tight">
                {result.overallConditionScore}%
              </p>

              <p className="mt-2 text-sm text-slate-600">
                {result.conditionBand}
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Risk Exposure Score
              </p>

              <p className="mt-2 text-5xl font-bold tracking-tight">
                {result.overallRiskExposure}%
              </p>

              <p className="mt-2 text-sm text-slate-600">
                {result.riskBand}
              </p>
            </article>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Overall Priority
            </p>

            <p className="mt-2 text-2xl font-bold">{result.priority}</p>
          </div>
        </section>

        {/* Interpretation */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Risk Assessment Interpretation
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            What the risk result indicates
          </h2>

          <p className="mt-4 max-w-4xl leading-7 text-slate-600">
            {result.description}
          </p>
        </section>

        {/* Condition Results */}
        <section className="mt-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Stakeholder Conditions
            </p>

            <h2 className="mt-2 text-2xl font-bold">Condition Results</h2>

            <p className="mt-2 text-slate-600">
              The risk assessment examines eight core stakeholder conditions. Each condition score
              reflects the applicable responses recorded during the assessment.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {result.conditionResults.map((condition) => {
              const recommendation = result.recommendations.find(
                (item) => item.conditionId === condition.conditionId,
              );

              return (
                <article
                  key={condition.conditionId}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {recommendation?.conditionName ??
                          condition.conditionId}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {recommendation?.priority}
                      </p>
                    </div>

                    <span className="shrink-0 text-2xl font-bold">
                      {condition.score}%
                    </span>
                  </div>

                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-slate-800"
                      style={{ width: `${condition.score}%` }}
                      aria-label={`${condition.score}%`}
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

        {/* Risk Lens Results */}
        <section className="mt-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Risk Lenses
            </p>

            <h2 className="mt-2 text-2xl font-bold">Risk Exposure by Context</h2>

            <p className="mt-2 text-slate-600">
              Risk exposure calculated across contextual risk lenses based on stakeholder condition assessments.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {result.riskLensResults.map((lensResult) => (
              <article
                key={lensResult.lens}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-slate-900 capitalize">
                      {lensResult.lens} Risk
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {lensResult.contributingConditions.length} contributing condition(s)
                    </p>
                  </div>

                  <span className="shrink-0 text-2xl font-bold">
                    {lensResult.score}%
                  </span>
                </div>

                <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-slate-800"
                    style={{ width: `${lensResult.score}%` }}
                    aria-label={`${lensResult.score}%`}
                  />
                </div>

                <div className="mt-2 flex justify-between text-xs text-slate-400">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </article>
            ))}
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
              These conditions recorded scores of 70% or higher in this
              risk assessment.
            </p>

            <div className="mt-5 space-y-3">
              {strengths.map((condition) => {
                const recommendation = result.recommendations.find(
                  (item) => item.conditionId === condition.conditionId,
                );

                return (
                  <div
                    key={condition.conditionId}
                    className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4"
                  >
                    <span className="font-medium">
                      {recommendation?.conditionName ??
                        condition.conditionId}
                    </span>

                    <span className="font-bold">{condition.score}%</span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Priority Areas */}
        {priorityConditions.length > 0 && (
          <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Priority Areas
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Areas Requiring Attention
            </h2>

            <p className="mt-2 text-slate-600">
              The following conditions recorded scores below 70% and should be
              considered in planning risk mitigation actions.
            </p>

            <div className="mt-6 space-y-5">
              {priorityConditions.map((condition) => {
                const recommendation = result.recommendations.find(
                  (item) => item.conditionId === condition.conditionId,
                );

                if (!recommendation) {
                  return null;
                }

                return (
                  <article
                    key={condition.conditionId}
                    className="border-l-4 border-slate-800 pl-5"
                  >
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="font-bold">
                        {recommendation.conditionName}
                      </h3>

                      <span className="text-sm font-semibold text-slate-500">
                        {condition.score}% · {recommendation.priority}
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
            The prototype uses eight core stakeholder conditions with five
            questions per condition. Each question is assessed through specific
            contextual risk lenses. Responses are recorded on a five-level
            scale from Not in place to Fully in place. Not Applicable
            responses are excluded from the applicable-question denominator.
          </p>

          <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
            <h3 className="font-semibold text-slate-900">Condition Strength vs Risk Exposure</h3>
            <p className="mt-2 text-sm text-slate-600">
              <strong>Condition Strength</strong> represents the health/strength of the underlying stakeholder condition.
              <strong>Risk Exposure</strong> represents potential exposure associated with weakness in that condition,
              calculated from individual question responses mapped to specific risk lenses.
            </p>
          </div>
        </section>

        {/* Research Architecture */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Research Architecture
          </p>

          <h2 className="mt-2 text-2xl font-bold">Stakeholder Risk Intelligence Foundation</h2>

          <p className="mt-4 leading-7 text-slate-600">
            This prototype establishes the domain architecture for stakeholder risk intelligence research:
          </p>

          <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
            <h3 className="font-semibold text-slate-900">Evidence Chain</h3>
            <p className="mt-2 text-sm text-slate-600">
              Stakeholder Conditions → Stakeholder Signals → Sentiment → Behaviour → Events/Incidents → 
              Observed Outcomes → Patterns → Risk Indicators → Likelihood → Consequence → Prediction → Validation
            </p>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-100 bg-white p-3">
              <h4 className="font-semibold text-slate-900 text-sm">Condition</h4>
              <p className="mt-1 text-xs text-slate-600">What the stakeholder environment looks like</p>
            </div>
            <div className="rounded-lg border border-slate-100 bg-white p-3">
              <h4 className="font-semibold text-slate-900 text-sm">Signal</h4>
              <p className="mt-1 text-xs text-slate-600">What measurable change is occurring</p>
            </div>
            <div className="rounded-lg border border-slate-100 bg-white p-3">
              <h4 className="font-semibold text-slate-900 text-sm">Sentiment</h4>
              <p className="mt-1 text-xs text-slate-600">What stakeholders report/express</p>
            </div>
            <div className="rounded-lg border border-slate-100 bg-white p-3">
              <h4 className="font-semibold text-slate-900 text-sm">Behaviour</h4>
              <p className="mt-1 text-xs text-slate-600">What stakeholders actually do</p>
            </div>
            <div className="rounded-lg border border-slate-100 bg-white p-3">
              <h4 className="font-semibold text-slate-900 text-sm">Event</h4>
              <p className="mt-1 text-xs text-slate-600">What actually happens</p>
            </div>
            <div className="rounded-lg border border-slate-100 bg-white p-3">
              <h4 className="font-semibold text-slate-900 text-sm">Outcome</h4>
              <p className="mt-1 text-xs text-slate-600">What the project experiences</p>
            </div>
          </div>
        </section>

        {/* Prototype Notice */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-100 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Prototype Notice
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            This is a TrustLedger Rapid Lab prototype. The risk bands,
            interpretation rules, and results have not been scientifically
            validated and should not be treated as a definitive measure of
            stakeholder risk. The results are intended to support structured
            discussion, assessment, and identification of areas for further
            review.
          </p>

          <div className="mt-4 rounded-lg border border-slate-200 bg-white p-3">
            <h4 className="font-semibold text-slate-900 text-sm">Research Integrity Notice</h4>
            <p className="mt-2 text-xs leading-5 text-slate-600">
              This prototype does NOT claim scientifically validated event probabilities, 
              reliable monetary-loss prediction, verified community sentiment, 
              verified stakeholder behaviour prediction, or predictive validity. 
              It establishes the architecture required to investigate these capabilities 
              through the research progression: Assessment → Observation → Pattern → 
              Outcome relationship → Prediction → Validation.
            </p>
          </div>
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
              window.location.href = "/stakeholder-risk";
            }}
            className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Start New Risk Assessment
          </button>
        </div>

        <footer className="mt-10 border-t border-slate-200 pt-6 text-xs text-slate-500">
          <p>TrustLedger Rapid Lab · Stakeholder Risk Intelligence</p>
          <p className="mt-1">
            Prototype risk assessment report generated from the responses recorded
            in this browser. This establishes the research architecture for stakeholder
            risk intelligence and does not claim predictive capabilities.
          </p>
        </footer>
      </div>
    </main>
  );
}
