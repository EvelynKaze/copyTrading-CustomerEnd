import { Icon } from "@iconify/react/dist/iconify.js";

const FooterLogo = () => {
  return (
    <div className="flex items-center gap-1">
      <Icon
        className="text-appDark text-4xl"
        icon={"mingcute:currency-baht-line"}
      />
      <p className="text-white font-semibold text-xl">Copy-Trades Markert</p>
    </div>
  );
};

export default FooterLogo;
