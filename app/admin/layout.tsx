// import SideNav from '@/app/ui/dashboard/sidenav';

import { AdminMobileSidebar } from "@/components/admin-mobile-sidebar";
import AdminSidebar from "@/components/admin-sidebar";
import { Header } from "@/components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="hidden md:block">
        <AdminSidebar />
      </div>
      <AdminMobileSidebar />
      <div className="w-full md:flex-grow h-full">
        <Header />
        <div className="h-[calc(100dvh-6rem)] md:p-12">{children}</div>
      </div>
    </div>
  );
}
