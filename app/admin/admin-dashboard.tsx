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
import { Transaction } from "@/app/admin/user-details"

interface User {
  id: string;
  user_name: string;
  user_id: string;
  full_name: string;
  status: boolean;
  isAdmin: boolean;
  lastSeen: string;
  registeredDate: string;
  transactions?: Transaction[];
}

interface AdminDashboardProps {
  onSelectUser: (user: User) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onSelectUser }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
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
          isAdmin: doc.isAdmin,
          status: doc.account_status,
          lastSeen: doc.$updatedAt,
          registeredDate: doc.$createdAt,
        }));

        setUsers(profiles);
      } catch (error) {
        console.error("Error fetching user profiles:", error);
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Full Name</TableHead>
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
                        <TableCell>{user?.full_name}</TableCell>
                        <TableCell>
                          <Badge
                              variant={
                                user.status ? "secondary" : "default"
                              }
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
            </div>
          </CardContent>
        </Card>
      </motion.div>
  );
};

export default AdminDashboard;
