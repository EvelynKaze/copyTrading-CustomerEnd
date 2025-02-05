import Image from "next/image";
import Link from "next/link"
import { profilepic } from "@/constants/AppImages";
import ToggleSidebar from "./toggle-sidebar";
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface HeaderProps {
    userName: string | null;
    avatarUrl: string | null // Add optional avatarUrl
    accountTrader?: string | null
}


export function Header({ userName, avatarUrl }: HeaderProps){
    const { isConnected } = useAccount();

  return (
    <header className="flex items-center justify-between w-full border-b px-4 md:px-6 h-16 md:h-24 py-4">
      <ToggleSidebar />
      <div className="sm:flex hidden flex-col md:gap-1">
        <h1 className="text-base sm:text-lg md:text-2xl font-semibold">
            Welcome {userName || "Guest"}!
        </h1>
        <p className="text-xs sm:text-xs md:text-sm text-muted-foreground">
            {isConnected ? "Connected" : "Not Connected"}
        </p>
      </div>
      <div className="flex items-center gap-4">

        <ConnectButton />

        <button className="relative h-8 w-8">
          <Link href={"/dashboard/settings"}>
            <Image
              src={avatarUrl || profilepic}
              alt="Profile"
              width={32}
              height={32}
              className=" w-full h-full object-cover rounded-full"
            />
          </Link>
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-green-500 ring-2 ring-white" />
        </button>
      </div>
    </header>
  );
}
