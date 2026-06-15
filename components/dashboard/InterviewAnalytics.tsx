import { getInterviewAnalytics } from "@/lib/dashboard/getInterviewAnalytics";
import { Interview } from "@/types/interview"

interface Props{
    interviews: Interview[];
}
export default function InterviewAnalytics({interviews}:Props) {

    const analytics = getInterviewAnalytics(interviews);

  return (
    <div className="border rounded-lg p-6 bg-white">
      <h2 className="text-xl font-semibold mb-6">
        Interview Analytics
      </h2>

      <div className="grid md:grid-cols-5 gap-4">
        <div>
            <p className="text-gray-500">Total</p>
            <h3 className="text-2xl font-bold">{analytics.total}</h3>
        </div>

        <div>
            <p className="text-gray-500">Passed</p>
            <h3 className="text-2xl font-bold">{analytics.passed}</h3>
        </div>

        <div>
            <p className="text-gray-500">Failed</p>
            <h3 className="text-2xl fonr-bold">{analytics.failed}</h3>
        </div>

        <div>
          <p className="text-gray-500">
            Pending
          </p>

          <h3 className="text-2xl font-bold">
            {analytics.pending}
          </h3>
        </div>

        <div>
          <p className="text-gray-500">
            Success Rate
          </p>

          <h3 className="text-2xl font-bold">
            {analytics.successRate.toFixed(
              1
            )}%
          </h3>
      </div>
    </div>
    </div>
  )
}
