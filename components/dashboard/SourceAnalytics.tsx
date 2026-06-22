import { getSourceAnalytics } from "@/lib/dashboard/getSourceAnalytics";
import { Application } from "@/types/application";

interface Props {
  applications: Application[];
}

export default function SourceAnalytics({ applications }: Props) {
  const analytics = getSourceAnalytics(applications);
  return (
    <div
      className="
        border
        rounded-lg
        p-6
        bg-white
      "
    >
      <h2
        className="
          text-xl
          font-semibold
          mb-6
        "
      >
        Job Sources
      </h2>

      <div
        className="
          space-y-3
        "
      >
        {Object.entries(analytics).map(([source, count]) => (
          <div
            key={source}
            className="
                flex
                justify-between
              "
          >
            <span>{source}</span>

            <span>{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
