'use client';

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Select } from "@/components/ui/select"; // Adjust this import based on your component structure
import { useUser } from "@clerk/nextjs";
import { getUserById } from "@/utils/actions/getuser";
import scheduleEmails from "@/utils/scheduler";
import { updateUser } from "@/utils/actions/updateUser"; // Ensure the import path is correct
import Link from "next/link";

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
    required_error: "Fitness level is required.",
  }).optional(),
  healthConditions: z.string().optional(),
  goals: z.string(),
  currentExerciseRoutine: z.string().optional(),
});

const UsersInfo = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (isSignedIn && isLoaded) {
      getUserById(user.id)
        .then((data) => setUserData(data))
        .catch((error) => console.error(error));
    }
  }, [isSignedIn, isLoaded, user]);

  console.log("userData", userData);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: userData 
  });

  useEffect(() => {
    // Start the scheduler
    scheduleEmails();
  }, []);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await updateUser({
        id: user?.id, // Add user ID to the data object
        ...data
      });
      console.log("response",response);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
       <Link href='/'>
        <div className='mx-2 p-7'>
          Back
        </div>
        </Link> 
      <h1 className="text-4xl font-bold mb-4">Users Info</h1>
      <p className="text-gray-600 mb-6">By User • Date</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username"  defaultValue={userData.username} {...field} />
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
                  <Input
                    type="number"
                    placeholder="Enter your age"
                    defaultValue={userData.age}
                    {...field}
                    onChange={(e) => field.onChange((e.target as HTMLInputElement).valueAsNumber)}
                  />
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
                  <Input
                    type="number"
                    placeholder="Enter your weight in kg"
                    defaultValue={userData.weight}
                    {...field}
                    onChange={(e) => field.onChange((e.target as HTMLInputElement).valueAsNumber)}
                  />
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
                  <Input
                    type="number"
                    defaultValue={userData.height}
                    placeholder="Enter your height in cm"
                    {...field}
                    onChange={(e) => field.onChange((e.target as HTMLInputElement).valueAsNumber)}
                  />
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
                  <Select  
                  defaultValue={userData.fitnessLevel}
                  {...field}>
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
                  <Textarea  defaultValue={userData.healthConditions} placeholder="Enter any health conditions" {...field} />
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
                  <Textarea  defaultValue={userData.goals} placeholder="Enter your fitness goals" {...field} />
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
                  <Textarea placeholder="Describe your current exercise routine" defaultValue={userData.currentExerciseRoutine} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default UsersInfo;
