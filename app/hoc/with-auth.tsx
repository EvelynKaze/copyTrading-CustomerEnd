"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation"; // Changed from next/router
import { useEffect } from "react";
import { RootState } from "@/store/store";


const withAuth = (WrappedComponent: React.ComponentType<{ children?: React.ReactNode; cookies: string }>) => {

  const WithAuth = (props: { children?: React.ReactNode }) => {
    const { isLoggedIn } = useSelector((state: RootState) => state.user);
    const { profile } = useSelector((state: RootState) => state.profile);
    const router = useRouter();

    useEffect(() => {
      if (isLoggedIn == false) {
        console.log(isLoggedIn);
        router.push("/login");
      }
    }, [isLoggedIn, router]);

    if (profile?.isAdmin) {
      router.push("/admin");
    }

    if (isLoggedIn == false) {
      return null; // Or display a loading spinner
    }

    return <WrappedComponent {...props} cookies="" />;
  };

  WithAuth.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithAuth;
};

export default withAuth;
