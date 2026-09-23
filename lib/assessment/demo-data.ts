import type { ProjectProfile, ResponseValue } from "./types";

export interface DemoProject {
  profile: ProjectProfile;
  responses: Record<string, ResponseValue>;
  stakeholderGroups: string[];
  narrative: string;
}

export const DEMO_PROJECT: DemoProject = {
  profile: {
    projectName: "Ndlovu Water Infrastructure Project",
    location: "Eastern Cape, South Africa",
    sector: "Water Infrastructure",
    phase: "Construction",
    assessor: "Rapid Lab Demo Assessment",
    assessmentDate: "2026-09-23",
    description:
      "A regional bulk water supply project serving three rural communities in the Eastern Cape. The project involves a new treatment works, approximately 40 km of bulk pipeline, and three reservoirs. Construction commenced in early 2026. This is a synthetic demonstration project — all data is fictional and for illustrative purposes only.",
  },
  stakeholderGroups: [
    "Directly affected landowners along the pipeline route",
    "Mzamomhle community (downstream of treatment works)",
    "Qokolweni community (pipeline corridor)",
    "Bhisho local municipality — water services authority",
    "Eastern Cape Department of Water and Sanitation",
    "Traditional leadership (AmaNdlovu tribal authority)",
    "Local SMMEs and contractor associations",
    "Women-led agricultural cooperatives in the service area",
    "Youth representative forum",
    "Downstream agricultural water users",
    "Environmental NGOs active in the catchment",
    "Project funders and lenders",
  ],
  narrative:
    "The Ndlovu Water Infrastructure Project is a synthetic demonstration case created to illustrate the Social Licence to Build™ Readiness Assessment. All stakeholder groups, responses, and project details are fictional.",
  responses: {
    "sc-1": 3,
    "sc-2": 4,
    "sc-3": 2,
    "sc-4": 2,
    "sc-5": 1,

    "cp-1": 2,
    "cp-2": 2,
    "cp-3": 1,
    "cp-4": 1,
    "cp-5": 2,

    "eq-1": 3,
    "eq-2": 3,
    "eq-3": 2,
    "eq-4": 3,
    "eq-5": 2,

    "gr-1": 2,
    "gr-2": 2,
    "gr-3": 1,
    "gr-4": 1,
    "gr-5": 1,

    "tc-1": 3,
    "tc-2": 2,
    "tc-3": 3,
    "tc-4": 2,
    "tc-5": "NA",

    "le-1": 3,
    "le-2": 2,
    "le-3": 3,
    "le-4": 2,
    "le-5": 1,

    "ia-1": 3,
    "ia-2": 3,
    "ia-3": 4,
    "ia-4": 2,
    "ia-5": 2,

    "sr-1": 2,
    "sr-2": 1,
    "sr-3": 1,
    "sr-4": 0,
    "sr-5": 1,
  },
};
