import { Recommendations } from '@/components/form/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function page() {
  return (<>
   <Link href='/'>
        <div className='mx-2 p-7'>
          Back
        </div>
        </Link> 
 
    <div className='flex justify-center mt-7  mx-5'>
      
          <Recommendations  />
   <div>
   </div>
    </div>

    </>

  )
}

export default page