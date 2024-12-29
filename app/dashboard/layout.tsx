// import SideNav from '@/app/ui/dashboard/sidenav';

import { Header } from "@/components/header";
import { MobileSidebar } from "@/components/mobile-sidebar";
import Sidebar from "@/components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <MobileSidebar />
      <div className="w-full md:flex-grow h-full">
        <Header />
        <div className="h-[calc(100dvh-6rem)] p-4 md:p-12">{children}</div>
      </div>
    </div>
  );
}
