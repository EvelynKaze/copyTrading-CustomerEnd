"use client";
import CryptoBg from "@/components/landing/coins-bg";
import { motion } from "framer-motion";
import PublicNav from "../components/PublicNav";
import Image from "next/image";
import { dashboardImg, marketsImg, tradingView } from "@/constants/AppImages";
import KeyFeatures from "@/components/landing/KeyFeatures";
import AnimatedLine from "@/components/landing/AnimatedLine";
import AnimatedSlideshow from "@/components/landing/StartingSteps";
import testimonials from "@/constants/testimonials";
import Testimonials from "@/components/landing/TestimonialCard";
import { useState } from "react";
import { advantages, disadvantages } from "@/constants/prosCons";
import { Icon } from "@iconify/react/dist/iconify.js";
import Footer from "@/components/landing/Footer";

export default function Home() {
  const [showAll, setShowAll] = useState<boolean>(false);

  // Number of rows to show initially
  const visibleRows = 2;
  const itemsPerRow = 3;

  // Calculate items to show based on the number of visible rows
  const visibleItems = visibleRows * itemsPerRow;

  return (
    <div className="bg-white relative dark:bg-appDarkGradient">
      <div className="fixed w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <CryptoBg />
      </div>
      <PublicNav />
      <section className="min-h-screen grid mb-12 justify-items-center before:block before:h-32">
        <div className="inner text-center mt-12 grid justify-items-center gap-4">
          <motion.div
            initial={{ opacity: 0, translateY: -50 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-7xl font-bold">
              Simplify Success, <br /> Trade Smarter
            </h1>
          </motion.div>
          <span className="dark:text-appGold200 flex gap-4 opacity-70 justify-center items-center">
            <p>Learn</p>
            <span>.</span>
            <p>Copy</p>
            <span>.</span>
            <p>Succeed</p>
          </span>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <p className="max-w-prose">
              Copy-Trading Markets empowers you to achieve your financial goals
              by following strategies that work. Harness the expertise of
              seasoned traders and make informed decisions with confidence.
            </p>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, translateY: 50 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl opacity-75 relative mt-6 rounded-lg overflow-hidden aspect-video"
        >
          <Image
            src={dashboardImg}
            alt="dashboard preview"
            className="object-cover"
          />
        </motion.div>
      </section>
      <section className="my-12">
        <div className="inner w-full flex justify-center">
          <AnimatedLine />
        </div>
      </section>

      <section className="py-12">
        <div className="inner grid gap-2-b text-center justify-items-center">
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="border-b border-appDarkCard dark:border-appGold200 backdrop-blur-sm mb-4 rounded-full py-2 px-6 text-xs"
          >
            Tailored for Every Investor
          </motion.span>
          <motion.div
            initial={{ opacity: 0, translateY: -50 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl mb-3 font-bold">
              Effortless Trading, <br /> Real Results
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <p className="max-w-prose text-base">
              Whether you're a beginner or an experienced investor, Copy-Trading
              Markets adapts to your needs. Dive into a world where your success
              is guided by expert insights and powerful tools.
            </p>
          </motion.div>
          <div className="flex justify-center max-w-4xl gap-8 mt-12">
            <motion.div
              initial={{ opacity: 0, translateX: -70 }}
              whileInView={{ opacity: 1, translateX: 0 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 400,
                damping: 30,
                delay: 0.5,
              }}
              className="text-start border-opacity-45 max-w-2xl items-center rounded-3xl overflow-hidden backdrop-blur-md border border-appDarkCard dark:border-appGold200"
            >
              <div className="aspect-video w-full rounded-b-3xl opacity-55 overflow-hidden">
                <Image
                  src={tradingView}
                  className="w-full object-cover"
                  alt="Markets"
                />
              </div>
              <div className="p-8 min-h-72 flex flex-col justify-between items-start">
                <div>
                  <h1 className="font-semibold text-3xl mb-2">
                    Intelligent Automation
                  </h1>
                  <p className="max-w-[50ch]">
                    Let the system work while you focus on what matters:
                    Reliable results optimized for maximum gains and hands-free
                    management that handles the complexity for you.
                  </p>
                </div>
                <button className="px-4 py-1 text-sm rounded bg-appCardGold text-appDarkCard mt-6">
                  Learn More
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, translateX: 70 }}
              whileInView={{ opacity: 1, translateX: 0 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 400,
                damping: 30,
                delay: 0.5,
              }}
              className="text-start border-opacity-45 max-w-2xl items-center rounded-3xl overflow-hidden backdrop-blur-md border border-appDarkCard dark:border-appGold200"
            >
              <div className="aspect-video w-full rounded-b-3xl opacity-55 overflow-hidden">
                <Image
                  src={marketsImg}
                  className="w-full object-cover"
                  alt="Markets"
                />
              </div>
              <div className="p-8 min-h-72 flex flex-col justify-between items-start">
                <div>
                  <h1 className="font-semibold text-3xl mb-2">
                    Expert Guidance
                  </h1>
                  <p className="max-w-[50ch]">
                    Follow top-performing traders, access their performance
                    metrics, and replicate proven strategies with real-time
                    support
                  </p>
                </div>
                <button className="px-4 py-1 text-sm rounded bg-appCardGold text-appDarkCard mt-6">
                  Discover More
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="my-8">
        <div className="inner w-full flex justify-center">
          <AnimatedLine />
        </div>
      </section>
      <section className="py-12">
        <div className="inner grid justify-items-center text-center">
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="border-b border-appDarkCard dark:border-appGold200 backdrop-blur-sm mb-4 rounded-full py-2 px-6 text-xs"
          >
            Key Features
          </motion.span>
          <KeyFeatures />
        </div>
      </section>
      <section className="my-8">
        <div className="inner w-full flex justify-center">
          <AnimatedLine />
        </div>
      </section>

      <section className="relative min-h-72 py-12">
        <div className="inner flex flex-col items-center">
          <h2 className="text-3xl font-semibold mb-4">
            Get Started in Three Simple Steps
          </h2>
          <AnimatedSlideshow />
        </div>
      </section>

      <section className="relative py-12">
        <div className="inner grid justify-items-center text-center">
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="border-b border-appDarkCard dark:border-appGold200 backdrop-blur-sm mb-4 rounded-full py-2 px-6 text-xs"
          >
            Why Choose Us
          </motion.span>
          <h2 className="text-3xl font-semibold mb-2">
            Why Copy-Trading Markets is the Clear Choice
          </h2>
          <p className="text-base max-w-prose dark:text-appGold100">
            Copy-Trading Markets stands out as the ultimate platform, delivering
            unmatched value and solutions that redefine the trading experience.
          </p>

          <div className="flex justify-center max-w-4xl gap-8 mt-12">
            <motion.div
              initial={{ opacity: 0, translateX: -70 }}
              whileInView={{ opacity: 1, translateX: 0 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 400,
                damping: 30,
                delay: 0.5,
              }}
              className="text-start border-opacity-45 w-1/2 max-w-2xl p-8 items-center rounded-3xl overflow-hidden bg-appCardGold text-appDarkCard backdrop-blur-md border border-appDarkCard dark:border-appGold200"
            >
              <div>
                <h1 className="font-semibold text-xl mb-4">
                  What Sets Us Apart?
                </h1>
                <ul className="grid gap-2">
                  {advantages.map((item, index) => (
                    <motion.li
                      initial={{ opacity: 0, translateX: -50 }}
                      whileInView={{ opacity: 1, translateX: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="border-b border-appDarkCard border-opacity-25 text-sm pb-2 flex gap-1 items-start"
                      key={index}
                    >
                      <Icon className="mt-[2px]" icon={"charm:tick"} />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, translateX: 70 }}
              whileInView={{ opacity: 1, translateX: 0 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 400,
                damping: 30,
                delay: 0.5,
              }}
              className="text-start border-opacity-45 w-1/2 max-w-2xl p-8 items-center rounded-3xl overflow-hidden backdrop-blur-md border border-appDarkCard dark:border-appGold200"
            >
              <div>
                <h1 className="font-semibold text-xl mb-4">
                  The Pitfalls of Other Platforms
                </h1>
                <ul className="grid gap-2">
                  {disadvantages.map((item, index) => (
                    <motion.li
                      initial={{ opacity: 0, translateX: -50 }}
                      whileInView={{ opacity: 1, translateX: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="border-b border-appGold20 text-sm pb-2 flex gap-1 items-start"
                      key={index}
                    >
                      <Icon className="mt-[2px]" icon={"mingcute:close-line"} />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="my-8">
        <div className="inner w-full flex justify-center">
          <AnimatedLine />
        </div>
      </section>
      <section className="relative py-12">
        <div className="inner grid justify-items-center">
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="border-b border-appDarkCard dark:border-appGold200 backdrop-blur-sm mb-4 rounded-full py-2 px-6 text-xs"
          >
            Testimonials
          </motion.span>
          <h2 className="text-3xl font-semibold mb-4">
            What Our Users Have to Say
          </h2>
          <div
            className={`grid grid-cols-3 gap-4 max-w-4xl overflow-hidden ${
              showAll ? "" : "max-h-[500px]" // Adjust height based on rows
            }`}
          >
            {testimonials
              .slice(0, showAll ? testimonials.length : visibleItems)
              .map((item, index) => (
                <motion.div
                  initial={{ opacity: 0, translateY: -50 }}
                  whileInView={{ opacity: 1, translateY: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  key={index}
                >
                  <Testimonials
                    name={item.name}
                    avatar={item.avatar}
                    role={item.role}
                    content={item.content}
                  />
                </motion.div>
              ))}
          </div>

          {/* View More Button */}
          <button
            className={`mt-4 px-4 py-2 ${
              showAll
                ? "shadow-inner shadow-appGold20 backdrop-blur-md"
                : "text-appDarkCard bg-appCardGold"
            } text-sm font-semibold rounded`}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "View Less" : "View More"}
          </button>
        </div>
      </section>

      <section className="relative py-12 bg-white dark:bg-appDarkGradient">
        <div className="inner grid justify-items-center">
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="border-b border-appDarkCard dark:border-appGold200 backdrop-blur-sm mb-4 rounded-full py-2 px-6 text-xs"
          >
            Get Started
          </motion.span>
          <motion.h2
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-semibold mb-4"
          >
            Trade Smarter with Copy-Trading Markets
          </motion.h2>
          <motion.p
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Your journey to financial success starts here. Ready to make your
            move?
          </motion.p>
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-4 px-4 py-2 text-appDarkCard bg-appCardGold text-sm font-semibold rounded"
          >
            Get Started Today
          </motion.button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
