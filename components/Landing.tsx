import {
  DIMENSIONS,
  INTERPRETATION_BANDS,
} from "@/lib/assessment";

export default function Landing({
  hasSavedAssessment,
  isCompleted,
  onStart,
  onLoadDemo,
  onResume,
}: {
  hasSavedAssessment: boolean;
  isCompleted: boolean;
  onStart: () => void;
  onLoadDemo: () => void;
  onResume: () => void;
}) {
  return (
    <div className="animate-fade-in">
      <section className="bg-gradient-to-b from-[#f0fdfa] to-white border-b border-gray-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#ccfbf1] px-4 py-1.5 text-sm font-medium text-[#0f766e] mb-6">
              Prototype 01 — Rapid Lab
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              Social Licence to Build™
              <br />
              <span className="text-[#0f766e]">Readiness Assessment</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
              A structured self-assessment that helps project teams understand
              their readiness to earn and maintain social licence across eight
              dimensions of stakeholder and community practice.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onStart}
                className="inline-flex h-12 items-center justify-center rounded-lg bg-[#0f766e] px-8 text-white font-medium transition-colors hover:bg-[#115e59]"
              >
                Start New Assessment
              </button>
              {hasSavedAssessment && (
                <button
                  onClick={onResume}
                  className="inline-flex h-12 items-center justify-center rounded-lg border border-gray-300 px-8 text-gray-700 font-medium transition-colors hover:bg-gray-50"
                >
                  {isCompleted ? "View Results" : "Continue Assessment"}
                </button>
              )}
              <button
                onClick={onLoadDemo}
                className="inline-flex h-12 items-center justify-center rounded-lg border border-gray-300 px-8 text-gray-700 font-medium transition-colors hover:bg-gray-50"
              >
                Load Demonstration Project
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          How It Works
        </h2>
        <p className="text-gray-600 mb-8">
          The assessment covers 40 questions across 8 dimensions. Each question
          is scored on a five-point scale from 0 (not started) to 4 (leading),
          with an option to mark questions as Not Applicable. Your results are
          compiled into a Social Licence Readiness Profile — not a validated
          Social Licence Score.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {[
            {
              step: "1",
              title: "Complete Your Project Profile",
              desc: "Tell us about your project — name, location, sector, and phase.",
            },
            {
              step: "2",
              title: "Answer 40 Assessment Questions",
              desc: "Work through 8 dimensions, 5 questions each, at your own pace.",
            },
            {
              step: "3",
              title: "Review Your Readiness Profile",
              desc: "See dimension scores, strengths, priority areas, and recommended actions.",
            },
            {
              step: "4",
              title: "Generate a Professional Report",
              desc: "View and print a structured report suitable for stakeholder discussion.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="flex gap-4 rounded-lg border border-gray-200 bg-white p-5"
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#ccfbf1] text-sm font-bold text-[#0f766e]">
                {item.step}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-4">
          The Eight Dimensions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          {DIMENSIONS.map((dim) => (
            <div
              key={dim.id}
              className="rounded-lg border border-gray-200 bg-white p-4"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="flex h-6 w-6 items-center justify-center rounded bg-[#f0fdfa] text-xs font-bold text-[#0f766e]">
                  {dim.order}
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {dim.name}
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed pl-8">
                {dim.description}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Interpretation Bands
          </h3>
          <div className="space-y-3">
            {INTERPRETATION_BANDS.map((band) => (
              <div key={band.label} className="flex items-start gap-3">
                <div
                  className="mt-1 h-4 w-4 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: band.color }}
                />
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {band.label} ({band.min}–{band.max})
                  </div>
                  <div className="text-sm text-gray-500">{band.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
          <h3 className="text-sm font-bold text-amber-900 mb-2">
            Prototype Disclaimer
          </h3>
          <p className="text-sm text-amber-800 leading-relaxed">
            This is a Rapid Lab prototype. It is not a production TrustLedger
            product. The assessment methodology, questions, and recommendations
            are illustrative and should not be used as the sole basis for
            project decisions. Results are stored locally in your browser only —
            no data is sent to any server. This tool produces a Social Licence
            Readiness Profile, not a validated Social Licence Score. The
            demonstration project (Ndlovu Water Infrastructure Project) uses
            entirely synthetic data.
          </p>
        </div>
      </section>
    </div>
  );
}
