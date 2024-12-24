"use client";

import React, { useState } from "react";
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

interface User {
  id: number;
  username: string;
  email: string;
  status: "online" | "offline";
  lastSeen: string;
}

interface AdminDashboardProps {
  onSelectUser: (user: User) => void;
}

// Mock data for users
const mockUsers: User[] = [
  {
    id: 1,
    username: "john_doe",
    email: "john@example.com",
    status: "online",
    lastSeen: "2023-06-15T10:30:00Z",
  },
  {
    id: 2,
    username: "jane_smith",
    email: "jane@example.com",
    status: "offline",
    lastSeen: "2023-06-14T18:45:00Z",
  },
  {
    id: 3,
    username: "bob_johnson",
    email: "bob@example.com",
    status: "online",
    lastSeen: "2023-06-15T11:15:00Z",
  },
  {
    id: 4,
    username: "alice_williams",
    email: "alice@example.com",
    status: "offline",
    lastSeen: "2023-06-13T09:20:00Z",
  },
  {
    id: 5,
    username: "charlie_brown",
    email: "charlie@example.com",
    status: "online",
    lastSeen: "2023-06-15T10:55:00Z",
  },
];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onSelectUser }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
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
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Seen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    className="cursor-pointer hover:bg-appGold20"
                    onClick={() => onSelectUser(user)}
                  >
                    <TableCell className="font-medium">
                      {user.username}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.status === "online" ? "secondary" : "default"
                        }
                        className={
                          user.status === "online"
                            ? "bg-green-500 hover:bg-green-600"
                            : ""
                        }
                      >
                        {user.status}
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
