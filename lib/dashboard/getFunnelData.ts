import { Application } from "@/types/application";

export function getFunnelData(applications: Application[]) {
  const applied = applications.filter((app) => app.status === "Applied").length;

  const interview = applications.filter(
    (app) => app.status === "Interview",
  ).length;

  const offer = applications.filter((app) => app.status === "Offer").length;

  const rejected = applications.filter(
    (app) => app.status === "Rejected",
  ).length;

  return [
    {
      stage: "Applied",
      value: applied,
    },
    {
      stage: "Interview",
      value: interview,
    },
    {
      stage: "Offer",
      value: offer,
    },
    {
      stage: "Rejected",
      value: rejected,
    },
  ];
}
