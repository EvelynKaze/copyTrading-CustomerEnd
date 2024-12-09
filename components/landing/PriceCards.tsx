"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function CryptoCards() {
  const [selectedCard, setSelectedCard] = useState(0);

  const cards = [
    {
      icon: "uil:bitcoin",
      name: "BTC/USDT",
      color: "bg-[#f7931a]",
    },
    {
      icon: "uil:bitcoin",
      name: "BTC/USDT",
      color: "bg-[#2962ef]",
    },
    {
      icon: "uil:bitcoin",
      name: "BTC/USDT",
      color: "bg-[#00b4c9]",
    },
    {
      icon: "uil:bitcoin",
      name: "BTC/USDT",
      color: "bg-[#2c3035]",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedCard(() => (selectedCard + 1) % cards.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [cards.length, selectedCard]);

  return (
    <div className="flex gap-4">
      {cards.map((card, index) => (
        <div key={index} className="relative">
          {selectedCard === index && (
            <motion.div
              className={
                "absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-white/5"
              }
              layoutId="highlight"
              initial={false}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            />
          )}

          <div
            className={`relative rounded-2xl text-appDarkCard bg-appCardGold p-4 ${
              selectedCard === index ? "opacity-100" : "opacity-60"
            }`}
          >
            <div className="mb-3 flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg`}
              >
                <Icon className="text-3xl" icon={card.icon} />
              </div>
              <div className="flex items-center gap-1 text-xs text-appDark">
                <ArrowUp className="h-3 w-3" />
                <span>2.73%</span>
              </div>
            </div>
            <div className="space-y-0.5">
              <div className="text-2xl font-bold">36,641.20</div>
              <div className="text-sm">36,641.20</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
