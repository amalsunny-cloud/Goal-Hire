import { Application } from "@/types/application";

export function getApplicationsPerMonth(applications: Application[]){

    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ]

    const data = months.map((month)=>({
        month,
        applications: 0,
    }));

    applications.forEach((application)=>{
        const date = new Date(application.createdAt);

        const monthIndex = date.getMonth();

        data[monthIndex].applications +=1;
    })

    return data;
}