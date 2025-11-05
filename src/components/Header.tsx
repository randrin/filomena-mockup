import { ThemeToggle } from "@/components/custom/theme.toggle";
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
import { Lock, LogOut, Pencil, TextAlignJustify, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DrawerInput from "./custom/drawer-input";

const Header = () => {
  const [showMobileSidebar, setShowMobileSidebar] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="flex items-center justify-between lg:justify-end border-b bg-background px-6 py-3">
      <span className="flex lg:hidden text-xl font-semibold">
        <TextAlignJustify
          onClick={() => setShowMobileSidebar(!showMobileSidebar)}
        />
      </span>

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
      {/* Drawer per visualizzare il dettaglio dell'appuntamento */}
      <DrawerInput
        open={showMobileSidebar}
        setOpen={setShowMobileSidebar}
        position="right"
        title="Filomena"
      >
        <div className="m-4 flex flex-col gap-4">Mobile Sidebar</div>
      </DrawerInput>
    </header>
  );
};

export default Header;
