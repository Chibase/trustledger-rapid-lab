import { DEMO_PROJECT } from "@/lib/assessment";
import type { Engagement } from "./types";

function demoEngagement(
  index: number,
  engagement: Omit<Engagement, "id" | "createdAt" | "updatedAt" | "isDemo">,
): Engagement {
  const timestamp = `${engagement.date}T09:00:00.000Z`;
  return {
    ...engagement,
    id: `demo-engagement-${index}`,
    createdAt: timestamp,
    updatedAt: timestamp,
    isDemo: true,
  };
}

const PROJECT = DEMO_PROJECT.profile.projectName;

export const DEMO_ENGAGEMENTS: Engagement[] = [
  demoEngagement(1, {
    projectName: PROJECT,
    stakeholders: [
      "Traditional leadership (AmaNdlovu tribal authority)",
      "Mzamomhle community (downstream of treatment works)",
    ],
    date: "2026-08-04",
    time: "10:00",
    type: "Community meeting",
    channel: "In person",
    location: "Mzamomhle community hall",
    purpose:
      "Quarterly construction update and discussion of dust suppression on the haul road.",
    participants:
      "42 community members, tribal authority representatives, project construction manager",
    outcome:
      "Community accepted the revised watering schedule. Concerns raised about night-time truck movements.",
    notes:
      "Minutes circulated to the tribal authority secretary. Interpreter provided for isiXhosa.",
    status: "Completed",
    followUp: {
      required: true,
      action:
        "Confirm revised haul road operating hours with the contractor and report back to the community.",
      owner: "Community Liaison Officer",
      dueDate: "2026-08-22",
      completed: true,
    },
  }),
  demoEngagement(2, {
    projectName: PROJECT,
    stakeholders: ["Directly affected landowners along the pipeline route"],
    date: "2026-09-02",
    time: "14:30",
    type: "One-on-one meeting",
    channel: "In person",
    location: "Farm 214, pipeline chainage 18 km",
    purpose:
      "Servitude negotiation and crop compensation discussion for the section 18–21 km pipeline crossing.",
    participants: "Landowner, land access specialist, project surveyor",
    outcome:
      "Landowner requested an independent valuation before signing the servitude agreement.",
    notes: "Valuation request logged against the land access register.",
    status: "Completed",
    followUp: {
      required: true,
      action:
        "Appoint an independent valuer and share the valuation report with the landowner.",
      owner: "Land Access Specialist",
      dueDate: "2026-09-19",
      completed: false,
    },
  }),
  demoEngagement(3, {
    projectName: PROJECT,
    stakeholders: [
      "Women-led agricultural cooperatives in the service area",
      "Youth representative forum",
    ],
    date: "2026-09-16",
    time: "09:00",
    type: "Focus group",
    channel: "In person",
    location: "Qokolweni cooperative centre",
    purpose:
      "Local procurement and employment pathways for the remaining construction phase.",
    participants:
      "18 cooperative members, 6 youth forum delegates, project socio-economic development lead",
    outcome:
      "Agreement to run a supplier readiness workshop before the next tender package.",
    notes:
      "Youth forum asked for the vacancy list to be posted at the clinic and on community radio.",
    status: "Completed",
    followUp: {
      required: true,
      action:
        "Schedule the supplier readiness workshop and publish the vacancy list at agreed locations.",
      owner: "Socio-Economic Development Lead",
      dueDate: "2026-09-12",
      completed: false,
    },
  }),
  demoEngagement(4, {
    projectName: PROJECT,
    stakeholders: [
      "Bhisho local municipality — water services authority",
      "Eastern Cape Department of Water and Sanitation",
    ],
    date: "2026-10-08",
    time: "11:00",
    type: "Formal consultation",
    channel: "Video call",
    location: "Online",
    purpose:
      "Reservoir commissioning sequence and hand-over responsibilities for bulk supply.",
    participants:
      "Municipal water services manager, provincial department representatives, project engineer",
    outcome: "",
    notes: "Agenda and technical pack to be circulated one week in advance.",
    status: "Planned",
    followUp: {
      required: false,
      action: "",
      owner: "",
      dueDate: "",
      completed: false,
    },
  }),
  demoEngagement(5, {
    projectName: PROJECT,
    stakeholders: ["Environmental NGOs active in the catchment"],
    date: "2026-07-21",
    time: "13:00",
    type: "Site visit",
    channel: "In person",
    location: "Treatment works construction platform",
    purpose:
      "Walk-through of wetland edge protection measures following the June monitoring report.",
    participants: "Two NGO representatives, environmental control officer",
    outcome:
      "Silt fence extension agreed along the eastern wetland boundary; NGOs satisfied with progress.",
    notes: "Photographic record filed with the environmental compliance pack.",
    status: "Completed",
    followUp: {
      required: false,
      action: "",
      owner: "",
      dueDate: "",
      completed: false,
    },
  }),
];
