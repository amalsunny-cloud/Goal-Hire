import { ThinkingLevel } from "@google/genai";
import { z } from "zod";

import { getGeminiClient } from "@/lib/ai/gemini";
import { resumeMatchSchema } from "@/lib/ai/schemas/resumeMatch";
import { ResumeImprovement, resumeImprovementSchema } from "./schemas/resumeImprovement";
import { resumeAnalysisSchema } from "./schemas/resumeAnalysis";

interface MatchResumeInput {
  resumeAnalysis: unknown;
  jobAnalysis: unknown;
}

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

export async function improveResume(
  resumeAnalysis: unknown,
): Promise<ResumeImprovement> {
  const validatedResume = resumeAnalysisSchema.parse(resumeAnalysis);
  const ai = getGeminiClient();

 const prompt = `
You are an expert resume editor and career-writing assistant.

Your task is to improve the candidate's resume content using the
provided structured resume analysis.

RESUME ANALYSIS:
${JSON.stringify(validatedResume, null, 2)}

INSTRUCTIONS:

1. PROFESSIONAL SUMMARY
- Rewrite the professional summary to be clear, concise, and professional.
- Highlight relevant skills and career positioning.
- Return the original text, improved text, and a short explanation.

2. PROJECT IMPROVEMENTS
- Improve the available project descriptions.
- Highlight technologies, functionality, responsibilities, and impact
  when supported by the supplied information.
- Return one improvement object per project description you can identify.
- Do not invent project features, technologies, metrics, or achievements.

3. EXPERIENCE IMPROVEMENTS
- Improve the available experience descriptions.
- Use clear, professional, action-oriented wording.
- Return one improvement object per experience description you can identify.
- Do not invent employers, job responsibilities, results, or metrics.

4. KEYWORD SUGGESTIONS
- Suggest relevant resume keywords based on the candidate's existing
  skills, projects, experience, and career positioning.
- Do not present an unverified skill as something the candidate already has.

5. GENERAL SUGGESTIONS
- Provide practical recommendations for improving the resume.
- Focus on clarity, relevance, organization, and truthful presentation.

IMPORTANT RULES:
- Preserve the meaning of the original information.
- Never fabricate experience, qualifications, skills, or achievements.
- Clearly distinguish suggestions from confirmed candidate experience.
- If source information is limited, provide conservative improvements.
- Return only data matching the required JSON schema.
`;
  const maxRetries = 3;

  const modelsPipeline = ["gemini-3.5-flash-lite", "gemini-3.1-flash-lite"];
  let modelIndex = 0;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: modelsPipeline[modelIndex],

        contents: prompt,

        config: {
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.LOW,
          },

          responseMimeType: "application/json",

          responseJsonSchema: z.toJSONSchema(resumeImprovementSchema),
        },
      });

      const text = response.text;

      if (!text) {
        throw new Error("Gemini returned an empty response");
      }

      const parsed:unknown = JSON.parse(text);

      return resumeImprovementSchema.parse(parsed);
    } catch (error) {
      const shouldRetry = isRetryableError(error);

      if (!shouldRetry || attempt === maxRetries) {
        throw error;
      }

      if (modelIndex < modelsPipeline.length - 1) {
        modelIndex++;
        console.log(
          `Switching to fallback model: ${modelsPipeline[modelIndex]}`,
        );
      }
      const delay = 1000 * 2 ** attempt;

      console.log(`Retry attempt ${attempt + 1} scheduled in ${delay}ms...`);
      await sleep(delay);
    }
  }

  throw new Error("Unable to improve the resume after multiple attempts.");
}
