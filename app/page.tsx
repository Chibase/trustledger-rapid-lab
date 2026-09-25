import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-16 sm:px-10">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            TrustLedger Rapid Lab
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Prototype Assessments
            <span className="block text-slate-600">
              Stakeholder Risk & Readiness Diagnostics
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Select a prototype assessment to evaluate stakeholder relationships,
            risk exposure, and social readiness around infrastructure projects.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/assessment"
              className="rounded-lg bg-slate-900 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Social Licence Assessment
            </Link>

            <Link
              href="/stakeholder-risk"
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Stakeholder Risk Diagnostic
            </Link>
          </div>
        </div>

        <section className="mt-16 grid gap-6 sm:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Social Licence to Build™</h2>
            <p className="mt-2 text-sm text-slate-600">Readiness Assessment</p>
            <p className="mt-4 text-slate-600">
              A structured assessment for understanding the strength of
              stakeholder, community, grievance, transparency, empowerment,
              institutional and social-risk practices around an infrastructure
              project.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="font-semibold text-slate-800">8 Dimensions</p>
                <p className="text-slate-600">Structured view of social readiness</p>
              </div>
              <div>
                <p className="font-semibold text-slate-800">40 Questions</p>
                <p className="text-slate-600">Five questions per dimension</p>
              </div>
              <div>
                <p className="font-semibold text-slate-800">Readiness Profile</p>
                <p className="text-slate-600">Clear interpretation bands</p>
              </div>
              <div>
                <p className="font-semibold text-slate-800">Priority Actions</p>
                <p className="text-slate-600">Practical improvement areas</p>
              </div>
            </div>
            <Link
              href="/assessment"
              className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Start Readiness Assessment
            </Link>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Stakeholder Risk</h2>
            <p className="mt-2 text-sm text-slate-600">Risk Intelligence Foundation</p>
            <p className="mt-4 text-slate-600">
              Research foundation for investigating stakeholder risk prediction capabilities through condition assessment, signal monitoring, and evidence architecture.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="font-semibold text-slate-800">8 Conditions</p>
                <p className="text-slate-600">Core stakeholder conditions</p>
              </div>
              <div>
                <p className="font-semibold text-slate-800">40 Questions</p>
                <p className="text-slate-600">Five questions per condition</p>
              </div>
              <div>
                <p className="font-semibold text-slate-800">10 Risk Lenses</p>
                <p className="text-slate-600">Contextual risk assessment</p>
              </div>
              <div>
                <p className="font-semibold text-slate-800">Evidence Chain</p>
                <p className="text-slate-600">Signals → Events → Outcomes</p>
              </div>
            </div>
            <Link
              href="/stakeholder-risk"
              className="mt-6 inline-block rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Start Risk Intelligence
            </Link>
          </article>
        </section>

        <p className="mt-10 max-w-2xl text-xs leading-5 text-slate-500">
          Prototype notice: these assessments are methodology and UX prototypes.
          The readiness bands, risk levels, and results are not scientifically
          validated and should not be treated as definitive measures of social
          licence or stakeholder risk.
        </p>
      </section>
    </main>
  );
}