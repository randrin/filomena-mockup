import DashboardLayout from "@/components/DashboardLayout";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/router";
import { Textarea } from "@/components/ui/textarea";
import { PhoneInput } from "@/components/custom/phone.input";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
  avatarUrl?: string;
  notes?: string;
};

const EditProfileScreen = () => {
  const router = useRouter();
  const [user, setUser] = useState<User>({
    firstName: "Mario",
    lastName: "Rossi",
    email: "mario.rossi@example.com",
    phone: "+39 06 12 34 56 78",
    dateOfBirth: "1990-05-20",
    address: "Via Piazza di Spagna, 10, Milan, 20144, Italia",
    avatarUrl: "/avatar.jpg", // replace with actual path
    notes: "Experienced operator with a focus on customer satisfaction."
  });

  const handleChange = (field: keyof User, value: string) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("✅ Updated user data:", user);
    alert("Profile updated!");
  };

  return (
    <DashboardLayout>
      <div className="w-full">
        <div className="flex justify-between items-center mb-4 gap-2">
          <div className="w-full">
            <h1 className="text-2xl font-bold mb-2">Modify Profile</h1>
            <span>Update your personal details and save changes.</span>
          </div>
        </div>
        <Card className="w-full rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSubmit}>
            <CardContent className="pt-6 space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={user.avatarUrl} alt="Profile Picture" />
                  <AvatarFallback>
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Label htmlFor="avatar">Profile Picture</Label>
                  <Input
                    id="avatar"
                    type="file"
                    className="mt-1"
                    onChange={(e) =>
                      console.log("Selected file:", e.target.files?.[0])
                    }
                  />
                </div>
              </div>

              {/* Two-column grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={user.firstName}
                    placeholder="Enter the value"
                    onChange={(e) => handleChange("firstName", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={user.lastName}
                    placeholder="Enter the value"
                    onChange={(e) => handleChange("lastName", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    placeholder="Enter the value"
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <PhoneInput />
                  {/* <Input
                    id="phone"
                    value={user.phone}
                    placeholder="Enter the value"
                    onChange={(e) => handleChange("phone", e.target.value)}
                  /> */}
                </div>

                <div>
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={user.dateOfBirth}
                    onChange={(e) =>
                      handleChange("dateOfBirth", e.target.value)
                    }
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={user.address}
                    placeholder="Enter the value"
                    onChange={(e) => handleChange("address", e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="message"
                    placeholder="Type your message here..."
                    value={user.notes}
                    onChange={(e) => handleChange("notes", e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-end gap-3">
              <Button
                variant="outline"
                type="button"
                onClick={() => router.push("/dashboard/profile")}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EditProfileScreen;
