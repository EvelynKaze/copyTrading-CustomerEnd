import { Icon } from "@iconify/react/dist/iconify.js";

const DashLogo = () => {
  return (
    <div className="flex items-center gap-1">
      <Icon
        className="text-appGold200 text-xl md:text-4xl"
        icon={"mingcute:currency-baht-line"}
      />
    </div>
  );
};

export default DashLogo;
