import { Application } from "@/types/application";

export function getAnalytics(
    applications : Application[]
){
    const totalApplications =
    applications.length;

  const interviews =
    applications.filter(
      (app) =>
        app.status === "Interview"
    ).length;

  const offers =
    applications.filter(
      (app) =>
        app.status === "Offer"
    ).length;

  const rejected =
    applications.filter(
      (app) =>
        app.status === "Rejected"
    ).length;

  const interviewRate =
    totalApplications
      ? (
          interviews /
          totalApplications
        ) * 100
      : 0;

  const offerRate =
    totalApplications
      ? (
          offers /
          totalApplications
        ) * 100
      : 0;

  return {
    totalApplications,
    interviews,
    offers,
    rejected,
    interviewRate,
    offerRate,
  };
    
}