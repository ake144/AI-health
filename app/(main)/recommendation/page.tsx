

import Recommendation from '@/components/reco'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div>
      <Link href='/'>
        <div className='mx-2 p-7'>
          Back
        </div>
        </Link>

        <Recommendation />

    </div>
  )
}

export default page