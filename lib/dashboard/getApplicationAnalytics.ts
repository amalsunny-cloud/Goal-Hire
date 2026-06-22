import { Application } from "@/types/application";

export default function getApplicationAnalytics(applications: Application[]) {

    const total = applications.length;

    const interviews = applications.filter((app)=>app.status === "Interview").length;

    const offers = applications.filter((app)=>app.status === "Offer").length;

    const rejected = applications.filter((app)=>app.status === "Rejected").length;
   
    const interviewRate = total > 0 ? (interviews/total)*100 : 0;
    const offerRate = total > 0 ? (offers/total)*100 : 0;

  return {
    total,
    interviews,
    offers,
    rejected,
    interviewRate,
    offerRate
  }
}
