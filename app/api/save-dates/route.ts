import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export  async function POST(req:Request) {
    const { data, userId } = await req.json();

console.log(data.activityDates, userId)

    try {
      const savedDates = await prisma.calendar.create({
        data: {
          userId,
          Dates: data.activityDates
        },
      });

      return NextResponse.json({data:savedDates }, {status:200})
    } catch (error) {
      console.error(error);
      return NextResponse.json({error:'error while creating' }, {status:500})
    }
}
