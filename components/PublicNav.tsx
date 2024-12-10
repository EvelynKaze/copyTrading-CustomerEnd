import Logo from "@/components/logo";
import ThemeToggle from "@/components/toggleTheme";
import Link from "next/link";

const PublicNav = () => {
  return (
    <nav className="fixed z-40 backdrop-blur-md dark:bg-appDarkGradient w-full flex justify-between items-center h-24 border-b  px-8 py-2">
      <div className="flex items-center gap-4">
        <div className="border-r pr-4">
          <Logo />
        </div>
        <div className="text-base flex gap-4 items-center">
          <p>Solutions</p>
          <p>Company</p>
          <p>Resources</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          <Link
            className="px-4 py-1 text-sm rounded bg-appCardGold text-appDarkCard"
            href={"/login"}
          >
            Log in
          </Link>
          <Link
            className="px-4 py-1 text-sm rounded border border-appGold200"
            href={"/signin"}
          >
            Sign in
          </Link>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default PublicNav;
