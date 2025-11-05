import { PhoneInput } from "@/components/custom/phone.input";
import ToastMessage from "@/components/custom/toast.message";
import DashboardLayout from "@/components/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Undo2Icon, UserCheck, X } from "lucide-react";
import { useRouter } from "next/router";
import React, { useState } from "react";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  address?: {
    line_one?: string;
    line_two?: string;
    city: string;
    zip_code: string;
    country: string;
  };
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
    address: {
      line_one: "Via Piazza di Spagna, 10",
      city: "Milan",
      zip_code: "20144",
      country: "Italia"
    }, //"Via Piazza di Spagna, 10, Milan, 20144, Italia",
    avatarUrl: "/avatar.jpg", // replace with actual path
    notes: "Experienced operator with a focus on customer satisfaction."
  });

  // Desctructure
  const { firstName, lastName, avatarUrl, email, phone, address, dateOfBirth, notes } =
    user;

  const handleChange = (field: keyof User, value: string) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    ToastMessage({
      message: "Le modifiche al tuo profilo sono state salvate con successo.",
    })
    router.push("/dashboard/profile");
  };

  return (
    <DashboardLayout>
      <div className="w-full">
        <div className="flex justify-between items-center mb-4 gap-2">
          <div className="w-full">
            <h1 className="text-2xl font-bold mb-2">Modifica Profilo</h1>
            <span>Aggiorna i tuoi dati personali e salva le modifiche.</span>
          </div>
        </div>
        <Card className="w-full rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSubmit}>
            <CardContent className="pt-6 space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={avatarUrl} alt="Profile Picture" />
                  <AvatarFallback>
                    {firstName[0]}
                    {lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Label htmlFor="avatar">Immagine profilo</Label>
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
                  <Label htmlFor="firstName">Nome</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    placeholder="Inserisci nome"
                    onChange={(e) => handleChange("firstName", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="lastName">Cognome</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    placeholder="Inserisci cognome"
                    onChange={(e) => handleChange("lastName", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Posta elettronica</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Inserisci posta elettronica"
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Telefono</Label>
                  <PhoneInput />
                  {/* <Input
                    id="phone"
                    value={user.phone}
                    placeholder="Enter the value"
                    onChange={(e) => handleChange("phone", e.target.value)}
                  /> */}
                </div>
              </div>
              <div>
                <Label htmlFor="dob">Data di nascita</Label>
                <Input
                  id="dob"
                  type="date"
                  name="dateOfBirth"
                  value={dateOfBirth}
                  onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="line_one">Indirizzo</Label>
                  <Input
                    id="line_one"
                    name="line_one"
                    value={address?.line_one}
                    placeholder="Inserisci indirizzo"
                    onChange={(e) => handleChange("address", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="zip_code">Codice postale</Label>
                  <Input
                    id="zip_code"
                    name="zip_code"
                    value={address?.zip_code}
                    placeholder="Inserisci il codice postale"
                    onChange={(e) => handleChange("address", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="city">Città</Label>
                  <Input
                    id="city"
                    name="city"
                    value={address?.city}
                    placeholder="Inserisci la città"
                    onChange={(e) => handleChange("address", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="address">Paese</Label>
                  <Input
                    id="country"
                    name="country"
                    value={address?.country}
                    placeholder="Inserisci il paese"
                    onChange={(e) => handleChange("address", e.target.value)}
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="Notes"
                  name="notes"
                  placeholder="Inserisci una nota"
                  value={notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>

            <CardFooter className="flex justify-end gap-3">
              <Button
                variant="outline"
                type="button"
                onClick={() => router.push("/dashboard/profile")}
              >
                <Undo2Icon /> Annulla
              </Button>
              <Button type="submit">
                <UserCheck /> Salva Modifiche
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EditProfileScreen;
