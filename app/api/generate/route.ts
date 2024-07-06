import { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GEMINI_API_KEY environment variable is not set');
}

export  async function POST(req: Request) {


  const { age, weight, height, fitnessLevel, healthConditions, goals, currentExerciseRoutine } = await req.json();

  console.log(age, weight, height, fitnessLevel, healthConditions, goals, currentExerciseRoutine);

  // Construct the system instruction for the AI model
  const systemInstruction = `
    User Information:
    - Age: ${age}
    - Weight: ${weight} kg
    - Height: ${height} cm
    - Fitness Level: ${fitnessLevel}
    - Health Conditions: ${healthConditions}
    - Goals: ${goals}
    - Current Exercise Routine: ${currentExerciseRoutine}

    Task:
    Generate a comprehensive and personalized exercise and health improvement plan for the user based on the provided information. The output should include:

    1. **Personalized Exercise Plan**: 
       - Detail a specific exercise regimen tailored to the user's current fitness level and goals.
       - Include types of exercises, frequency, duration, and intensity.

    2. **Potential Risks and Warnings**:
       - Identify any potential health risks associated with the user's current condition and exercise routine.
       - Provide clear warnings and advice to mitigate these risks.

    3. **Expert Improvement Advice**:
       - Offer expert-level tips and strategies to improve the user's overall fitness and health.
       - Include progressive steps to advance from their current fitness level to higher levels.

    4. **Dietary Suggestions**:
       - Provide dietary recommendations that complement the exercise plan and support the user's fitness goals.
       - Suggest specific foods, meal plans, and nutritional guidelines.

    Additional Instructions:
    - Ensure all advice is specific, actionable, and easy to understand.
    - Tailor recommendations to accommodate the user's beginner fitness level and weight loss goal.
    - Consider the user's health conditions and adjust recommendations accordingly.
    - The content should reflect an expert level of knowledge in health, fitness, and nutrition.
  `;

  const genAI = new GoogleGenerativeAI(apiKey || '');

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction,
  });

  const generationConfig = {
    temperature: 1.25,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            { text: `User Information:\n- Age: ${age}\n- Weight: ${weight} kg\n- Height: ${height} cm\n- Fitness Level: ${fitnessLevel}\n- Health Conditions: ${healthConditions}\n- Goals: ${goals}\n- Current Exercise Routine: ${currentExerciseRoutine}` },
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage("Provide personalized exercise recommendations.");
    const recommendations = result.response.text();
    console.log(recommendations);

    return NextResponse.json({ recommendations }, { status: 200 });
  } catch (error) {
    console.error('Error generating content:', error);
   
    return NextResponse.json({ error: 'Error generating content' }, { status: 500 });
  }
}
