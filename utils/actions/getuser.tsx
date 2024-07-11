'use server';

import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export const getUserById = async (id: string) => {
  const user = await prisma.users.findUnique({
    where: {
      clerkUserId: id,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};


// export const getRecommendationsByUserId = async (id: number) => {
//   const recommendations = await prisma.recommendation.findMany({
//     where: {
//       userId: id,
//     },
//   });

//   if (!recommendations || recommendations.length === 0) {
//     return NextResponse.json({ error: 'No recommendation found' }, { status: 404 });
//   }

//   return  recommendations
// };