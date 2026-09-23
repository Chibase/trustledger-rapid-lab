"use client";

import { useMemo } from "react";
import {
  DIMENSIONS,
  QUESTIONS,
  getQuestionsForDimension,
  RESPONSE_LABELS,
  RESPONSE_DESCRIPTIONS,
  type Assessment,
  type ResponseValue,
} from "@/lib/assessment";

export default function Questionnaire({
  assessment,
  onResponse,
  onDimensionChange,
  onComplete,
  onBack,
}: {
  assessment: Assessment;
  onResponse: (questionId: string, value: ResponseValue) => void;
  onDimensionChange: (index: number) => void;
  onComplete: () => void;
  onBack: () => void;
}) {
  const currentDim = DIMENSIONS[assessment.currentDimensionIndex];
  const questions = useMemo(
    () => getQuestionsForDimension(currentDim.id, QUESTIONS),
    [currentDim.id],
  );

  const totalAnswered = Object.keys(assessment.responses).length;
  const progressPercent = Math.round((totalAnswered / QUESTIONS.length) * 100);

  const allCurrentAnswered = questions.every(
    (q) => assessment.responses[q.id] !== undefined,
  );

  const isLastDimension =
    assessment.currentDimensionIndex === DIMENSIONS.length - 1;

  const allAllAnswered = QUESTIONS.every(
    (q) => assessment.responses[q.id] !== undefined,
  );

  return (
    <div className="animate-fade-in mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="no-print mb-6">
        <button
          onClick={onBack}
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4"
        >
          ← Edit project profile
        </button>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Assessment Progress
            </span>
            <span className="text-sm text-gray-500">
              {totalAnswered} of {QUESTIONS.length} answered ({progressPercent}%)
            </span>
          </div>
          <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full bg-[#0f766e] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {DIMENSIONS.map((dim, i) => {
            const dimQuestions = getQuestionsForDimension(dim.id, QUESTIONS);
            const dimAnswered = dimQuestions.filter(
              (q) => assessment.responses[q.id] !== undefined,
            ).length;
            const isComplete = dimAnswered === dimQuestions.length;
            const isCurrent = i === assessment.currentDimensionIndex;

            return (
              <button
                key={dim.id}
                onClick={() => onDimensionChange(i)}
                className={`flex h-7 w-7 items-center justify-center rounded text-xs font-medium transition-colors ${
                  isCurrent
                    ? "bg-[#0f766e] text-white"
                    : isComplete
                      ? "bg-[#ccfbf1] text-[#0f766e]"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
                title={dim.name}
              >
                {dim.order}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
        <div className="mb-6">
          <div className="text-sm font-medium text-[#0f766e] mb-1">
            Dimension {currentDim.order} of {DIMENSIONS.length}
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            {currentDim.name}
          </h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            {currentDim.description}
          </p>
        </div>

        <div className="space-y-8">
          {questions.map((question, qi) => {
            const currentResponse = assessment.responses[question.id];
            const isNA = currentResponse === "NA";

            return (
              <div
                key={question.id}
                className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
              >
                <div className="mb-3">
                  <div className="flex gap-2 items-start">
                    <span className="text-sm font-bold text-gray-400 mt-0.5">
                      {qi + 1}.
                    </span>
                    <p className="text-sm font-medium text-gray-900 leading-relaxed">
                      {question.text}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1.5 pl-6 leading-relaxed">
                    {question.guidance}
                  </p>
                </div>

                <div className="pl-6 space-y-2">
                  {([0, 1, 2, 3, 4] as const).map((val) => (
                    <label
                      key={val}
                      className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${
                        currentResponse === val
                          ? "border-[#0f766e] bg-[#f0fdfa]"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={val}
                        checked={currentResponse === val}
                        onChange={() => onResponse(question.id, val)}
                        className="mt-0.5 accent-[#0f766e]"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {val} — {RESPONSE_LABELS[val]}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {RESPONSE_DESCRIPTIONS[val]}
                        </div>
                      </div>
                    </label>
                  ))}
                  <label
                    className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${
                      isNA
                        ? "border-gray-500 bg-gray-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value="NA"
                      checked={isNA}
                      onChange={() => onResponse(question.id, "NA")}
                      className="mt-0.5 accent-gray-500"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-700">
                        Not Applicable
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        This question does not apply to this project or context.
                        It will be excluded from scoring.
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="no-print mt-6 flex items-center justify-between">
        <button
          onClick={() =>
            onDimensionChange(Math.max(0, assessment.currentDimensionIndex - 1))
          }
          disabled={assessment.currentDimensionIndex === 0}
          className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-300 px-5 text-gray-700 font-medium transition-colors hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>

        {isLastDimension ? (
          <button
            onClick={onComplete}
            disabled={!allAllAnswered}
            className="inline-flex h-10 items-center justify-center rounded-lg bg-[#0f766e] px-6 text-white font-medium transition-colors hover:bg-[#115e59] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Complete Assessment →
          </button>
        ) : (
          <button
            onClick={() =>
              onDimensionChange(
                Math.min(DIMENSIONS.length - 1, assessment.currentDimensionIndex + 1),
              )
            }
            disabled={!allCurrentAnswered}
            className="inline-flex h-10 items-center justify-center rounded-lg bg-[#0f766e] px-6 text-white font-medium transition-colors hover:bg-[#115e59] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next Dimension →
          </button>
        )}
      </div>

      {isLastDimension && !allAllAnswered && (
        <p className="no-print mt-3 text-center text-sm text-amber-600">
          Please answer all questions across all dimensions before completing the assessment.
        </p>
      )}
      {!isLastDimension && !allCurrentAnswered && (
        <p className="no-print mt-3 text-center text-sm text-gray-400">
          Answer all questions in this section to continue.
        </p>
      )}
    </div>
  );
}
