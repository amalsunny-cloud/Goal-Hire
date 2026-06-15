import { Interview } from "@/types/interview";


export function getInterviewAnalytics(
    interviews: Interview[]
){
    const total = interviews.length;

  const passed = interviews.filter(interview =>interview.outcome ==="Passed").length;

  const failed = interviews.filter(interview => interview.outcome ==="Failed").length;

  const pending = interviews.filter(interview =>interview.outcome ==="Pending").length;

  const successRate = total > 0 ? (
    passed / total
  ) *100 : 0;

  return {
    total,passed,failed,pending,successRate
  }
}