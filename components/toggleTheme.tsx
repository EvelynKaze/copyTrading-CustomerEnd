"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="text-xl rounded text-appDarkCard dark:text-white"
    >
      <Icon
        icon={
          theme === "light" ? "iconamoon:mode-dark-light" : "entypo:light-up"
        }
      />
    </button>
  );
}
