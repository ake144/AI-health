import { Button } from "@/components/ui/button";
import BoxReveal from "@/components/magicui/box-reveal";
import Link from "next/link";
import Image from "next/image";

export async function BoxRevealDemo() {
  return (
    <div className="h-full w-full max-w-[32rem] items-center justify-center overflow-hidden pt-8">
      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <p className="text-[2.5rem] font-semibold">
        Your well-being is our top priority<span className="text-[#5046e6]">.</span>
        </p>
      </BoxReveal>
     <BoxReveal boxColor={"#5046e6"} duration={0.5}>
             <Image  src="/free.jpg" width={350} height={200} alt="health"/>
        </BoxReveal>
      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <h2 className="mt-[.5rem] text-[1rem]">
          we are here for {" "}
          <span className="text-[#5046e6]">your Wellbeing and Fitness</span>
        </h2>
      </BoxReveal>


      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <div className="mt-[1.5rem]">
          <p>
            -&gt; 24hr chatbot and AI expert recommendation. <br />
            <span className="font-semibold text-[#5046e6]"> physical Exercise</span>,
            <span className="font-semibold text-[#5046e6]"> current health status</span>,
            <span className="font-semibold text-[#5046e6]">  Action should be taken</span>,
            and
            <span className="font-semibold text-[#5046e6]"> planning and Track your progress</span>
            . <br />
          </p>
        </div>
      </BoxReveal>

      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <Link href='/track'>
        <Button className="mt-[1.6rem] bg-[#5046e6]">Explore</Button>
        </Link>
      </BoxReveal>
    </div>
  );
}
