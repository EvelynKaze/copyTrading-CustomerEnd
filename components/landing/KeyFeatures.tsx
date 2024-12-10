import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";

const KeyFeatures = () => {
  return (
    <div className="max-w-4xl grid justify-items-center">
      <h2 className="text-xl sm:text-3xl mb-8">
        Everything You Need to Maximize Profits
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="p-4 text-center grid justify-items-center shadow inset-2 shadow-appGold20 backdrop-blur-lg gap-2 border-b border-appGold20 border-opacity-20"
        >
          <Icon
            className="text-4xl bg-appCardGold rounded text-appDarkCard p-2"
            icon={"mdi:chart-line"}
          />
          <h5>Year-Round Performance</h5>
          <p>
            Achieve consistent success in both rising and falling markets,
            ensuring long-term growth.
          </p>
        </motion.div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="p-4 text-center grid justify-items-center shadow inset-2 shadow-appGold20 backdrop-blur-lg gap-2 border-b border-x border-appGold20 border-opacity-20"
        >
          <Icon
            className="text-4xl bg-appCardGold rounded text-appDarkCard p-2"
            icon={"mdi:clock-check-outline"}
          />
          <h5>Dependable Results</h5>
          <p>
            Our strategies prioritize sustainable profits because patience paves
            the way to success.
          </p>
        </motion.div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="p-4 text-center grid justify-items-center shadow inset-2 shadow-appGold20 backdrop-blur-lg gap-2 border-b border-appGold20 border-opacity-20"
        >
          <Icon
            className="text-4xl bg-appCardGold rounded text-appDarkCard p-2"
            icon={"mdi:cog-sync-outline"}
          />
          <h5>Continuous Innovation</h5>
          <p>
            Our team consistently enhances algorithms to deliver top-tier
            trading performance.
          </p>
        </motion.div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="p-4 text-center grid justify-items-center shadow-inner shadow-appGold20 backdrop-blur-lg gap-2"
        >
          <Icon
            className="text-4xl bg-appCardGold rounded text-appDarkCard p-2"
            icon={"mdi:monitor-dashboard"}
          />
          <h5>Comprehensive Portfolio Tracking</h5>
          <p>
            Manage all your investments in one place, across multiple exchanges,
            for a seamless experience.
          </p>
        </motion.div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="p-4 text-center grid justify-items-center shadow-inner shadow-appGold20 backdrop-blur-lg gap-2 border-x border-appGold20 border-opacity-20"
        >
          <Icon
            className="text-4xl bg-appCardGold rounded text-appDarkCard p-2"
            icon={"mdi:shield-lock-outline"}
          />
          <h5>Top-Tier Security</h5>
          <p>
            Your funds stay protected with trusted third-party exchanges — we
            never hold your assets.
          </p>
        </motion.div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="p-4 text-center grid justify-items-center shadow-inner shadow-appGold20 backdrop-blur-lg gap-2"
        >
          <Icon
            className="text-4xl bg-appCardGold rounded text-appDarkCard p-2"
            icon={"mdi:account-supervisor-circle-outline"}
          />
          <h5>Dedicated Support</h5>
          <p>
            Quick and personalized assistance to ensure your trading journey is
            smooth and successful.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default KeyFeatures;
