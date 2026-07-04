import { RecruiterCommunication } from "@/types/recruiterCommunication";

export function getMonthlyCommunicationData(communications: RecruiterCommunication[]){
    const monthlyCounts: Record<string, number> = {};
    communications.forEach((communication)=>{
        const date = new Date(communication.date);

        const key = `${date.getFullYear()} - ${String(date.getMonth()+1).padStart(2,"0")}`;

        monthlyCounts[key] = (monthlyCounts[key] || 0)+1;
    });

    return Object.entries(monthlyCounts).sort(([a],[b])=> a.localeCompare(b)).map(([key, count])=>{
        const [year, month] = key.split("-");

        return {
            month: new Date(Number(year), Number(month)-1).toLocaleString("default",{
                month: "short",
                year:"2-digit",
            }),
            count,
        };
    });
}