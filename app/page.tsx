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
            Social Licence to Build™
            <span className="block text-slate-600">
              Readiness Assessment
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            A structured prototype assessment for understanding the strength of
            stakeholder, community, grievance, transparency, empowerment,
            institutional and social-risk practices around an infrastructure
            project.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/assessment"
              className="rounded-lg bg-slate-900 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Start Assessment
            </Link>

            <a
              href="#how-it-works"
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              View How It Works
            </a>
          </div>
        </div>

        <section
          id="how-it-works"
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          aria-label="How the assessment works"
        >
          {[
            {
              title: "8 Dimensions",
              description: "A structured view of social readiness.",
            },
            {
              title: "40 Questions",
              description: "Five questions across each dimension.",
            },
            {
              title: "Readiness Profile",
              description: "A clear interpretation of the assessment.",
            },
            {
              title: "Priority Actions",
              description: "Practical areas requiring attention.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h2 className="font-semibold">{item.title}</h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </section>

        <p className="mt-10 max-w-2xl text-xs leading-5 text-slate-500">
          Prototype notice: this assessment is a methodology and UX prototype.
          The readiness bands and results are not scientifically validated and
          should not be treated as a definitive measure of social licence.
        </p>
      </section>
    </main>
  );
}