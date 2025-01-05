"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation"; // Changed from next/router
import { useEffect } from "react";
import { RootState } from "@/store/store";

const withAdmin = (
  WrappedComponent: React.ComponentType<{ children?: React.ReactNode }>
) => {
  const WithAdmin = (props: { children?: React.ReactNode }) => {
    const { isLoggedIn } = useSelector((state: RootState) => state.user);
    const { profile } = useSelector((state: RootState) => state.profile);
    const router = useRouter();

    useEffect(() => {
      if (isLoggedIn == false || profile?.isAdmin !== true) {
        console.log(isLoggedIn, profile?.isAdmin);
        router.push("/login");
      }
    }, [isLoggedIn, router, profile]);

    if (isLoggedIn == false) {
      return null; // Or display a loading spinner
    }

    return <WrappedComponent {...props} />;
  };

  WithAdmin.displayName = `WithAdmin(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithAdmin;
};

export default withAdmin;
