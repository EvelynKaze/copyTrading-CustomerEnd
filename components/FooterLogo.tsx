import { Icon } from "@iconify/react/dist/iconify.js";

const FooterLogo = () => {
  return (
    <div className="flex items-center gap-1">
      <Icon
        className="text-appDark mt-1 text-xl sm:text-4xl"
        icon={"mingcute:currency-baht-line"}
      />
      <p className="text-white font-semibold text-base sm:text-xl">
        CopyTradingMarkets
      </p>
    </div>
  );
};

export default FooterLogo;
