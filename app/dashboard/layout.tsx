"use client";
import { Header } from "@/components/header";
import { MobileSidebar } from "@/components/mobile-sidebar";
import Sidebar from "@/components/sidebar";
import withAuth from "@/app/hoc/with-auth";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store"

const Layout = ({ children }: { children?: React.ReactNode }) => {
    const user = useSelector((state: RootState) => state.user.user)
     console.log("Userrrr", user)
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <MobileSidebar />
      <div className="w-full md:flex-grow h-full">
        <Header user={user} />
        <div className="h-[calc(100dvh-6rem)] p-4 md:p-12">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
