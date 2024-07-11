import { MagicCard, MagicContainer } from "@/components/magicui/magic-card";

export function MagicCardDemo() {
  return (
    <MagicContainer
      className={
        "flex h-[400px] lg:w-100% mt-5 lg:mb-2 p-4 mb-[100px] w-[1000px]   flex-col gap-4 lg:h-[250px] lg:flex-row"
      }
    >
      <MagicCard className="flex w-1/3 cursor-pointer flex-col items-center justify-center overflow-hidden p-20 shadow-2xl">
        <p className="z-10 whitespace-nowrap text-xl font-medium text-gray-800 dark:text-gray-200">
          Daily record and Current status
        </p>
        <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      </MagicCard>
      <MagicCard className="flex w-1/3 cursor-pointer flex-col items-center justify-center overflow-hidden p-20 shadow-2xl">
        <p className="z-10 whitespace-nowrap text-xl font-medium text-gray-800 dark:text-gray-200">
          AI expert Recommendation
        </p>
        <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      </MagicCard>
      <MagicCard className="flex w-1/3 cursor-pointer flex-col items-center justify-center overflow-hidden p-20 shadow-2xl">
        <p className="z-10 whitespace-nowrap text-xl font-medium text-gray-800 dark:text-gray-200">
            Health and Fitness Goals
        </p>
        <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      </MagicCard>
    </MagicContainer>
  );
}
