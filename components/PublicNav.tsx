import Logo from "@/components/logo";
import ThemeToggle from "@/components/toggleTheme";
import { toggleNav } from "@/store/navSlice";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useDispatch } from "react-redux";

const PublicNav = () => {
  const dispatch = useDispatch();
  return (
    <nav className="fixed z-40 backdrop-blur-md dark:bg-appDarkGradient w-full flex justify-between items-center h-24 border-b sm:px-8 px-4 py-2">
      <div className="flex items-center gap-4">
        <div className="border-r">
          <Logo />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden md:flex gap-1">
          <Link
            className="px-4 py-1 text-sm rounded bg-appCardGold text-appDarkCard"
            href={"/login"}
          >
            Log in
          </Link>
          <Link
            className="px-4 py-1 text-sm rounded border border-appGold200"
            href={"/signup"}
          >
            Sign in
          </Link>
        </div>
        <button
          onClick={() => dispatch(toggleNav())}
          className="bg-appCardGold md:hidden rounded p-2 text-lg text-appDarkCard"
        >
          <Icon icon={"quill:hamburger"} />
        </button>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default PublicNav;
