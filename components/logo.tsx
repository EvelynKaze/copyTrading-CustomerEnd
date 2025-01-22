import { Icon } from "@iconify/react/dist/iconify.js";

const Logo = () => {
  return (
    <div className="flex items-center gap-1">
      <Icon
        className="text-appGold200 text-xl md:text-4xl"
        icon={"mingcute:currency-baht-line"}
      />
      <p className="text-appDarkCard dark:text-white font-semibold text-base md:text-xl">
        CopyTradingMarkets
      </p>
    </div>
  );
};

export default Logo;
