import { Application } from "@/types/application";

export default function getMonthlyApplications(applications: Application[]) {
  
const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  let count = 0;

  for (const application of applications) {
    const createdDate = new Date(application.createdAt);

    if (
      createdDate.getMonth() === currentMonth &&
      createdDate.getFullYear() === currentYear
    ) {
      count++;
    }
  }

  return count;
}