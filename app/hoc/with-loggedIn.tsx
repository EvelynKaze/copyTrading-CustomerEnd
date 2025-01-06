"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation"; // Changed from next/router
import { useEffect } from "react";
import { RootState } from "@/store/store";

const withLoggedIn = (
  WrappedComponent: React.ComponentType<{ children?: React.ReactNode }>
) => {
  const WithLoggedIn = (props: { children?: React.ReactNode }) => {
    const { profile } = useSelector((state: RootState) => state.profile);
    const { isLoggedIn } = useSelector((state: RootState) => state.user);
    const router = useRouter();

    useEffect(() => {
      if (isLoggedIn == true) {
        console.log(isLoggedIn);
        router.push(profile.isAdmin ? "/admin" : "/dashboard");
      }
    }, [isLoggedIn, router]);

    return <WrappedComponent {...props} />;
  };

  WithLoggedIn.displayName = `WithLoggedIn(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithLoggedIn;
};

export default withLoggedIn;
