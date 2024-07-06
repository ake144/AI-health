"use client";

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
import { Select } from "@radix-ui/react-select";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useAuth } from '@clerk/nextjs';
import { get } from "http";
import { getUserById } from "@/utils/actions/getuser";


interface UserSchema {
  username: string;
  age: number;
  weight: number;
  height: number;
  fitnessLevel?: string;
  healthConditions?: string;
  goals: string;
  currentExerciseRoutine?: string;
}

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
  }),
  healthConditions: z.string().optional(),
  goals: z.string(),
  currentExerciseRoutine: z.string().optional(),
});

async function UsersInfo() {

    const {userId}  = useAuth()

  
    if(!userId) return null

    const user = await  getUserById(userId)

    console.log("current user",user)
  
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: '',
        age: 0,
        weight: 0,
        height: 0,

      },
    });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      console.log(data);
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error('Error generating content:', error);
    }
  };

  return (
    <div>
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
                  <Input placeholder="Enter your username" {...field} />
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
                  <Textarea placeholder="Enter any health conditions" {...field} />
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
                  <Textarea placeholder="Enter your fitness goals" {...field} />
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
                  <Textarea placeholder="Describe your current exercise routine" {...field} />
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
}

export default UsersInfo;
