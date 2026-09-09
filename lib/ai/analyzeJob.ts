import { z } from "zod";
import { gemini } from "@/lib/ai/gemini";
import { jobAnalysisSchema } from "@/lib/ai/schemas/jobAnalysis";

const jobAnalysisJsonSchema = z.toJSONSchema(jobAnalysisSchema);

export async function analyzeJobDescription(jobDescription: string) {
  const prompt = `
You are an expert technical recruiter and career analyst.

Analyze the following job description and extract the important information.

Your analysis must be factual and based only on the provided job description.
Do not invent information that is not present.

Identify:

- Job title
- Company name, if available
- Seniority level
- Required experience
- Technical skills
- Soft skills
- Must-have skills
- Nice-to-have skills
- Education requirements
- Responsibilities
- Qualifications
- Important ATS keywords
- A concise summary of the role

Job Description:

${jobDescription}
`;

  const interaction = await gemini.interactions.create({
    model: "gemini-3.8-flash",
    input: prompt,
    response_format: {
      type: "text",
      mime_type: "application/json",
      schema: jobAnalysisJsonSchema,
    },
  });

  const rawOutput = interaction.output_text;

  if (!rawOutput) {
    throw new Error("Gemini returned an empty response");
  }

  const parsedOutput = JSON.parse(rawOutput);

  return jobAnalysisSchema.parse(parsedOutput);
}