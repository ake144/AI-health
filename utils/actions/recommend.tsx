'use server'

import prisma from "../db";



export async function createRecommendation(data:any) {
  const { userId, recommendations } = data; // Expecting recommendations as a JSON string

     
  const existingRecommendation = await prisma.recommendation.findFirst({
    where: {
      userId,
    },
  });

  if (existingRecommendation) {
    return { message: 'Recommendation already exists for this user', data: existingRecommendation };
  }

  const recommendation = await prisma.recommendation.create({
    data: {
      userId,
      recommendations,
    },
  });

  return { message: 'Recommendation created', data: recommendation };
}
