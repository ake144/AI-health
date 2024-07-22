"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { getUserById } from "@/utils/actions/getuser";


const FormSchema = z.object({
  activityDates: z
    .array(z.date({
      required_error: "A date is required.",
    }))
    .length(3, "You must select exactly 3 dates."),
});

export function DatePickerForm() {
  const { user, isLoaded, isSignedIn } = useUser();
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


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      // Save the selected dates to the database

      console.log("the data", data)
      const response = await fetch('/api/save-dates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data, userId: userData?.id }),
      });

      if (!response.ok) {
        throw new Error('Failed to save dates');
      }

      console.log("the res", response)

      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to save dates.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-[60px] mx-[40px]">
        <FormField
          control={form.control}
          name="activityDates"
          render={({ field }) => (
            <FormItem className="flex mx-11 flex-col">
              <FormLabel>Activity Dates</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[400px]  h-[100px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field?.value?.length ? (
                        field?.value?.map((date) => format(date, "PPP")).join(", ")
                      ) : (
                        <span>Pick dates</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="multiple"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date > new Date("2030-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Select three dates for your activities.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit"  className="mx-11">Add</Button>
      </form>
    </Form>
  );
}
