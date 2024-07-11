'use server';

import { NextResponse } from "next/server";
import prisma from "../db";

interface UpdateUserData {
  id: any;
  username: string;
  age: number;
  weight: number;
  height: number;
  fitnessLevel?: string;
  healthConditions?: string;
  currentExerciseRoutine?: string;
  goals: string;
}

export async function updateUser(data: UpdateUserData) {
  const { id, username, age, weight, height, fitnessLevel, healthConditions, currentExerciseRoutine, goals } = data;
  const user = await prisma.users.update({
    where: {
      clerkUserId: id,
    },
    data: {
      username,
      age,
      weight,
      height,
      fitnessLevel,
      healthConditions,
      goals,
      currentExerciseRoutine
    },
  });

  return { message: 'User updated', data: user };
}
