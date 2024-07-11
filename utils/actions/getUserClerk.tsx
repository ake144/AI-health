'use server'

import prisma from "../db";



export async function getUserClerk(userId: string) {
    const userClerk = await prisma.users.findUnique({
        where: {
        clerkUserId: userId
        },
    });
    
    return userClerk;
    }

    
