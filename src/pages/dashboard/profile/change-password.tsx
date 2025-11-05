import DashboardLayout from "@/components/DashboardLayout";
import { AlertMessage } from "@/components/custom/alert.message";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { PasswordInput } from "@/components/custom/password-input";
import { cn } from "@/lib/utils";
import { KeyRound } from "lucide-react";
import React, { useState } from "react";

const ChangePasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setStatus("error");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="w-full">
        <div className="flex justify-between items-center mb-4 gap-2">
          <div className="w-full">
            <h1 className="text-2xl font-bold mb-2">Cambio la tua password</h1>
            <AlertMessage
              type="info"
              description="Per motivi di sicurezza, puoi modificare la tua password qui."
            />
          </div>
        </div>
        <div className="flex justify-center items-center mb-4 gap-2">
          <Card className="w-md rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <CardContent>
              {status === "success" && (
                <AlertMessage
                  type="success"
                  title="Password aggiornata!"
                  description="La tua password è stata cambiata con successo."
                />
              )}

              {status === "error" && (
                <AlertMessage
                  type="error"
                  title="Errore"
                  description="Le nuove password non coincidono."
                />
              )}

              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div>
                  <PasswordInput
                    id="current-password"
                    label="Password attuale"
                    placeholder="Inserisci la password attuale"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <PasswordInput
                    id="new-password"
                    label="Nuova password"
                    placeholder="Inserisci la nuova password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <PasswordInput
                    id="confirm-password"
                    label="Conferma nuova password"
                    placeholder="Conferma la nuova password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <CardFooter className="p-0 mt-2">
                  <Button
                    type="submit"
                    className={cn("w-full")}
                    disabled={
                      !currentPassword || !newPassword || !confirmPassword
                    }
                  >
                    <KeyRound className="mr-2 h-4 w-4" /> Aggiorna Password
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChangePasswordScreen;
