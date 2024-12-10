import { BarChart } from "lucide-react";
import { motion } from "framer-motion";

export function LetItWorkMiniUI() {
  return (
    <div className="backdrop-blur-md relative shadow-inner border border-appDarkCard dark:border-appGold20 shadow-appGold20 transition-all duration-300 ease-in-out hover:border-appGold100 hover:shadow-appGold100 p-6 rounded-lg max-w-sm mx-auto">
      <p className="absolute z-0 top-0 right-4 font-black text-9xl blur-sm opacity-25">
        3
      </p>
      <div className="flex items-center justify-center w-12 h-12 bg-appDarkCard rounded-full mb-4">
        <BarChart className="w-6 h-6 text-appGold200" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Let It Work</h3>
      <p className="text-sm dark:text-appGold100 mb-4">
        Sit back and watch your portfolio grow.
      </p>
      <div className="bg-appDarkCard p-4 rounded-md">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-appGold200">
            Portfolio Value
          </span>
          <span className="text-sm font-bold text-appGold200">$10,245.67</span>
        </div>
        <div className="w-full text-appGold200 dark:text-appGold20 overflow-hidden rounded-full h-2.5">
          <motion.div
            initial={{ translateX: -100 }}
            whileInView={{ translateX: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-appGold200 h-2.5 rounded-full"
            style={{ width: "70%" }}
          ></motion.div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-appGold200 dark:text-appGold20">
            Last Month
          </span>
          <span className="text-xs text-appGold200 dark:text-appGold20">
            This Month
          </span>
        </div>
      </div>
    </div>
  );
}
