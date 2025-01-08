"use client";

import React, { useState } from "react";
import AdminDashboard from "./admin-dashboard";
import UserDetails from "./user-details";
import { databases, Query } from "@/lib/appwrite";
import ENV from "@/constants/env"

interface User {
  id: string;
  user_name: string;
  user_id: string;
  full_name: string;
  status: boolean;
  lastSeen: string;
  registeredDate: string;
  transactions: {
    id: string;
    type: string;
    amount: number;
    currency: string;
    date: string;
  }[];
}

const AdminPanel: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  console.log("user", selectedUser);



  const handleSelectUser = async (user: User) => {
    const userID = user?.user_id

    try{
      const transactionsResult = await databases.listDocuments(
          ENV.databaseId,
          ENV.collections.transactions,
          [Query.equal("user_id", userID)]
      )

      const transactions = transactionsResult.documents.map((doc) => ({
        id: doc.$id,
        type: doc.isDeposit ? "Deposit" : "Withdraw",
        amount: doc.amount,
        currency: doc.token_name,
        date: doc.$createdAt,
      }));


      setSelectedUser({
        ...user,
        transactions,
      });
    } catch (err){
      const error = err as Error;
      console.error(error);

    }
    // In a real application, you would fetch the full user details here
    // For this example, we'll just add some mock transactions and a registration date

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
