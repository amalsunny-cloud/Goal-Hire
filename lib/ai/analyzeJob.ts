import { z } from "zod";
import { getGeminiClient } from "@/lib/ai/gemini";
import { jobAnalysisSchema } from "@/lib/ai/schemas/jobAnalysis";

const jobAnalysisJsonSchema = z.toJSONSchema(jobAnalysisSchema);

function isRetryableError(error: unknown): boolean {
  if (typeof error === "object" && error !== null && "status" in error) {
    const status = (error as { status?: number }).status;

    return (
      status === 429 ||
      status === 500 ||
      status === 502 ||
      status === 503 ||
      status === 504
    );
  }
  if (
    error instanceof Error &&
    error.message?.toLowerCase().includes("demand")
  ) {
    return true;
  }

  return false;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function analyzeJobDescription(jobDescription: string) {
  const gemini = getGeminiClient();
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

  const maxRetries = 3;
  const modelsPipeline = ["gemini-3.5-flash-lite", "gemini-3.1-flash-lite"];
  let modelIndex = 0;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const currentModel = modelsPipeline[modelIndex];
    try {
      // High-level interactions API call
      const interaction = await gemini.interactions.create({
        model: currentModel,
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

    } catch (error) {
      const shouldRetry = isRetryableError(error);
      if (!shouldRetry || attempt === maxRetries) throw error;

      if (modelIndex < modelsPipeline.length - 1) {
        modelIndex++;
        console.log(
          `Interactions model [${currentModel}] overloaded. Falling back to [${modelsPipeline[modelIndex]}].`,
        );
      }

      const delay = 1000 * 2 ** attempt;
      console.log(`Gemini request failed. Retrying in ${delay}ms...`);

      await sleep(delay);
    }
  }

  throw new Error("Resume analysis failed");
}
