import prisma from '@/utils/db';

export async function getActivityDatesByUserId(userId: number) {
  const activityDates = await prisma.calendar.findMany({
    where: {
      userId,
    },
    orderBy: {
     Dates: 'asc',
    },
  });

  return activityDates;
}
