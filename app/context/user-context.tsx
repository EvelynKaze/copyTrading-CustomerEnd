"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { account } from "@/lib/appwrite";

interface User {
  // Define the properties of the User object based on the structure returned by account.get()
  id: string;
  email: string;
  name: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await account.get();
        const user: User = {
          id: fetchedUser.$id,
          email: fetchedUser.email,
          name: fetchedUser.name,
        };
        setUser(user);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  

  const logout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
