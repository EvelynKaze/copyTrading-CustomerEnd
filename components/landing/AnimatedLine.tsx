import { motion } from "framer-motion";

const AnimatedLine = () => {
  return (
    <div className="relative w-full flex items-center justify-center max-w-xl h-[2px] bg-appGold20">
      <motion.div
        className="rounded-full w-3/4 h-1 shadow-md shadow-appGold100 bg-appGold200"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />
    </div>
  );
};

export default AnimatedLine;
