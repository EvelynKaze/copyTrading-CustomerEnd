// import { Search } from "lucide-react";
import Image from "next/image";
// import { Input } from "@/components/ui/input";
import { profilepic } from "@/constants/AppImages";
import ToggleSidebar from "./toggle-sidebar";
import { Button } from "./ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";


interface HeaderProps {
    user: {
        id: string;
        email: string;
        name: string;
        emailVerification: boolean;
    } | null;
    avatarUrl: string | null // Add optional avatarUrl
}


export function Header({ user, avatarUrl }: HeaderProps){
  return (
    <header className="flex items-center justify-between w-full border-b px-4 md:px-6 h-16 md:h-24 py-4">
      <ToggleSidebar />
      <div className="sm:flex hidden flex-col md:gap-1">
        <h1 className="text-base sm:text-lg md:text-2xl font-semibold">
            Welcome {user?.name || "Guest"}!
        </h1>
        <p className="text-xs sm:text-xs md:text-sm text-muted-foreground">
          Hope you are healthy and happy today...
        </p>
      </div>
      <div className="flex items-center gap-4">
        {/* <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="w-64 pl-8" />
        </div> */}
        <Button className="bg-appCardGold text-appDarkCard">
          <Icon icon={"uil:wallet"} />
          <span>Connect Wallet</span>
        </Button>
        <button className="relative h-8 w-8">
          <Image
            src={avatarUrl || profilepic}
            alt="Profile"
            width={32}
            height={32}
            className=" w-full h-full object-cover rounded-full"
          />
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-green-500 ring-2 ring-white" />
        </button>
      </div>
    </header>
  );
}
