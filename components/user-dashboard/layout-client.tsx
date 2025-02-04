"use client";

import "../../../copyTrading-CustomerEnd/app/globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { Header } from "@/components/header";
import { MobileSidebar } from "@/components/mobile-sidebar";
import Sidebar from "@/components/sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import withAuth from "@/app/hoc/with-auth";
import { ProfileProvider } from "@/app/context/ProfileContext";
import ContexProvider from "@/app/context/index";

const LayoutClient = ({ children, cookies }: { children?: React.ReactNode; cookies: string }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const profile = useSelector((state: RootState) => state.profile.profile);
  const avatarUrl = profile?.avatar_url || null;
  const accountTrade = profile?.copy_trade_plan || null;
  const userName = profile?.user_name || null;
  const router = useRouter();

  // Redirect to login page if user is not authenticated
//   useEffect(() => {
//     if (user === null) {
//       router.push("/login");
//     }
//   }, [user, router]);

//   if (user === null) {
//     return null;
//   }


  return (
    <ContexProvider cookies={cookies}>
      <ProfileProvider profile={profile}>
        <div className="flex font-poppins h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="hidden lg:block">
            <Sidebar />
          </div>
          <MobileSidebar />
          <div className="w-full md:flex-grow h-full">
            <Header userName={userName} avatarUrl={avatarUrl} accountTrader={accountTrade} />
            <div className="lg:h-[calc(100dvh-6rem)] p-4 md:p-12">{children}</div>
          </div>
        </div>
      </ProfileProvider>
    </ContexProvider>
  );
};

export default LayoutClient;
