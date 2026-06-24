import { Application } from "@/types/application";

export function getApplicationStreak(applications: Application[]){
    if(applications.length === 0){
        return {
            currentStreak: 0,
            longestStreak: 0,
            appliedToday: false,
        }
    }

    const dates = [...new Set(applications.map((app)=>new Date(app.createdAt).toISOString().split("T")[0]))].sort();

    let longestStreak = 1;
    let currentstreak = 1;

    for(let i=1;i<dates.length;i++){
        const previous = new Date(dates[i-1])
        const current = new Date(dates[i]);
        const diff = (current.getTime() - previous.getTime() / (1000*60*60*24));

        if(diff===1){
            currentstreak++;
            longestStreak = Math.max(longestStreak,currentstreak);
        }else{
            currentstreak = 1;
        }
    }

    const today = new Date().toISOString().split("T")[0];

    const appliedToday = dates.includes(today);

    let latestStreak = 0;
    let currentDate = new Date();
    while(true){
        const dateString = currentDate.toISOString().split("T")[0];

        if(dates.includes(dateString)){
            latestStreak++;

            currentDate.setDate(currentDate.getDate() - 1);
        }else{
            break;
        }
    }

    return {
        currentstreak: latestStreak,
        longestStreak,
        appliedToday
    }
}