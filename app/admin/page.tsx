"use client";

import React, { useState } from "react";
import AdminDashboard from "./admin-dashboard";
import UserDetails from "./user-details";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

interface User {
  id: number;
  username: string;
  email: string;
  status: "online" | "offline";
  lastSeen: string;
  registeredDate: string;
  transactions: {
    id: number;
    type: string;
    amount: number;
    currency: string;
    date: string;
  }[];
}

const AdminPanel: React.FC = () => {
  const userState = useSelector((state: RootState) => state.user.isLoggedIn);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  console.log("user", userState);

  const handleSelectUser = (user: User) => {
    // In a real application, you would fetch the full user details here
    // For this example, we'll just add some mock transactions and a registration date
    setSelectedUser({
      ...user,
      registeredDate: "2023-01-01T09:00:00Z",
      transactions: [
        {
          id: 1,
          type: "Deposit",
          amount: 1000,
          currency: "USD",
          date: "2023-06-10T14:30:00Z",
        },
        {
          id: 2,
          type: "Withdrawal",
          amount: 500,
          currency: "USD",
          date: "2023-06-12T11:45:00Z",
        },
        {
          id: 3,
          type: "Deposit",
          amount: 2000,
          currency: "USD",
          date: "2023-06-14T09:15:00Z",
        },
      ],
    });
  };

  return (
    <div className="h-full overflow-y-scroll">
      {selectedUser ? (
        <UserDetails user={selectedUser} onBack={() => setSelectedUser(null)} />
      ) : (
        <AdminDashboard onSelectUser={handleSelectUser} />
      )}
    </div>
  );
};

export default AdminPanel;
