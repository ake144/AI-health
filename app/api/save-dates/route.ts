import prisma from "@/utils/db";
import { sendActivityNotification } from "@/utils/email";
import { useUser } from "@clerk/nextjs";
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


  
      const {user} = useUser()
  const userEmail = user?.primaryEmailAddress?.emailAddress
      console.log("the user", user?.primaryEmailAddress?.emailAddress)
    
    
      if (userEmail) {
        // Send activity notification email
        await sendActivityNotification(userEmail, data.activityDates.map((date: Date) => date.toLocaleDateString()));
      }

      return NextResponse.json({data:savedDates }, {status:200})
    } catch (error) {
      console.error(error);
      return NextResponse.json({error:'error while creating' }, {status:500})
    }
}
