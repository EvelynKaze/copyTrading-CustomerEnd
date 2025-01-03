"use client";
import { useEffect } from "react";
import { useAppDispatch } from "../store/hook";
import { account } from "../lib/appwrite"; // Your Appwrite SDK instance
import { clearUser, setUser } from "../store/userSlice";

const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const syncUserState = async () => {
      try {
        const session = await account.getSession("current");
        if (session) {
          const userData = await account.get();
          dispatch(
            setUser({
              id: userData.$id,
              email: userData.email,
              name: userData.name,
              emailVerification: userData.emailVerification,
            })
          );
        } else {
          dispatch(clearUser());
        }
      } catch (error) {
        console.error("Failed to sync user state:", error);
        dispatch(clearUser());
      }
    };

    syncUserState();
  }, [dispatch]);

  return <>{children}</>;
};

export default AppInitializer;
