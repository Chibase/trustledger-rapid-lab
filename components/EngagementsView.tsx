"use client";

import { useState } from "react";
import type { Assessment } from "@/lib/assessment";
import {
  DEFAULT_FILTERS,
  DEMO_ENGAGEMENTS,
  createEmptyEngagement,
  deriveProjectOptions,
  deriveStakeholderOptions,
  findProjectContext,
  removeEngagement,
  setFollowUpCompleted,
  upsertEngagement,
  type Engagement,
  type EngagementFilters,
  type EngagementSort,
  type EngagementView,
} from "@/lib/engagements";

import EngagementRegistry from "./EngagementRegistry";
import EngagementForm from "./EngagementForm";
import EngagementDetail from "./EngagementDetail";

export default function EngagementsView({
  engagements,
  assessment,
  isLoading,
  onChange,
  onOpenProject,
}: {
  engagements: Engagement[];
  assessment: Assessment | null;
  isLoading: boolean;
  onChange: (engagements: Engagement[]) => void;
  onOpenProject: () => void;
}) {
  const [view, setView] = useState<EngagementView>("registry");
  const [active, setActive] = useState<Engagement | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [filters, setFilters] = useState<EngagementFilters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<EngagementSort>("date-desc");

  const projectOptions = deriveProjectOptions(assessment, engagements);
  const stakeholderOptions = deriveStakeholderOptions(assessment, engagements);

  const openRegistry = () => {
    setActive(null);
    setIsNew(false);
    setView("registry");
  };

  const handleCreate = () => {
    setActive(
      createEmptyEngagement(
        projectOptions.length === 1 ? projectOptions[0] : "",
      ),
    );
    setIsNew(true);
    setView("form");
  };

  const handleOpen = (engagement: Engagement) => {
    setActive(engagement);
    setIsNew(false);
    setView("detail");
  };

  const handleSave = (engagement: Engagement) => {
    onChange(upsertEngagement(engagements, engagement));
    setActive(engagement);
    setIsNew(false);
    setView("detail");
  };

  const handleDelete = (engagement: Engagement) => {
    onChange(removeEngagement(engagements, engagement.id));
    openRegistry();
  };

  const handleFilterByStakeholder = (stakeholder: string) => {
    setFilters({ ...DEFAULT_FILTERS, query: stakeholder });
    openRegistry();
  };

  if (view === "form" && active) {
    return (
      <EngagementForm
        engagement={active}
        isNew={isNew}
        projectOptions={projectOptions}
        stakeholderOptions={stakeholderOptions}
        onSave={handleSave}
        onCancel={() => (isNew ? openRegistry() : setView("detail"))}
      />
    );
  }

  if (view === "detail" && active) {
    const current =
      engagements.find((engagement) => engagement.id === active.id) ?? active;
    return (
      <EngagementDetail
        engagement={current}
        engagements={engagements}
        projectProfile={findProjectContext(assessment, current.projectName)}
        onBack={openRegistry}
        onEdit={() => {
          setActive(current);
          setIsNew(false);
          setView("form");
        }}
        onDelete={() => handleDelete(current)}
        onOpenEngagement={handleOpen}
        onOpenProject={onOpenProject}
        onFilterByStakeholder={handleFilterByStakeholder}
        onToggleFollowUp={(completed) =>
          onChange(setFollowUpCompleted(engagements, current.id, completed))
        }
      />
    );
  }

  return (
    <EngagementRegistry
      engagements={engagements}
      filters={filters}
      sort={sort}
      isLoading={isLoading}
      projectOptions={projectOptions}
      onFiltersChange={setFilters}
      onSortChange={setSort}
      onCreate={handleCreate}
      onOpen={handleOpen}
      onLoadDemo={() => onChange(DEMO_ENGAGEMENTS)}
    />
  );
}
