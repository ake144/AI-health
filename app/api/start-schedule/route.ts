import scheduleEmails from '@/utils/scheduler'
import { NextRequest, NextResponse } from 'next/server';


export  async function GET(req: Request) {
  try{
    scheduleEmails();
   return NextResponse.json({message: 'Scheduler started' });
  } catch(error:any) {
    return NextResponse.json({ message: 'Method not allowed' });
  }
}
