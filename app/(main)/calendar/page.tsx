import { DatePickerForm } from '@/components/date/dates'
import { ScheduledActivitiesTable } from '@/components/date/table'

import React from 'react'

function Calendar() {
  return (
   <>
   <h2>Plan your date to  fitness</h2>
   <DatePickerForm  />
  
  <ScheduledActivitiesTable  />


   </>
  )
}

export default Calendar