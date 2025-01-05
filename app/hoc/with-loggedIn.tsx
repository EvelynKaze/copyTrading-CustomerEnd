"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation"; // Changed from next/router
import { useEffect } from "react";
import { RootState } from "@/store/store";

const withLoggedIn = (
  WrappedComponent: React.ComponentType<{ children?: React.ReactNode }>
) => {
  const WithLoggedIn = (props: { children?: React.ReactNode }) => {
    const { isLoggedIn } = useSelector((state: RootState) => state.user);
    const router = useRouter();

    useEffect(() => {
      if (isLoggedIn == true) {
        console.log(isLoggedIn);
        router.push("/dashboard");
      }
    }, [isLoggedIn, router]);

    if (isLoggedIn == false) {
      return null; // Or display a loading spinner
    }

    return <WrappedComponent {...props} />;
  };

  WithLoggedIn.displayName = `WithLoggedIn(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithLoggedIn;
};

export default withLoggedIn;
