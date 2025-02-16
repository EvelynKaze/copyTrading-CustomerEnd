import React, { createContext, useContext } from "react";
import { Profile } from "@/types";

interface ProfileContextProps {
    profile: Profile | null;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);

export const useProfile = (): ProfileContextProps => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error("useProfile must be used within a ProfileProvider");
    }
    return context;
};

export const ProfileProvider: React.FC<{ profile: Profile | null; children: React.ReactNode }> = ({ profile, children }) => {
    return (
        <ProfileContext.Provider value={{ profile }}>
            {children}
        </ProfileContext.Provider>
    );
};
