"use client";

import { useState, useCallback } from "react";
import {
  createEmptyAssessment,
  loadAssessment,
  saveAssessment,
  clearAssessment,
  updateProfile,
  setResponse,
  setCurrentDimension,
  markCompleted,
  DEMO_PROJECT,
  type Assessment,
  type ProjectProfile,
  type ResponseValue,
  type AssessmentStage,
} from "@/lib/assessment";

import Landing from "@/components/Landing";
import ProjectProfileForm from "@/components/ProjectProfileForm";
import Questionnaire from "@/components/Questionnaire";
import ResultsView from "@/components/ResultsView";
import ReportView from "@/components/ReportView";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function getInitialAssessment(): Assessment | null {
  if (typeof window === "undefined") return null;
  return loadAssessment();
}

function getInitialStage(saved: Assessment | null): AssessmentStage {
  if (!saved) return "landing";
  if (saved.completed) return "results";
  if (saved.projectProfile.projectName) return "questionnaire";
  return "profile";
}

export default function Home() {
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [stage, setStage] = useState<AssessmentStage>("landing");
  const [mounted, setMounted] = useState(false);

  if (!mounted) {
    setMounted(true);
    const saved = getInitialAssessment();
    setAssessment(saved);
    setStage(getInitialStage(saved));
  }

  const persist = useCallback((a: Assessment) => {
    setAssessment(a);
    saveAssessment(a);
  }, []);

  const handleStart = () => {
    const fresh = createEmptyAssessment();
    persist(fresh);
    setStage("profile");
  };

  const handleLoadDemo = () => {
    const demo: Assessment = {
      id: `demo-${Date.now()}`,
      projectProfile: DEMO_PROJECT.profile,
      responses: DEMO_PROJECT.responses,
      currentDimensionIndex: 0,
      startedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      completed: true,
      isDemo: true,
    };
    persist(demo);
    setStage("results");
  };

  const handleProfileSubmit = (profile: ProjectProfile) => {
    if (!assessment) return;
    const updated = updateProfile(assessment, profile);
    persist(updated);
    setStage("questionnaire");
  };

  const handleResponse = (questionId: string, value: ResponseValue) => {
    if (!assessment) return;
    const updated = setResponse(assessment, questionId, value);
    persist(updated);
  };

  const handleDimensionChange = (index: number) => {
    if (!assessment) return;
    const updated = setCurrentDimension(assessment, index);
    persist(updated);
  };

  const handleComplete = () => {
    if (!assessment) return;
    const completed = markCompleted(assessment);
    persist(completed);
    setStage("results");
  };

  const handleBackToProfile = () => {
    setStage("profile");
  };

  const handleViewReport = () => {
    setStage("report");
  };

  const handleBackToResults = () => {
    setStage("results");
  };

  const handleReset = () => {
    clearAssessment();
    setAssessment(null);
    setStage("landing");
  };

  const handleResume = () => {
    if (!assessment) return;
    if (assessment.completed) {
      setStage("results");
    } else if (assessment.projectProfile.projectName) {
      setStage("questionnaire");
    } else {
      setStage("profile");
    }
  };

  if (!mounted) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-screen">
        <div className="text-gray-400 text-sm">Loading…</div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col min-h-screen">
      <Header stage={stage} onReset={handleReset} />
      <main className="flex-1 w-full">
        {stage === "landing" && (
          <Landing
            hasSavedAssessment={!!assessment}
            isCompleted={assessment?.completed ?? false}
            onStart={handleStart}
            onLoadDemo={handleLoadDemo}
            onResume={handleResume}
          />
        )}
        {stage === "profile" && assessment && (
          <ProjectProfileForm
            initialProfile={assessment.projectProfile}
            onSubmit={handleProfileSubmit}
            onBack={handleReset}
          />
        )}
        {stage === "questionnaire" && assessment && (
          <Questionnaire
            assessment={assessment}
            onResponse={handleResponse}
            onDimensionChange={handleDimensionChange}
            onComplete={handleComplete}
            onBack={handleBackToProfile}
          />
        )}
        {stage === "results" && assessment && (
          <ResultsView
            assessment={assessment}
            onViewReport={handleViewReport}
            onReset={handleReset}
          />
        )}
        {stage === "report" && assessment && (
          <ReportView
            assessment={assessment}
            onBack={handleBackToResults}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
