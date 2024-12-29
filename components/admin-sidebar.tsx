"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTheme } from "./ThemeProvider";
import AdminLogo from "./dashlogo";
import { Icon } from "@iconify/react/dist/iconify.js";
import { closeSidebar } from "@/store/sideBar";
import { useDispatch } from "react-redux";

const navigation = [
  { name: "Users", href: "/admin", icon: "ph:users-three" },
  {
    name: "Transactions",
    href: "/admin/requests",
    icon: "grommet-icons:transaction",
  },
  {
    name: "Audit Log",
    href: "/admin/audit-log",
    icon: "mdi:clipboard-text-clock-outline",
  },
];

const secondaryNavigation = [
  {
    name: "Settings",
    href: "/admin/settings",
    icon: "solar:settings-linear",
  },
  { name: "Help", href: "/admin/help", icon: "tabler:help" },
  { name: "Log out", href: "/admin/logout", icon: "solar:logout-outline" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();

  return (
    <div className="flex h-full w-56 flex-col border-r bg-white dark:bg-appDark">
      <div className="p-6">
        <Link href="/admin" className="flex items-center gap-2 font-semibold">
          <AdminLogo />
          <span className="text-lg font-bold text-appDarkCard dark:text-white">
            Admin Panel
          </span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => dispatch(closeSidebar())}
              className={cn(
                "group flex items-center gap-3 text-appDarkCard dark:text-white rounded-lg px-3 py-2 text-sm font-medium",
                isActive
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
          );
        })}
      </nav>
      <nav className="mt-auto space-y-1 border-t px-3 py-4">
        <span
          onClick={() => {
            toggleTheme();
            dispatch(closeSidebar());
          }}
          className="group cursor-pointer flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium dark:text-white text-appDarkCard hover:bg-appGold20 cursor-pointer"
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
            onClick={() => dispatch(closeSidebar())}
            className={cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium dark:text-white text-appDarkCard hover:bg-appGold20",
              pathname === item.href
                ? "bg-appCardGold dark:text-appDarkCard"
                : ""
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
    </div>
  );
}
