import { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from '@/utils/db';
import { NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY || '';

if (!apiKey) {
  throw new Error('GEMINI_API_KEY environment variable is not set');
}

export async function POST(req: Request) {
  const { age, weight, height, fitnessLevel, healthConditions, goals, currentExerciseRoutine } = await req.json();

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

    1. "exercise_plan": {
       "description": "Detail a specific exercise regimen tailored to the user's current fitness level and goals.",
       "content": "Include types of exercises, frequency, duration, and intensity."
    }

    2. "potential_risks": {
       "description": "Identify any potential health risks associated with the user's current condition and exercise routine.",
       "content": "Provide clear warnings and advice to mitigate these risks."
    }

    3. "expert_advice": {
       "description": "Offer expert-level tips and strategies to improve the user's overall fitness and health.",
       "content": "Include progressive steps to advance from their current fitness level to higher levels."
    }

    4. "dietary_suggestions": {
       "description": "Provide dietary recommendations that complement the exercise plan and support the user's fitness goals.",
       "content": "Suggest specific foods, meal plans, and nutritional guidelines."
    }

    Additional Instructions:
    - Ensure all advice is specific, actionable, and easy to understand.
    - Tailor recommendations to accommodate the user's fitness level and health conditions.
    - Content should reflect expert knowledge in health, fitness, and nutrition.
    - Use concise and professional language.
  `;

  const genAI = new GoogleGenerativeAI(apiKey);

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction,
    });

    const generationConfig = {
      temperature: 1.25,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
    };

    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            { text: systemInstruction },
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage("Provide personalized exercise recommendations.");
    const recommendations = JSON.parse(result.response.text());

    // Storing in Prisma

    return NextResponse.json({ data: recommendations }, { status: 200 });
  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json({ error: 'Error generating content' }, { status: 500 });
  }
}
