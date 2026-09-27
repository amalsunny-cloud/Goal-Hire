import { ThinkingLevel } from "@google/genai";
import { z } from "zod";

import { getGeminiClient } from "@/lib/ai/gemini";
import { resumeMatchSchema } from "@/lib/ai/schemas/resumeMatch";

interface MatchResumeInput {
  resumeAnalysis: unknown;
  jobAnalysis: unknown;
}

function isRetryableError(error: unknown): boolean {
  if (
    typeof error === "object" &&
    error !== null &&
    "status" in error
  ) {
    const status = (error as { status?: number }).status;

    return (
      status === 429 ||
      status === 500 ||
      status === 502 ||
      status === 503 ||
      status === 504
    );
  }

  if (error instanceof Error && error.message?.toLowerCase().includes("demand")) {
    return true;
  }
  
  return false;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function matchResume({
  resumeAnalysis,
  jobAnalysis,
}: MatchResumeInput) {
  const ai = getGeminiClient();

  const prompt = `
You are an AI career assistant specializing in software development
and technology recruitment.

Compare the following structured resume analysis with the structured
job description analysis.

RESUME ANALYSIS:
${JSON.stringify(resumeAnalysis, null, 2)}

JOB ANALYSIS:
${JSON.stringify(jobAnalysis, null, 2)}

Your task is to determine how relevant the resume is to this
specific job.

Analyze:

1. Matching Skills
Identify skills that are demonstrated in the resume and are also
relevant to the job.

2. Missing Skills
Identify important skills mentioned in the job description that
are not demonstrated in the resume.

Important:
A skill being absent from the resume does NOT prove that the
candidate does not possess that skill. Describe it only as a
skill that is not demonstrated in the resume.

3. Matching Experience
Identify experience, responsibilities, or projects from the
resume that are relevant to the job.

4. Strengths
Identify concrete aspects of the resume that make it relevant
to this particular job.

5. Improvement Suggestions
Provide specific and actionable suggestions for making the resume
more relevant to this job.

6. Summary
Provide a concise overall comparison between the resume and the
job description.

Important rules:

- Use only information contained in the provided analyses.
- Do not invent skills, experience, qualifications, or projects.
- Do not assume that an undocumented skill is actually missing
  from the candidate's knowledge.
- Distinguish between "not demonstrated in the resume" and
  "candidate does not have the skill."
- Focus on evidence from the resume and job description.
- Keep suggestions practical and specific.
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

          responseJsonSchema: z.toJSONSchema(resumeMatchSchema),
        },
      });

      const text = response.text;

      if (!text) {
        throw new Error("Gemini returned an empty response");
      }

      const parsed = JSON.parse(text);

      return resumeMatchSchema.parse(parsed);
    } catch (error) {
      const shouldRetry = isRetryableError(error);

      if (!shouldRetry || attempt === maxRetries) {
        throw error;
      }

      if(modelIndex < modelsPipeline.length - 1) {
        modelIndex++;
        console.log(`Switching to fallback model: ${modelsPipeline[modelIndex]}`);
      }
      const delay = 1000 * 2 ** attempt;

      console.log(`Retry attempt ${attempt + 1} scheduled in ${delay}ms...`);
      await sleep(delay);

    }
  }

  throw new Error("Resume matching failed");
}