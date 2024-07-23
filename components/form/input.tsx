'use client';

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { createRecommendation } from "@/utils/actions/recommend";
import { getUserById } from "@/utils/actions/getuser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function Recommendations() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn && isLoaded) {
      getUserById(user.id)
        .then((data) => setUserData(data))
        .catch((error) => console.error(error));
    }
  }, [isSignedIn, isLoaded, user]);

  console.log("userData", userData);




  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        throw new Error("Failed to generate content");
      }

      const result = await res.json();
      console.log("AI response:", result);

      const recommendations = JSON.stringify(result.data);

      await createRecommendation({
        recommendations,
        userId: userData.id,
      });

      router.push('/recommendation');
    } catch (error) {
      console.error('Error generating content:', error);
    }
  };

  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
        <p>Please enter your information</p>
        <Link href='/user'>
          <Button className='mx-2 p-7'>
            UserInfo
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center  p-6 ">
      <Button onClick={handleSubmit}>Generate Recommendations</Button>
    </div>
  );
}
