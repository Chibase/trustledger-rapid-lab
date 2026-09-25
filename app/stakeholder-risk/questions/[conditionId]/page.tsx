"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import { stakeholderConditions } from "@/lib/stakeholder-risk/domains";
import { riskQuestions } from "@/lib/stakeholder-risk/questions";
import type { RiskResponse, ResponseValue } from "@/types/stakeholder-risk";

const RESPONSES_KEY = "trustledger-stakeholder-risk-responses";

const responseOptions: Array<{
  value: ResponseValue;
  label: string;
}> = [
  { value: 0, label: "Not in place" },
  { value: 1, label: "Very limited" },
  { value: 2, label: "Partially in place" },
  { value: 3, label: "Mostly in place" },
  { value: 4, label: "Fully in place" },
];

export default function StakeholderRiskConditionPage() {
  const params = useParams<{ conditionId: string }>();
  const conditionId = params.conditionId;

  const conditionIndex = stakeholderConditions.findIndex(
    (item) => item.id === conditionId,
  );

  const condition = stakeholderConditions[conditionIndex];

  const questions = useMemo(
    () =>
      condition
        ? riskQuestions.filter(
            (question) => question.conditionId === condition.id,
          )
        : [],
    [condition],
  );

  const [responses, setResponses] = useState<RiskResponse[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RESPONSES_KEY);

      if (stored) {
        const parsed = JSON.parse(stored) as RiskResponse[];

        if (Array.isArray(parsed)) {
          setResponses(parsed);
        }
      }
    } catch {
      localStorage.removeItem(RESPONSES_KEY);
    } finally {
      setReady(true);
    }
  }, []);

  function setResponse(questionId: string, value: ResponseValue) {
    setResponses((current) => {
      const existing = current.find(
        (response) => response.questionId === questionId,
      );

      if (existing) {
        return current.map((response) =>
          response.questionId === questionId
            ? { ...response, value, notApplicable: false }
            : response,
        );
      }

      return [...current, { questionId, value, notApplicable: false }];
    });
  }

  function setNotApplicable(questionId: string) {
    setResponses((current) => {
      const existing = current.find(
        (response) => response.questionId === questionId,
      );

      if (existing) {
        return current.map((response) =>
          response.questionId === questionId
            ? { ...response, value: undefined, notApplicable: true }
            : response,
        );
      }

      return [...current, { questionId, notApplicable: true }];
    });
  }

  function handleContinue() {
    localStorage.setItem(RESPONSES_KEY, JSON.stringify(responses));

    const nextCondition = stakeholderConditions[conditionIndex + 1];

    if (nextCondition) {
      window.location.href =
        `/stakeholder-risk/questions/${nextCondition.id}`;
      return;
    }

    window.location.href = "/stakeholder-risk/results";
  }

  if (!condition || conditionIndex === -1) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900 sm:px-10">
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold">Stakeholder condition not found</h1>
          <p className="mt-3 text-slate-600">
            The requested stakeholder condition section does not exist.
          </p>
          <a
            href="/stakeholder-risk"
            className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
          >
            Return to Project Profile
          </a>
        </div>
      </main>
    );
  }

  const answeredCount = questions.filter((question) => {
    const response = responses.find(
      (item) => item.questionId === question.id,
    );

    return response?.value !== undefined || response?.notApplicable === true;
  }).length;

  const isComplete = answeredCount === questions.length;
  const isLastCondition =
    conditionIndex === stakeholderConditions.length - 1;

  if (!ready) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-slate-500">Loading risk assessment…</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900 sm:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          TrustLedger Rapid Lab
        </p>

        <div className="mt-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Condition {conditionIndex + 1} of {stakeholderConditions.length}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              {condition.name}
            </h1>
          </div>

          <p className="shrink-0 text-sm text-slate-500">
            {answeredCount} of {questions.length} answered
          </p>
        </div>

        <p className="mt-3 text-slate-600">{condition.description}</p>

        <div
          className="mt-6 h-2 overflow-hidden rounded-full bg-slate-200"
          aria-label={`Risk assessment progress: condition ${conditionIndex + 1} of ${stakeholderConditions.length}`}
        >
          <div
            className="h-full bg-slate-900 transition-all"
            style={{
              width: `${((conditionIndex + 1) / stakeholderConditions.length) * 100}%`,
            }}
          />
        </div>

        <div className="mt-8 space-y-5">
          {questions.map((question, index) => {
            const response = responses.find(
              (item) => item.questionId === question.id,
            );

            return (
              <section
                key={question.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-sm font-semibold text-slate-500">
                  Question {index + 1} of {questions.length}
                </p>

                <h2 className="mt-2 text-lg font-semibold">
                  {question.text}
                </h2>

                {question.helpText && (
                  <p className="mt-2 text-sm text-slate-500">
                    {question.helpText}
                  </p>
                )}

                <div className="mt-5 grid gap-2 sm:grid-cols-5">
                  {responseOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        setResponse(question.id, option.value)
                      }
                      aria-pressed={response?.value === option.value}
                      className={`rounded-lg border px-3 py-3 text-sm transition ${
                        response?.value === option.value
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span className="block text-base font-bold">
                        {option.value}
                      </span>
                      <span className="mt-1 block text-xs">
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setNotApplicable(question.id)}
                  aria-pressed={response?.notApplicable === true}
                  className={`mt-3 rounded-lg border px-4 py-2 text-xs font-semibold transition ${
                    response?.notApplicable
                      ? "border-slate-700 bg-slate-100 text-slate-900"
                      : "border-slate-300 bg-white text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Not applicable
                </button>
              </section>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => {
              const previousCondition =
                stakeholderConditions[conditionIndex - 1];

              if (previousCondition) {
                window.location.href =
                  `/stakeholder-risk/questions/${previousCondition.id}`;
              } else {
                window.location.href = "/stakeholder-risk";
              }
            }}
            className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Back
          </button>

          <button
            type="button"
            disabled={!isComplete}
            onClick={handleContinue}
            className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isLastCondition ? "View Risk Results" : "Continue"}
          </button>
        </div>

        <p className="mt-6 text-center text-xs leading-5 text-slate-500">
          Prototype only. Responses are stored locally in this browser and
          merged across all stakeholder conditions. This prototype establishes
          the research architecture for stakeholder risk intelligence and does not
          claim predictive capabilities.
        </p>
      </div>
    </main>
  );
}
