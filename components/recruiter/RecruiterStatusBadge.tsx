
interface Props{
    nextFollowUp?: string;
}
export default function RecruiterStatusBadge({nextFollowUp}:Props) {
    if(!nextFollowUp){
        return(
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">No Follow-Ups Scheduled</span>
        )
    }

    const today = new Date();
    today.setHours(0,0,0,0);

    const followUpDate = new Date(nextFollowUp);
    followUpDate.setHours(0,0,0,0);

    const differenceInMs = followUpDate.getTime() - today.getTime();
    const differenceInDays = Math.floor(differenceInMs/(1000*60*60*24))

    if(differenceInDays < 0){
        return (
      <span
        className="
          bg-red-100
          text-red-700
          px-3
          py-1
          rounded-full
          text-sm
          font-medium
        "
      >
        🔴 Overdue by{" "}
        {Math.abs(
          differenceInDays
        )} day
        {Math.abs(
          differenceInDays
        ) > 1
          ? "s"
          : ""}
      </span>
    );
    }

    if (differenceInDays === 0) {

    return (
      <span
        className="
          bg-yellow-100
          text-yellow-800
          px-3
          py-1
          rounded-full
          text-sm
          font-medium
        "
      >
        🟡 Follow-up Today
      </span>
    );

  }

  return (
    <span
      className="
        bg-green-100
        text-green-700
        px-3
        py-1
        rounded-full
        text-sm
        font-medium
      "
    >
      🟢 Upcoming in{" "}
      {differenceInDays} day
      {differenceInDays > 1
        ? "s"
        : ""}
    </span>
  );
}
