// utils/scheduler.ts

import cron from 'node-cron';
import prisma from "@/utils/db";
import { sendActivityNotification } from "@/utils/email";
import { useUser } from '@clerk/nextjs';
import { getAuth, clerkClient } from "@clerk/nextjs/server";

// Schedule a task to run at a specific time (e.g., every day at 8 AM)
cron.schedule('0 8 * * *', async () => {
  const {user}  = useUser()

  try {
    // Fetch users and their scheduled activities for the day
    const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format
    const usersWithActivities = await prisma.calendar.findMany({
      where: {
        Dates: {
          hasSome: [today],
        },
      },
      include: {
        user: true,
      },
    });

    // Send notification emails
    for (const userActivity of usersWithActivities) {
      const userId = userActivity.user.clerkUserId;

      const user = userId ? await clerkClient.users.getUser(userId) : null;


      const userEmail = user?.emailAddresses.find((email) => email.emailAddress === 'primary')?.emailAddress;
      console.log("the email ", userEmail)
      

      const activityDates = userActivity.Dates.map(date => new Date(date).toLocaleDateString());
      if (userEmail) {
        await sendActivityNotification(userEmail, activityDates);
      }
    }
  } catch (error) {
    console.error('Error scheduling task:', error);
  }
});
