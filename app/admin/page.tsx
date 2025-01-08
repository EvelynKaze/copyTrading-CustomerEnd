"use client";

import React, { useState } from "react";
import AdminDashboard from "./admin-dashboard";
import UserDetails from "./user-details";
import { databases, Query } from "@/lib/appwrite";
import ENV from "@/constants/env";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  user_name: string;
  user_id: string;
  isAdmin: boolean;
  full_name: string;
  status: boolean;
  lastSeen: string;
  registeredDate: string;
  transactions?: {
    id: string;
    type: string;
    amount: number;
    currency: string;
    date: string;
  }[];
}

const AdminPanel: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { toast } = useToast();
  console.log("user", selectedUser);

  const handleSelectUser = async (user: User) => {
    const userID = user?.user_id;

    try {
      const transactionsResult = await databases.listDocuments(
          ENV.databaseId,
          ENV.collections.transactions,
          [Query.equal("user_id", userID)]
      );

      const transactions = transactionsResult.documents.map((doc) => ({
        id: doc.id,
        type: doc.isDeposit ? "Deposit" : "Withdraw",
        amount: doc.amount,
        currency: doc.token_name,
        date: doc.$createdAt,
      }));

      setSelectedUser({
        ...user,
        transactions,
      });
    } catch (err) {
      const error = err as Error;
      console.error(error);
    }
  };

  const handleSuspendAccount = async (userID: string) => {
    try {
      await databases.updateDocument(
          ENV.databaseId,
          ENV.collections.profile,
          userID,
          { account_status: false } // Assume `status: false` represents a suspended account
      );
      console.log(`User with ID ${userID} has been suspended.`);
      toast({
        title: "Account Suspended",
        description: "Account suspended successfully.",
      })
    } catch (err) {
      const error = err as Error;
      console.error("Error suspending account:", error);
      toast({
        title: "Error suspending account",
        description: `Error: ${error.message}`,
      })
    }
  };

  const handleUnSuspendAccount = async (userID: string) => {
    try {
      await databases.updateDocument(
          ENV.databaseId,
          ENV.collections.profile,
          userID,
          { account_status: true } // Assume `status: false` represents a suspended account
      );
      console.log(`User with ID ${userID} has been suspended.`);
      toast({
        title: "Account Suspended",
        description: "Account suspended successfully.",
      })
    } catch (err) {
      const error = err as Error;
      console.error("Error suspending account:", error);
      toast({
        title: "Error suspending account",
        description: `Error: ${error.message}`,
      })
    }
  };

  const handleDeleteAccount = async (userID: string) => {
    try {
      await databases.deleteDocument(
          ENV.databaseId,
          ENV.collections.profile,
          userID
      );
      console.log(`User with ID ${userID} has been deleted.`);
      setSelectedUser(null); // Reset selected user after deletion
      toast({
        title: "Account deleted",
        description: "Account suspended successfully.",
      })
    } catch (err) {
      const error = err as Error;
      console.error("Error deleting account:", error);
      toast({
        title: "Error deleting account",
        description: `Error: ${error.message}`,
      })
    }
  };

  return (
      <div className="h-full overflow-y-scroll">
        {selectedUser ? (
            <UserDetails
                user={selectedUser}
                onBack={() => setSelectedUser(null)}
                onSuspendAccount={handleSuspendAccount}
                onUnSuspendAccount={handleUnSuspendAccount}
                onDeleteAccount={handleDeleteAccount}
            />
        ) : (
            <AdminDashboard onSelectUser={handleSelectUser} />
        )}
      </div>
  );
};

export default AdminPanel;
