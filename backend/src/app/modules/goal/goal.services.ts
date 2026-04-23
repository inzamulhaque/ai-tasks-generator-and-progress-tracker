import openAI from "../../../config/openai.config";
import goalSchema from "./goal.schema.json";

export const createGoalService = async (
  email: string,
  goalName: string,
  goalDuration: number,
  timePerDay: number,
  goalDescription: string,
  language: string,
) => {
  const propmt = `
    User wants to ${goalName} within ${goalDuration} days. 
    create a structured learning/execution plan.

    time per day : ${timePerDay} hours
    short description: ${goalDescription}
    language: ${language}
    `;

  const aiResponse = await openAI.chat.completions.create({
    model: "openai/gpt-oss-120b:free",
    messages: [
      {
        role: "system",
        content:
          "You are an expert in personal productivity coach and learning specialist.",
      },

      {
        role: "user",
        content: propmt,
      },
    ],

    temperature: 0.7,

    response_format: {
      type: "json_schema",
      json_schema: {
        name: "goal_schema",
        schema: goalSchema,
      },
    },
  });

  const content = aiResponse.choices[0]!.message.content;
  const jsonMatch = content!.match(/\{[\s\S]*\}/);
  return JSON.parse(jsonMatch as unknown as string);
};
