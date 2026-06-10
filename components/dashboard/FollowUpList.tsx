
interface Application {
    _id: string;
    company: string;
    role: string;
    status: string;
    followUpDate?: string;
}

interface FollowUpListProps{
    applications: Application[];
}

export default function FollowUpList({
    applications,
}: FollowUpListProps) {

    const today = new Date();
    const next7Days = new Date();

    next7Days.setDate(today.getDate() + 7);

    const upcomingFollowUps = applications.filter((app)=>{
        if(!app.followUpDate) return false;


        const followUp = new Date(app.followUpDate)

        return (
            followUp>= today && followUp<= next7Days
        );
    });

    if(upcomingFollowUps.length === 0){
        return(
            <div>
                <h2 className="text-xl font-semibold mb-2">Follow Ups</h2>

                <p className="text-red-500">No follow-ups due in the next 7 days.</p>
            </div>
        )
    }

  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Follow Ups</h2>

      <div className="space-y-3">
            {upcomingFollowUps.map((app)=>(
                <div key={app._id} className="border rouded p-3">
                    <h3 className="font-semibold">{app.company}</h3>
                    <p>{app.role}</p>
                    <p>Follow Up:
                        {" "}
                        {new Date(app.followUpDate!).toLocaleDateString("en-GB")}
                    </p>
                </div>
            ))}
      </div>
    </div>
  )
}
