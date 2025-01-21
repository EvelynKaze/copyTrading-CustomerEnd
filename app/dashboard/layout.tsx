"use client";
import "./../globals.css";
import { Header } from "@/components/header";
import { MobileSidebar } from "@/components/mobile-sidebar";
import Sidebar from "@/components/sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import withAuth from "../hoc/with-auth";
import { ProfileProvider } from "../context/ProfileContext";

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const profile = useSelector((state: RootState) => state.profile.profile); // Access profile data
  const avatarUrl = profile?.avatar_url || null; // Get avatar_url or set null
  const accountTrader = profile?.copy_trader || null;
  const userName = profile?.user_name || null;
  const router = useRouter();

  // Redirect to login page if user is not authenticated
  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [user, router]);

  // If user is null, temporarily render nothing (to prevent UI flicker)
  if (user === null) {
    return null; // Avoid rendering the layout until redirection happens
  }

  return (
   <ProfileProvider profile={profile}>
    <div className="flex font-poppins h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <MobileSidebar />
      <div className="w-full md:flex-grow h-full">
        <Header userName={userName} avatarUrl={avatarUrl} accountTrader={accountTrader} /> {/* Pass avatarUrl */}
        <div className="lg:h-[calc(100dvh-6rem)] p-4 md:p-12">{children}</div>
      </div>
    </div>
   </ProfileProvider>
  );
};

export default withAuth(Layout);
