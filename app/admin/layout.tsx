"use client";
import { AdminMobileSidebar } from "@/components/admin-mobile-sidebar";
import AdminSidebar from "@/components/admin-sidebar";
import { Header } from "@/components/header";
import withAuth from "../hoc/with-auth";

const Layout = ({ children }: { children?: React.ReactNode }) => {
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
};

export default withAuth(Layout);
