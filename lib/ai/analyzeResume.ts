import { ThinkingLevel } from "@google/genai";
import { z } from "zod";

import { getGeminiClient } from "@/lib/ai/gemini";
import { resumeAnalysisSchema } from "@/lib/ai/schemas/resumeAnalysis";

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

  return false;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function analyzeResume(resumeText: string) {
  const ai = getGeminiClient();

  const prompt = `
You are a professional resume analyst specializing in software
development and technology careers.

Analyze the following resume carefully.

Resume:
${resumeText}

Your task is to identify information that is explicitly present
in the resume and provide practical analysis based only on that
information.

Analyze the following areas:

1. Professional Summary
Create a concise summary of the candidate's professional profile.

2. Technical Skills
Identify programming languages, frameworks, libraries, databases,
cloud technologies, tools, and other technical skills explicitly
mentioned.

3. Soft Skills
Identify soft skills explicitly demonstrated or mentioned.

4. Experience
Summarize the candidate's work experience, internships, and
relevant professional responsibilities.

5. Education
Identify degrees, institutions, and other educational information.

6. Projects
Identify relevant projects and summarize what they demonstrate.

7. Certifications
Identify certifications or completed courses explicitly mentioned.

8. Keywords
Extract important technical and career-related keywords from the
resume.

9. Strengths
Identify concrete strengths demonstrated by the resume.

10. Weaknesses
Identify areas where the resume appears incomplete, unclear, weak,
or lacking useful evidence.

11. Career Positioning
Explain what type of software development or technology roles the
resume currently communicates.

12. Technical Skill Gaps
Identify potentially useful technical areas that appear to be
missing or insufficiently demonstrated for a software developer.
Do not claim that a skill is required unless the resume itself
provides evidence for that conclusion.

13. Project Improvement Suggestions
Provide specific suggestions for making the project descriptions
more useful to recruiters.

14. Experience Improvement Suggestions
Provide specific suggestions for making work experience or
internship descriptions stronger and more informative.

15. General Improvement Suggestions
Provide practical improvements to the overall resume.

16. Overall Summary
Give a concise overall assessment of what the resume communicates.

Important rules:

- Use only information supported by the resume.
- Do not invent employers, projects, technologies, education,
  achievements, metrics, certifications, or responsibilities.
- Do not assume the candidate has a skill that is not mentioned.
- When identifying a weakness or gap, describe it as something
  missing or insufficiently demonstrated in the resume.
- Suggestions should be specific and actionable rather than generic.
- Focus on software development and technology careers.
`;

  const maxRetries = 3;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",

        contents: prompt,

        config: {
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.LOW,
          },

          responseMimeType: "application/json",

          responseJsonSchema: z.toJSONSchema(
            resumeAnalysisSchema,
          ),
        },
      });

      const text = response.text;

      if (!text) {
        throw new Error("Gemini returned an empty response");
      }

      const parsed = JSON.parse(text);

      return resumeAnalysisSchema.parse(parsed);
    } catch (error) {
      const shouldRetry = isRetryableError(error);

      if (!shouldRetry || attempt === maxRetries) {
        throw error;
      }

      const delay = 1000 * 2 ** attempt;

      console.log(
        `Gemini request failed. Retrying in ${delay}ms...`,
      );

      await sleep(delay);
    }
  }

  throw new Error("Resume analysis failed");
}