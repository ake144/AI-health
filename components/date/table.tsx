"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns"; // Import the format function from date-fns library
import { useUser } from "@clerk/nextjs";
import { getUserById } from "@/utils/actions/getuser";

export function ScheduledActivitiesTable() {
  const [scheduledDates, setScheduledDates] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading
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

  useEffect(() => {
    const fetchScheduledDates = async () => {
      if (userData?.id) {
        try {
          const response = await fetch(`/api/get-dates?userId=${userData.id}`);
          const data = await response.json();
          setScheduledDates(data.dates);
        } catch (error) {
          console.error("Failed to fetch scheduled dates:", error);
        } finally {
          setIsLoading(false); // Set loading to false after fetching
        }
      }
    };

    fetchScheduledDates();
  }, [userData]);

  if (isLoading) {
    return <div>Loading...</div>; // Display a loading message or spinner
  }

  return (
    <Table>
      <TableCaption>A list of scheduled activities.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">Day 1</TableHead>
          <TableHead className="text-center">Day 2</TableHead>
          <TableHead className="text-right">Day 3</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {scheduledDates.length > 0 ? (
          <TableRow>
            {scheduledDates.map((date, index) => (
              <TableCell key={index} className={index === 1 ? "text-center" : index === 2 ? "text-right" : "text-left"}>
                {format(new Date(date), "PPP")}
              </TableCell>
            ))}
          </TableRow>
        ) : (
          <TableRow>
            <TableCell colSpan={3} className="text-center">No scheduled activities.</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
