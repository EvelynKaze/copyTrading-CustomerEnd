"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { closeSidebar } from "@/store/sideBar";
import Sidebar from "@/components/sidebar";
import { Icon } from "@iconify/react/dist/iconify.js";

export const MobileSidebar: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? 0 : "-100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed inset-y-0 left-0 z-50 shadow-lg lg:hidden"
    >
      <div className="h-full overflow-y-auto">
        <Sidebar />
      </div>
      <button
        onClick={() => dispatch(closeSidebar())}
        className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700"
      >
        <Icon icon={"mingcute:close-line"} />
      </button>
    </motion.div>
  );
};
