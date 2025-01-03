"use client";
import { toggleSidebar } from "@/store/sideBar";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { useDispatch } from "react-redux";

export default function ToggleSidebar() {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch(toggleSidebar())}
      className="lg:hidden p-2 rounded-md text-appDarkCard dark:text-white hover:dark:text-appDarkCard hover:bg-appCardGold "
    >
      <Icon icon={"ic:round-menu"} className="text-xl" />
    </button>
  );
}
