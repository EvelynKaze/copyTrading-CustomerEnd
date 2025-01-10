import { Icon } from "@iconify/react/dist/iconify.js";
// import Logo from "./logo";
import { ClipLoader } from "react-spinners";

export default function LoadingScreen() {
  return (
    <div className="h-screen bg-white dark:bg-appDark w-full flex justify-center items-center">
      <div className="flex relative flex-col items-center space-y-4">
        <ClipLoader className="relative" size={150} color="#EAB855" />
        <Icon
          className="text-appGold600 absolute top-0 left-0 text-4xl md:text-6xl z-30"
          icon={"mingcute:currency-baht-line"}
        />
      </div>
    </div>
  );
}
