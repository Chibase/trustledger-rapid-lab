"use client";

import { useState } from "react";

import type { RiskProject } from "@/types/stakeholder-risk";

const initialProject: RiskProject = {
  name: "",
  type: "",
  location: "",
  stage: "",
  sponsor: "",
  assessmentDate: new Date().toISOString().slice(0, 10),
  approximateValue: "",
  affectedCommunity: "",
  respondentRole: "",
};

export default function StakeholderRiskPage() {
  const [project, setProject] =
    useState<RiskProject>(initialProject);

  function updateField(
    field: keyof RiskProject,
    value: string,
  ) {
    setProject((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  localStorage.setItem(
    "trustledger-stakeholder-risk-project",
    JSON.stringify(project),
  );

  window.location.href = "/stakeholder-risk/questions/stakeholder_coverage";
}

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900 sm:px-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            TrustLedger Rapid Lab
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Stakeholder Risk Intelligence
          </h1>

          <p className="mt-3 text-slate-600">
            Research foundation for investigating stakeholder risk prediction capabilities through condition assessment, signal monitoring, and evidence architecture.
          </p>

          <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-1/4 bg-slate-900" />
          </div>

          <p className="mt-2 text-xs text-slate-500">
            Step 1 of 4
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block text-sm font-semibold"
              >
                Project name
              </label>

              <input
                id="name"
                required
                value={project.name}
                onChange={(event) =>
                  updateField("name", event.target.value)
                }
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                placeholder="e.g. Metropolitan Transport Infrastructure Project"
              />
            </div>

            <div>
              <label
                htmlFor="type"
                className="block text-sm font-semibold"
              >
                Project type
              </label>

              <select
                id="type"
                required
                value={project.type}
                onChange={(event) =>
                  updateField("type", event.target.value)
                }
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-slate-900"
              >
                <option value="">Select project type</option>
                <option value="Water Infrastructure">
                  Water Infrastructure
                </option>
                <option value="Transport Infrastructure">
                  Transport Infrastructure
                </option>
                <option value="Energy Infrastructure">
                  Energy Infrastructure
                </option>
                <option value="Housing">
                  Housing
                </option>
                <option value="Municipal Infrastructure">
                  Municipal Infrastructure
                </option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="stage"
                className="block text-sm font-semibold"
              >
                Project stage
              </label>

              <select
                id="stage"
                required
                value={project.stage}
                onChange={(event) =>
                  updateField("stage", event.target.value)
                }
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-slate-900"
              >
                <option value="">Select project stage</option>
                <option value="Planning">Planning</option>
                <option value="Design">Design</option>
                <option value="Procurement">Procurement</option>
                <option value="Construction">Construction</option>
                <option value="Operations">Operations</option>
                <option value="Close-out">Close-out</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-semibold"
              >
                Project location
              </label>

              <input
                id="location"
                required
                value={project.location}
                onChange={(event) =>
                  updateField("location", event.target.value)
                }
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                placeholder="e.g. Gauteng Province"
              />
            </div>

            <div>
              <label
                htmlFor="sponsor"
                className="block text-sm font-semibold"
              >
                Project sponsor
              </label>

              <input
                id="sponsor"
                required
                value={project.sponsor}
                onChange={(event) =>
                  updateField("sponsor", event.target.value)
                }
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                placeholder="Organisation or sponsor"
              />
            </div>

            <div>
              <label
                htmlFor="assessmentDate"
                className="block text-sm font-semibold"
              >
                Assessment date
              </label>

              <input
                id="assessmentDate"
                type="date"
                required
                value={project.assessmentDate}
                onChange={(event) =>
                  updateField("assessmentDate", event.target.value)
                }
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
              />
            </div>

            <div>
              <label
                htmlFor="approximateValue"
                className="block text-sm font-semibold"
              >
                Approximate project value
                <span className="ml-2 font-normal text-slate-400">
                  Optional
                </span>
              </label>

              <input
                id="approximateValue"
                value={project.approximateValue}
                onChange={(event) =>
                  updateField("approximateValue", event.target.value)
                }
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                placeholder="e.g. R2.8 billion"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="affectedCommunity"
                className="block text-sm font-semibold"
              >
                Affected community
                <span className="ml-2 font-normal text-slate-400">
                  Optional
                </span>
              </label>

              <input
                id="affectedCommunity"
                value={project.affectedCommunity}
                onChange={(event) =>
                  updateField("affectedCommunity", event.target.value)
                }
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                placeholder="Community or communities affected by the project"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="respondentRole"
                className="block text-sm font-semibold"
              >
                Your role in relation to the project
                <span className="ml-2 font-normal text-slate-400">
                  Optional
                </span>
              </label>

              <input
                id="respondentRole"
                value={project.respondentRole}
                onChange={(event) =>
                  updateField("respondentRole", event.target.value)
                }
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                placeholder="e.g. Project Risk Manager, Social Facilitator"
              />
            </div>
          </div>

          <div className="flex justify-end border-t border-slate-200 pt-6">
            <button
              type="submit"
              className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Continue to Risk Assessment
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-xs leading-5 text-slate-500">
          Prototype only. No project information is currently transmitted to
          a server. This prototype establishes the research architecture for stakeholder
          risk intelligence and does not claim predictive capabilities.
        </p>
      </div>
    </main>
  );
}
