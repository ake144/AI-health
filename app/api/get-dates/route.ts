import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export  async function GET(req:Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('userId') || '';
  const idInt = parseInt(id);


    try {
      const scheduledDates = await prisma.calendar.findMany({
        where: {
          userId: idInt,
        }

      });



      return NextResponse.json({ dates: scheduledDates[0]?.Dates || [] }, {status:200})
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Failed to fetch dates" }, {status:500})
    }
}
