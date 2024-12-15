"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import ThemeToggle from "./toggleTheme";
import { useTheme } from "./ThemeProvider";
import DashLogo from "./dashlogo";
import { Icon } from "@iconify/react/dist/iconify.js";

const navigation = [
  { name: "Dashboard", href: "/", icon: "iconamoon:home-light", current: true },
  {
    name: "Deposit",
    href: "/deposit",
    icon: "ph:hand-deposit",
    current: false,
  },
  {
    name: "Withdraw",
    href: "/withdraw",
    icon: "ph:hand-withdraw",
    current: false,
  },
  {
    name: "History",
    href: "/history",
    icon: "solar:history-bold",
    current: false,
  },
];

const secondaryNavigation = [
  { name: "Settings", href: "/settings", icon: "solar:settings-linear" },
  { name: "Help", href: "/help", icon: "tabler:help" },
  { name: "Log out", href: "/logout", icon: "solar:logout-outline" },
];

export function Sidebar() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="flex h-full w-56 flex-col border-r bg-white dark:bg-appDark">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <DashLogo />
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "group flex items-center gap-3 text-appDarkCard dark:text-white rounded-lg px-3 py-2 text-sm font-medium",
              item.current
                ? "bg-appCardGold dark:text-appDarkCard"
                : "hover:bg-appGold20"
            )}
          >
            <Icon
              strokeWidth={1.5}
              icon={`${item.icon}`}
              className="h-5 w-5 text-3xl"
            />
            {item.name}
          </Link>
        ))}
      </nav>
      <nav className="mt-auto space-y-1 border-t px-3 py-4">
        <span
          onClick={toggleTheme}
          className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium dark:text-white text-appDarkCard hover:bg-appGold20"
        >
          <Icon
            icon={
              theme === "light"
                ? "iconamoon:mode-dark-light"
                : "entypo:light-up"
            }
            strokeWidth={1.5}
            className="h-5 w-5 text-3xl"
          />
          {theme === "light" ? "Dark mode" : "Light mode"}
        </span>
        {secondaryNavigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium dark:text-white text-appDarkCard hover:bg-appGold20"
          >
            <Icon
              strokeWidth={1.5}
              icon={`${item.icon}`}
              className="h-5 w-5 text-3xl"
            />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
