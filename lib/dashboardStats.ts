import { Application }
from "@/types/application";


export function getStats(
  applications: Application[]
) {
  return {
    
    total:
      applications.length,

    applied:
      applications.filter(
        app =>
          app.status === "Applied"
      ).length,

    interview:
      applications.filter(
        app =>
          app.status === "Interview"
      ).length,

    offer:
      applications.filter(
        app =>
          app.status === "Offer"
      ).length,

    rejected:
      applications.filter(
        app =>
          app.status === "Rejected"
      ).length,
      
  };
}

