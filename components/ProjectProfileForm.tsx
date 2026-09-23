"use client";

import { useState } from "react";
import type { ProjectProfile } from "@/lib/assessment";

const SECTORS = [
  "Water Infrastructure",
  "Energy",
  "Transport",
  "Mining",
  "Oil & Gas",
  "Agriculture",
  "Manufacturing",
  "Construction",
  "Other",
];

const PHASES = [
  "Pre-feasibility",
  "Feasibility",
  "Design",
  "Construction",
  "Operation",
  "Decommissioning",
];

export default function ProjectProfileForm({
  initialProfile,
  onSubmit,
  onBack,
}: {
  initialProfile: ProjectProfile;
  onSubmit: (profile: ProjectProfile) => void;
  onBack: () => void;
}) {
  const [profile, setProfile] = useState<ProjectProfile>(initialProfile);

  const handleChange = (
    field: keyof ProjectProfile,
    value: string,
  ) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  return (
    <div className="animate-fade-in mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4"
        >
          ← Back to start
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Project Profile</h1>
        <p className="mt-2 text-gray-600">
          Tell us about your project. This information appears on your
          assessment report.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="projectName"
            className="block text-sm font-medium text-gray-900 mb-1.5"
          >
            Project Name <span className="text-red-500">*</span>
          </label>
          <input
            id="projectName"
            type="text"
            required
            value={profile.projectName}
            onChange={(e) => handleChange("projectName", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] focus:outline-none"
            placeholder="e.g., Ndlovu Water Infrastructure Project"
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-900 mb-1.5"
          >
            Location <span className="text-red-500">*</span>
          </label>
          <input
            id="location"
            type="text"
            required
            value={profile.location}
            onChange={(e) => handleChange("location", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] focus:outline-none"
            placeholder="e.g., Eastern Cape, South Africa"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="sector"
              className="block text-sm font-medium text-gray-900 mb-1.5"
            >
              Sector <span className="text-red-500">*</span>
            </label>
            <select
              id="sector"
              required
              value={profile.sector}
              onChange={(e) => handleChange("sector", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] focus:outline-none bg-white"
            >
              <option value="">Select a sector</option>
              {SECTORS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="phase"
              className="block text-sm font-medium text-gray-900 mb-1.5"
            >
              Project Phase <span className="text-red-500">*</span>
            </label>
            <select
              id="phase"
              required
              value={profile.phase}
              onChange={(e) => handleChange("phase", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] focus:outline-none bg-white"
            >
              <option value="">Select a phase</option>
              {PHASES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="assessor"
              className="block text-sm font-medium text-gray-900 mb-1.5"
            >
              Assessor Name
            </label>
            <input
              id="assessor"
              type="text"
              value={profile.assessor}
              onChange={(e) => handleChange("assessor", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] focus:outline-none"
              placeholder="e.g., Jane Smith"
            />
          </div>

          <div>
            <label
              htmlFor="assessmentDate"
              className="block text-sm font-medium text-gray-900 mb-1.5"
            >
              Assessment Date
            </label>
            <input
              id="assessmentDate"
              type="date"
              value={profile.assessmentDate}
              onChange={(e) => handleChange("assessmentDate", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-900 mb-1.5"
          >
            Project Description
          </label>
          <textarea
            id="description"
            rows={4}
            value={profile.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] focus:outline-none"
            placeholder="Brief description of the project scope and context…"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-[#0f766e] px-8 text-white font-medium transition-colors hover:bg-[#115e59]"
          >
            Begin Assessment →
          </button>
        </div>
      </form>
    </div>
  );
}
