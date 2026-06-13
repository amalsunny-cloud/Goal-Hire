import { Application } from "@/types/application";

export default function getMonthlyApplications(applications: Application[]) {
  
const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

return applications.filter((app)=>{
    const date = new Date(app.createdAt);

    return(
        date.getMonth() === currentMonth && date.getFullYear() === currentYear
    );
}).length;

}