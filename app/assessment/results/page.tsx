"use client";

import { useEffect, useState } from "react";

import { buildAssessmentResult } from "@/lib/assessment/results";
import type { AssessmentResponse } from "@/types/assessment";

const RESPONSES_KEY = "trustledger-assessment-responses";

export default function AssessmentResultsPage() {
  const [result, setResult] = useState<ReturnType<
    typeof buildAssessmentResult
  > | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RESPONSES_KEY);

      if (!stored) {
        throw new Error("No assessment responses were found.");
      }

      const responses = JSON.parse(stored) as AssessmentResponse[];
      setResult(buildAssessmentResult(responses));
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
          <h1 className="text-2xl font-bold">Results unavailable</h1>
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

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          TrustLedger Rapid Lab
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          Assessment Complete
        </h1>

        <p className="mt-3 max-w-2xl text-slate-600">
          Your Social Licence to Build™ Readiness Profile has been calculated
          from the responses recorded in this browser.
        </p>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Overall readiness</p>
            <p className="mt-2 text-4xl font-bold">{result.overallScore}%</p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Readiness band</p>
            <p className="mt-2 text-xl font-bold">{result.band}</p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Overall priority</p>
            <p className="mt-2 text-xl font-bold">{result.priority}</p>
          </article>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Readiness interpretation</h2>
          <p className="mt-3 leading-7 text-slate-600">
            {result.description}
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold">Dimension results</h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
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
                    <h3 className="font-semibold">
                      {recommendation?.dimensionName ??
                        dimension.dimensionId}
                    </h3>

                    <span className="text-lg font-bold">
                      {dimension.score}%
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    {recommendation?.priority}
                  </p>

                  {recommendation && (
                    <>
                      <h4 className="mt-4 font-semibold">
                        {recommendation.title}
                      </h4>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {recommendation.action}
                      </p>
                    </>
                  )}
                </article>
              );
            })}
          </div>
        </section>

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
              window.localStorage.removeItem(
                "trustledger-assessment-responses",
              );
              window.localStorage.removeItem(
                "trustledger-assessment-project",
              );
              window.location.href = "/assessment";
            }}
            className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Start New Assessment
          </button>
        </div>

        <p className="mt-8 text-xs leading-5 text-slate-500">
          Prototype notice: these readiness bands and results are not
          scientifically validated and should not be treated as a definitive
          measure of social licence.
        </p>
      </div>
    </main>
  );
}
