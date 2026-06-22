import { Application } from "@/types/application";

export function getCompanyInsights(applications: Application[]) {
  const locations: Record<string, number> = {};
  const roles: Record<string, number> = {};
  const companies: Record<string, number> = {};

  applications.forEach((app) => {
    if (app.location) {
      locations[app.location] = (locations[app.location] || 0) + 1;
    }

    roles[app.role] = (roles[app.role] || 0) + 1;
    companies[app.company] = (companies[app.company] || 0) + 1;
  });

  const topLocation =
    Object.entries(locations).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

    const topRole = Object.entries(roles).sort((a,b)=>b[1] - a[1])[0]?.[0] || "N/A";

    const topCompany = Object.entries(companies).sort((a,b)=>b[1] - a[1])[0]?.[0] || "N/A";

    return {
        topLocation,
        topRole,
        topCompany,
    }
}
