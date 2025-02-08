/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { databases } from "@/lib/appwrite";
import ENV from "@/constants/env";
import { Skeleton } from "@/components/ui/skeleton";
import User from "@/app/admin/user-details";
import type { Transaction } from "@/types";

interface User {
  id: string;
  user_name: string;
  user_id: string;
  full_name: string;
  email_address: string;
  status: boolean;
  isAdmin: boolean;
  lastSeen: string;
  registeredDate: string;
  transactions?: Transaction[];
  roi: number;
  current_value: number;
  total_investment: number;
}

interface AdminDashboardProps {

  onSelectUser: (user: User) => Promise<void>;

}
export const TableSkeleton = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>
          <Skeleton className="h-4 w-20" />
        </TableHead>
        <TableHead>
          <Skeleton className="h-4 w-20" />
        </TableHead>
        <TableHead>
          <Skeleton className="h-4 w-20" />
        </TableHead>
        <TableHead>
          <Skeleton className="h-4 w-20" />
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {[...Array(5)].map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-4 w-24" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-16" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-12" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-28" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
const AdminDashboard: React.FC<AdminDashboardProps> = ({ onSelectUser }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await databases.listDocuments(
          ENV.databaseId,
          ENV.collections.profile
        );

        const profiles = response.documents.map((doc) => ({
          id: doc.$id,
          user_name: doc.user_name,
          user_id: doc.user_id,
          full_name: doc.full_name,
          email_address: doc.email_address,
          isAdmin: doc.isAdmin,
          status: doc.account_status,
          lastSeen: doc.$updatedAt,
          registeredDate: doc.$createdAt,
          roi: doc.roi,
          current_value: doc.current_value,
          total_investment: doc.total_investment,
        }));

        setUsers(profiles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profiles:", error);
        setLoading(false);
      }
    };

    fetchUsers();
    console.log("fetchUsers()", users);
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatLastSeen = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto h-full overflow-y-scroll p-4"
    >
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="w-5 h-5 text-gray-500" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
          </div>
          <div className="overflow-x-auto">
            {loading ? (
              <TableSkeleton />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Seen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow
                      key={user?.id}
                      className="cursor-pointer hover:bg-appGold20"
                      onClick={() => onSelectUser(user)}
                    >
                      <TableCell className="font-medium">
                        {user?.user_name}
                      </TableCell>
                      {/* <TableCell>{user?.full_name}</TableCell> */}
                      <TableCell>
                        <Badge
                          variant={user.status ? "secondary" : "default"}
                          className={`w-full flex justify-center max-w-28 text-white ${
                            user.status
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-red-600 hover:bg-red-700"
                          }`}
                        >
                          {user.status ? "Active" : "Suspended"}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatLastSeen(user.lastSeen)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminDashboard;
