import { Application } from "@/types/application";

export function getAnalytics(
  applications: Application[]
) {
  const analytics = {
    totalApplications: applications.length,
    interviews: 0,
    offers: 0,
    rejected: 0,
  };

  for (const application of applications) {
    switch (application.status) {
      case "Interview":
        analytics.interviews++;
        break;

      case "Offer":
        analytics.offers++;
        break;

      case "Rejected":
        analytics.rejected++;
        break;
    }
  }

  const interviewRate =
    analytics.totalApplications === 0
      ? 0
      : (analytics.interviews /
          analytics.totalApplications) *
        100;

  const offerRate =
    analytics.totalApplications === 0
      ? 0
      : (analytics.offers /
          analytics.totalApplications) *
        100;

  return {
    ...analytics,
    interviewRate,
    offerRate,
  };
}