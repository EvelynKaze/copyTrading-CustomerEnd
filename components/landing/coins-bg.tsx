"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState, useEffect } from "react";

const cryptoIcons = [
  { iconName: "uil:bitcoin" },
  { iconName: "streamline:ethereum-circle-solid" },
  { iconName: "cryptocurrency:xrp" },
  { iconName: "cryptocurrency:bnb" },
];

export default function CryptoBg() {
  const [currentIconIndex, setCurrentIconIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prevIndex) => (prevIndex + 1) % cryptoIcons.length);
    }, 3000); // Change icon every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIconIndex}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          exit={{ scale: 1.5, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
        >
          <Icon
            icon={cryptoIcons[currentIconIndex].iconName}
            className="text-[260px] sm:text-[400px] dark:text-appGold200"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
