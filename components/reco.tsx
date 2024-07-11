'use client';

import React, { useState, useEffect } from 'react';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useUser } from '@clerk/nextjs';
import { getUserById } from '@/utils/actions/getuser';
import { Button } from './ui/button';
import Link from 'next/link';


function Recommendation() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [data, setData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isSignedIn && isLoaded && user?.id) {
        try {
          const userData = await getUserById(user.id);
          setUserData(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [isSignedIn, isLoaded, user]);


  useEffect(() => {
    const fetchRecommendations = async () => {
      if (isSignedIn && isLoaded && userData?.id) {
        try {
          const response = await fetch(`/api/reco?id=${userData.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch recommendations');
          }

          const responseData = await response.json();
          const parsedRecommendations = responseData.recommendations.map((rec: any) => {
            return {
              ...rec,
              recommendations: JSON.parse(rec.recommendations)
            };
          });

          console.log('Recommendations:', parsedRecommendations);
          setData(parsedRecommendations);
        } catch (error) {
          console.error('Error fetching recommendations:', error);
        }
      }
    };

    fetchRecommendations();
  }, [userData]);

  console.log("the data",data);

  const recommendation = data ? data[0]?.recommendations : null;

if(recommendation === null){
  return  <Link  href='/personal'>
  <Button>
    Generate Recommendation
  </Button>
  </Link> 
}

 console.log(recommendation);

  return (
    <div className="mt-11 mx-10 max-w-screen-lg overflow-x-auto">
    <h1 className="text-2xl font-bold">Personalized Recommendations</h1>
    {recommendation ? (
      <>
        <div className="w-full mb-10 h-auto border rounded-lg p-4">
          <h2 className="text-xl font-semibold">Exercise Plan</h2>
          <p className="italic font-sans">{recommendation.exercise_plan?.description}</p>
          <pre className="text-md font-serif w-full overflow-auto">
            {recommendation.exercise_plan?.content}
          </pre>
        </div>
        <div className="w-full mb-10 h-auto border rounded-lg p-4">
          <h2 className="text-xl font-semibold">Potential Risks</h2>
          <p className="italic">{recommendation.potential_risks?.description}</p>
          <pre className="text-md font-serif w-full overflow-auto">
            {recommendation.potential_risks?.content}
          </pre>
        </div>
        <div className="w-full mb-10 h-auto border rounded-lg p-4">
          <h2 className="text-xl font-semibold">Expert Advice</h2>
          <p className="italic">{recommendation.expert_advice?.description}</p>
          <pre className="text-md font-serif w-full overflow-auto">
            {recommendation.expert_advice?.content}
          </pre>
        </div>
        <div className="w-full mb-10 h-auto border rounded-lg p-4">
          <h2 className="text-xl font-semibold">Dietary Suggestions</h2>
          <p className="italic">{recommendation.dietary_suggestions?.description}</p>
          <pre className="text-md font-serif w-full overflow-auto">
            {recommendation.dietary_suggestions?.content}
          </pre>
        </div>
      </>
    ) : (
      <p>Loading recommendations...</p>
    )}
  </div>
  );
}

export default Recommendation;
