import { Search } from "lucide-react";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { profilepic } from "@/constants/AppImages";

export function Header() {
  return (
    <header className="flex items-center justify-between border-b px-6 h-24 py-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Welcome Zarror!</h1>
        <p className="text-sm text-muted-foreground">
          Hope you are healthy and happy today...
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="w-64 pl-8" />
        </div>
        <button className="relative h-8 w-8">
          <Image
            src={profilepic}
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
