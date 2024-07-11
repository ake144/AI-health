import prisma from "@/utils/db";
import { NextResponse } from "next/server";


export async function GET(req:Request){
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id') || '';
    const idInt = parseInt(id);

    const recommendations = await prisma.recommendation.findMany({
        where: {
          userId: idInt,
        },
      });
    
    if (!recommendations) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({recommendations},{status:200})
    
}