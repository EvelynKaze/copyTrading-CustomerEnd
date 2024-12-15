// import SideNav from '@/app/ui/dashboard/sidenav';

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="">
        <Sidebar />
      </div>
      <div className="flex-grow h-full">
        <Header />
        <div className="p-6 h-[calc(100dvh-6rem)] md:p-12">{children}</div>
      </div>
    </div>
  );
}
