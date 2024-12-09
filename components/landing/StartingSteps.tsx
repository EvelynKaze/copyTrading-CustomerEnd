"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SignUpMiniUI } from "./SignupMiniUI";
import { ChooseStrategyMiniUI } from "./ChooseStrategyMiniUI";
import { LetItWorkMiniUI } from "./LetItWorkMiniUI";

interface Slide {
  id: number;
  content: React.ReactNode;
}

const slides: Slide[] = [
  { id: 1, content: <SignUpMiniUI /> },
  { id: 2, content: <ChooseStrategyMiniUI /> },
  { id: 3, content: <LetItWorkMiniUI /> },
];

const variants = {
  enter: { x: "-100%", y: "100%", opacity: 0 },
  center: { x: 0, y: 0, opacity: 1 },
  exit: { x: "100%", y: "100%", opacity: 0 },
};

export default function AnimatedSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-xl overflow-hidden">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={slides[currentIndex].id}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            y: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className=" inset-0 flex items-center justify-center"
        >
          <div className="absolute w-full h-full"></div>
          {slides[currentIndex].content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
