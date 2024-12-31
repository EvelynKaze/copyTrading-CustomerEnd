"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation"; // Changed from next/router
import { useEffect } from "react";
import { RootState } from "@/store/store";

const withAuth = (
  WrappedComponent: React.ComponentType<{ children?: React.ReactNode }>
) => {
  const WithAuth = (props: { children?: React.ReactNode }) => {
    const { isLoggedIn } = useSelector((state: RootState) => state.user);
    const router = useRouter();

    useEffect(() => {
      if (!isLoggedIn) {
        router.push("/login");
      }
    }, [isLoggedIn, router]);

    if (!isLoggedIn) {
      return null; // Or display a loading spinner
    }

    return <WrappedComponent {...props} />;
  };

  WithAuth.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithAuth;
};

export default withAuth;
