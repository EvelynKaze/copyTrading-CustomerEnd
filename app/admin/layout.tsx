"use client";
import { AdminMobileSidebar } from "@/components/admin-mobile-sidebar";
import AdminSidebar from "@/components/admin-sidebar";
import { Header } from "@/components/header";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import withAdmin from "../hoc/with-admin";

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const profile = useSelector((state: RootState) => state.profile.profile); // Access profile data
  const avatarUrl = profile?.avatar_url || null; // Get avatar_url or set null
  const userName = profile?.user_name || null;
  const router = useRouter();

  // Redirect to login page if user is not authenticated
  useEffect(() => {
    console.log(user);
    if (user === null) {
      router.push("/login");
    }
  }, [user, router]);

  // If user is null, temporarily render nothing (to prevent UI flicker)
  if (user === null) {
    return null; // Avoid rendering the layout until redirection happens
  }

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="hidden md:block">
        <AdminSidebar />
      </div>
      <AdminMobileSidebar />
      <div className="w-full md:flex-grow h-full">
        <Header userName={userName} avatarUrl={avatarUrl} /> {/* Pass avatarUrl */}
        <div className="h-[calc(100dvh-6rem)] md:p-12">{children}</div>
      </div>
    </div>
  );
};

export default withAdmin(Layout);
