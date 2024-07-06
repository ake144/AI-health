"use client"

import * as React from "react"
import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "../ui/button"
import ShinyButton from "../magicui/button"


export function NavigationMenuDemo() {
  return (<>
  <div className="flex flex-row mt-10">
  <div className="lg:ml-[100px] mx-[60px] lg:mr-[270px]  ">
          <p  className="text-4xl font-bold">Akanji</p> 

  </div>
    <NavigationMenu>
      <NavigationMenuList >
        <NavigationMenuItem>
              <NavigationMenuLink  href='/auth'>Getting started</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
            <NavigationMenuLink href="/track" className={navigationMenuTriggerStyle()}>
              track
            </NavigationMenuLink>
         
        </NavigationMenuItem>
        <NavigationMenuItem>
         
             <NavigationMenuLink   href='/blog'>Blogs</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
             <NavigationMenuLink  href='/price'>Price</NavigationMenuLink>

        </NavigationMenuItem> 
      </NavigationMenuList>
    </NavigationMenu>
   
    <div className="ml-[100px]  flex flex-row gap-3">
      <Link href='/auth/login'>
        <ShinyButton text="Log In" />
       </Link>
       <Link href='/auth/signup'>
          <Button className="rounded-full  flex justify-end items-end">start for free</Button>
        </Link>
    </div>
    
    </div>
    </>
  )
}


