import DashboardLayout from "@/components/DashboardLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import React from "react";
import { Pencil, User } from "lucide-react";
import { useRouter } from "next/router";

type User = {
  ID: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
  avatarUrl?: string;
  notes?: string;
};

const user: User = {
  ID: "OP001",
  firstName: "Mario",
  lastName: "Rossi",
  email: "mario.rossi@example.com",
  phone: "+39 06 12 34 56 78",
  dateOfBirth: "1990-05-20",
  address: "Via Piazza di Spagna, 10, Milan, 20144, Italia",
  avatarUrl: "/avatar.jpg", // replace with actual path
  notes: "Experienced operator with a focus on customer satisfaction."
};

const ProfileScreen = () => {
  const router = useRouter();
  return (
    <DashboardLayout>
      <div className="w-full">
        <div className="flex justify-between items-center mb-4 gap-2">
          <div>
            <h1 className="text-2xl font-bold mb-2">My Profile</h1>
          </div>
        </div>
        <Card className="w-full rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-col md:flex-row items-center px-6 py-4 gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user.avatarUrl} alt="Profile Picture" />
              <AvatarFallback>
                {user.firstName[0]}
                {user.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-2xl">
                {user.firstName} {user.lastName}
              </CardTitle>
              <CardDescription className="flex items-center gap-3 mt-1">
                {user.ID}
              </CardDescription>
            </div>
            <Button
              className="mt-4 md:mt-0"
              onClick={() => router.push("/dashboard/profile/edit")}
            >
              <Pencil className="h-4 w-4" /> Edit Profile
            </Button>
          </CardHeader>

          <CardContent className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold dark:text-muted-foreground">Email</p>
                <p className="text-lg font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-semibold dark:text-muted-foreground">Phone</p>
                <p className="text-lg font-medium">{user.phone ?? "-"}</p>
              </div>
              <div>
                <p className="text-sm font-semibold dark:text-muted-foreground">Date of Birth</p>
                <p className="text-lg font-medium">
                  {user.dateOfBirth
                    ? new Date(user.dateOfBirth).toLocaleDateString("it-IT")
                    : "-"}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-semibold dark:text-muted-foreground">Address</p>
                <p className="text-lg font-medium">{user.address ?? "-"}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-semibold dark:text-muted-foreground">Notes</p>
                <p className="text-lg font-medium">{user.notes ?? "-"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ProfileScreen;
