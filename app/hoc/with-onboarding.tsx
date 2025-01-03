"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RootState } from "@/store/store";

const withOnboarding = (
  WrappedComponent: React.ComponentType<{ children?: React.ReactNode }>
) => {
  const WithOnboarding = (props: { children?: React.ReactNode }) => {
    const { user, isLoggedIn } = useSelector((state: RootState) => state.user);
    const profile = useSelector((state: RootState) => state.profile.profile);

    const router = useRouter();

    useEffect(() => {
      console.log("isLoggedIn", isLoggedIn);
      console.log("profile", profile);
      if (!isLoggedIn) {
        router.push("/login"); // Redirect to login if not logged in
      } else if (isLoggedIn && profile) {
        router.push("/dashboard"); // Redirect to dashboard if profile exists
      }
    }, [isLoggedIn, profile, router]);

    // Show loading spinner or null while redirecting
    if (!user || !isLoggedIn || profile) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  WithOnboarding.displayName = `WithOnboarding(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithOnboarding;
};

export default withOnboarding;
