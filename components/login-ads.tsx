"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

const slides = [
  {
    icon: "ri:stock-line",
    title: "Buy Stocks with Crypto",
    content:
      "Seamlessly purchase stocks and diversify your portfolio using your favorite cryptocurrencies.",
  },
  {
    icon: "mdi:chart-line",
    title: "Invest in Copy Trading Options",
    content:
      "Mirror the trades of successful investors and let their expertise guide your growth.",
  },
  {
    icon: "mdi:secure-outline",
    title: "Secure, Fast, and Transparent Transactions",
    content:
      "Powered by blockchain technology, we ensure your investments are safe, efficient, and completely transparent.",
  },
];

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

export const LoginAdsSlider: React.FC = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setPage(([prevPage]) => [prevPage + 1, 1]);
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isHovered]);

  const currentIndex = Math.abs(page) % slides.length;

  return (
    <div
      className="relative w-full max-w-lg h-96 overflow-hidden rounded-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute w-full h-full flex flex-col items-center justify-center"
        >
          <Icon
            icon={slides[currentIndex].icon}
            className="text-9xl mb-6 text-appGold200"
          />
          <div className="text-center grid justify-items-center p-8">
            <h2 className="text-xl font-bold mb-2 text-appGold200">
              {slides[currentIndex].title}
            </h2>
            <p className="text-sm dark:text-gray-200 max-w-96">
              {slides[currentIndex].content}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-1 w-8 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-appGold200" : "bg-appGold20"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
