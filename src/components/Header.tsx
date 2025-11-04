import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";
import { Lock, LogOut, Pencil, User } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/custom/theme.toggle";

const Header = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="flex items-center justify-end border-b bg-background px-6 py-3">
      {/* <h1 className="text-xl font-semibold">Dashboard</h1> */}

      <div className="flex items-center gap-3">
        {/* <Button variant="outline" size="sm">
          Settings
        </Button> */}
        <ThemeToggle />

        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <div
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
              className="cursor-pointer"
            >
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>

          <AnimatePresence>
            {open && (
              <DropdownMenuContent
                align="end"
                asChild
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                className="w-48"
              >
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  <DropdownMenuLabel>
                    <span>Mario Rossi</span>
                    <span className="block text-xs text-muted-foreground">
                      mario.rossi@gmail.com
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => router.push("/dashboard/profile")}
                  >
                    <User className="h-4 w-4" /> Mio Profilo
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push("/dashboard/profile/edit")}
                  >
                    <Pencil className="h-4 w-4" /> Modifica Profilo
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      router.push("/dashboard/profile/change-password")
                    }
                  >
                    <Lock className="h-4 w-4" /> Cambia Password
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => console.log("Logout")}
                  >
                    <LogOut className="h-4 w-4" /> Disconnetti
                  </DropdownMenuItem>
                </motion.div>
              </DropdownMenuContent>
            )}
          </AnimatePresence>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
