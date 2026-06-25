import { Application } from "@/types/application";

export function getPredictionAnalytics(applications: Application[]) {
  const totalApplications = applications.length;
  const interviews = applications.filter(
    (app) => app.status === "Interview",
  ).length;

  const offers = applications.filter((app) => app.status === "Offer").length;

  const interviewRate =
    totalApplications > 0 ? (interviews / totalApplications) * 100 : 0;

  const offerRate =
    totalApplications > 0 ? (offers / totalApplications) * 100 : 0;

  const expectedInterviews = Math.round((interviewRate / 100) * 100);

  const expectedOffers = Math.round((offerRate / 100) * 100);

  return {
    totalApplications,
    interviews,
    offers,
    interviewRate,
    offerRate,
    expectedInterviews,
    expectedOffers,
  };
}
