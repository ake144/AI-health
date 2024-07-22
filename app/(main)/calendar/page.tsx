import { DatePickerForm } from '@/components/date/dates'
import { ScheduledActivitiesTable } from '@/components/date/table'
import Link from 'next/link'

import React from 'react'

function Calendar() {
  return (
   <>
     <Link href='/'>
        <div className='mx-2 p-7'>
          Back
        </div>
        </Link> 
   <h2 className='mt-[60px] flex  justify-center items-center text-2xl'>Plan your date to  fitness</h2>
 
  
  <ScheduledActivitiesTable  />

  <DatePickerForm  />


   </>
  )
}

export default Calendar