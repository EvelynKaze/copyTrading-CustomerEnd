import React, { createContext, useContext } from "react";

interface Profile {
    id: null;
    full_name: string;
    phone_number: string;
    user_name: string;
    avatar_url: string;
    copy_trader: null;
    account_status: null;
    total_investment: null;
    current_value: null;
    roi: null;
    kyc_status: boolean;
    isAdmin: boolean;
    user_id: string;
}

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
