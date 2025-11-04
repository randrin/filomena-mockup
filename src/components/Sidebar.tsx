import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Home,
  LayoutDashboard,
  User,
  UserRoundCog,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { DropdownMenuSeparator } from "./ui/dropdown-menu";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home
  },
  {
    name: "Servizi",
    icon: LayoutDashboard,
    children: [
      { name: "Trattamenti", href: "/dashboard/services/treatments" },
      { name: "Categorie", href: "/dashboard/services/categories" }
    ]
  },
  {
    name: "Clienti",
    href: "/dashboard/clients",
    icon: User
  },
  {
    name: "Operatori",
    icon: UserRoundCog,
    href: "/dashboard/operators"
  }
];

const Sidebar = () => {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) =>
      prev.includes(name) ? prev.filter((m) => m !== name) : [...prev, name]
    );
  };

  return (
    <aside className="flex h-full w-64 flex-col border-r">
      <div className="p-4 text-lg font-bold">Filomena</div>
      <DropdownMenuSeparator />

      <nav className="flex-1 space-y-1 px-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.children &&
              item.children.some((child) => pathname.startsWith(child.href)));

          // --- Simple link item ---
          if (!item.children) {
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary dark:bg-muted/40 text-white"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          }

          // --- Dropdown item ---
          const isOpen = openMenus.includes(item.name);
          return (
            <div key={item.name} className="space-y-1">
              <button
                onClick={() => toggleMenu(item.name)}
                className={cn(
                  "flex w-full items-center cursor-pointer justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </div>
                {isOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>

              {/* Dropdown children */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="ml-8 mt-1 space-y-1 overflow-hidden"
                  >
                    {item.children.map((child) => {
                      const isChildActive = pathname.startsWith(child.href);
                      return (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={cn(
                            "block rounded-md px-3 py-1.5 text-sm transition-colors",
                            isChildActive
                              ? "bg-primary/20 text-primary font-medium"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          {child.name}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
