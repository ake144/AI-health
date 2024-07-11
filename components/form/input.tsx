'use client'


import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@radix-ui/react-select";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { createRecommendation } from "@/utils/actions/recommend";
import {  getUserById } from "@/utils/actions/getuser";
import Link from "next/link";
import { useRouter } from "next/navigation";




const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  age: z.number().positive().int().min(1).max(120, {
    message: "Age must be between 1 and 120.",
  }),
  weight: z.number().positive().min(1, {
    message: "Weight must be a positive number.",
  }),
  height: z.number().positive().min(1, {
    message: "Height must be a positive number.",
  }),
  fitnessLevel: z.enum(['Beginner', 'Intermediate', 'Advanced'], {
    required_error: "Fitness level is required."
  }),
  healthConditions: z.string(),
  goals: z.string(),
  currentExerciseRoutine: z.string(),
});

export function UserInfo() {

  const [userData, setUserData] = useState<any>(null);
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

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




  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      age: 0,
      weight: 0,
      height: 0,
      fitnessLevel: 'Beginner',
      healthConditions: '',
      goals: '',
      currentExerciseRoutine: '',
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
    return <div>Loading...</div>;
  }
  
  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" defaultValue={userData.username} {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter your age" {...field}   defaultValue={userData.age} onChange={(e) => field.onChange((e.target as HTMLInputElement).valueAsNumber)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight (kg)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter your weight in kg" {...field}  defaultValue={userData.weight}   onChange={(e) => field.onChange((e.target as HTMLInputElement).valueAsNumber)}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height (cm)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter your height in cm"   defaultValue={userData.height} {...field} onChange={(e) => field.onChange((e.target as HTMLInputElement).valueAsNumber)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fitnessLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fitness Level</FormLabel>
              <FormControl>
                <Select {...field}>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="healthConditions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Health Conditions</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter any health conditions"   defaultValue={userData.healthConditions} {...field} id="healthCondition" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="goals"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Goals</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your fitness goals"   defaultValue={userData.goals} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currentExerciseRoutine"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Exercise Routine</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your current exercise routine"  defaultValue={userData.currentExerciseRoutine}   {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Generate Recommendations</Button>
        </form>
      </Form>

      
    </>
  );
}
