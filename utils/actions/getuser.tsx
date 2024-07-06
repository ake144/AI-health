'use server'

import prisma from "@/utils/db"


export const getUserById = async (id: string) => {

    const res =  await prisma.users.findUnique({
        where: {
            clerkUserId: id
        }

    })

}
