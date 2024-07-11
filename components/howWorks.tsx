import React from 'react'
import { MagicCard, MagicContainer } from "@/components/magicui/magic-card";


function HowWorks() {
  return (
   <>
      <h1  className='p-4 mb-11 lg:mb-4  text-4xl items-center justify-center '>How it works</h1>
       <MagicContainer
       className={ "flex flex-col justify-center items-center mx-11 lg:mx-[100px]  h-[400px] w-[300px] lg:w-[700px]"}>
              <MagicCard  className='flex justify-center items-center '>
                  <p  className='text-xl text-[#5046e6]  font-semibold'>
                    Insert yor information on the give fields
                  </p>

              </MagicCard>        
            <MagicCard  className='flex justify-center items-center'>
                   <p   className='text-[#5046e6]  text-xl font-semibold'>
                    AI respond with critical exercise and health recommendation
                   </p>
            </MagicCard>
            <MagicCard  className='flex justify-center items-center'>
                         <p className='text-[#5046e6]  text-xl font-semibold'>
                            Plan for fitness
                        </p>
            </MagicCard>
            <MagicCard  className='flex justify-center items-center'>
                         <p className='text-[#5046e6]  text-xl font-semibold'>
                            Receive email within your scheduled period
                        </p>
            </MagicCard>
            <MagicCard  className='flex justify-center items-center'>
                         <p className='text-[#5046e6]  text-xl font-semibold'>
                            store and access your  progress 
                        </p>
            </MagicCard>

            

      </MagicContainer>
   
   </>
  )
}

export default HowWorks