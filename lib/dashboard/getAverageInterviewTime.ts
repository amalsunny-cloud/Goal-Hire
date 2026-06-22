import { Application } from "@/types/application";

export function getAverageInterviewTime(applications: Application[]) {
  const interviewApps = applications.filter(
    (app) => app.status === "Interview",
  );

  if (interviewApps.length === 0) {
    return 0;
  }

  const totalDays = interviewApps.reduce((sum, app) => {
    const created = new Date(app.createdAt);

    const updated = new Date(app.updatedAt);

    const days =
      (updated.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);

    return sum + days;
  }, 0);

  return totalDays / interviewApps.length;
}
