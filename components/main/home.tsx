import React from 'react'
import TextReveal from '../magicui/text-reveal'
import Image from 'next/image'
import { AnimatedListDemo } from '../dock'
import { MagicCardDemo } from '../card'
import { BoxRevealDemo } from '../box'
import PricingPage from '../pricing'

function MainPage() {
  return (
    <div className='mt-2 mx-7'>
    <div className="z-10 flex min-h-[16rem] items-center justify-center rounded-lg border bg-white dark:bg-black">
      <TextReveal text="For your Health and Fitness Goals in No time" />
      <div >
            <Image  src="/health.jpg" width={500} height={500} alt="health" /> 
            <AnimatedListDemo  />  
        </div> 
      
    </div>

    <div>
     <MagicCardDemo  />
      </div>

      <div  className='flex justify-center items-center'>
      <BoxRevealDemo  />
      </div>
      <div>
      <PricingPage />
      </div>
    </div>
  )
}

export default MainPage