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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Download } from "lucide-react";

// Mock data for audit log entries
const mockAuditLog = [
  {
    id: 1,
    action: "User Login",
    admin: "admin1@example.com",
    timestamp: "2023-06-15T10:30:00Z",
    details: "Successful login",
  },
  {
    id: 2,
    action: "User Suspended",
    admin: "admin2@example.com",
    timestamp: "2023-06-14T15:45:00Z",
    details: "User john_doe suspended for violation of terms",
  },
  {
    id: 3,
    action: "Settings Changed",
    admin: "admin1@example.com",
    timestamp: "2023-06-13T09:20:00Z",
    details: "Updated system email settings",
  },
  {
    id: 4,
    action: "User Deleted",
    admin: "admin3@example.com",
    timestamp: "2023-06-12T14:10:00Z",
    details: "User jane_smith account deleted upon request",
  },
  {
    id: 5,
    action: "Report Generated",
    admin: "admin2@example.com",
    timestamp: "2023-06-11T11:05:00Z",
    details: "Monthly transaction report generated",
  },
];

const AuditLog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAction, setFilterAction] = useState("all");

  const filteredLog = mockAuditLog.filter(
    (entry) =>
      (entry.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.admin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.details.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterAction === "all" || entry.action === filterAction)
  );

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDownload = () => {
    // Implement CSV download logic here
    console.log("Downloading audit log...");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex flex-col md:flex-row justify-between gap-2 md:items-center mb-6">
        <h1 className="text-3xl font-bold">Audit Log</h1>
        <Button onClick={handleDownload} className="bg-appCardGold">
          <Download className="mr-2 h-4 w-4" />
          Download CSV
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Audit Trail</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex items-center flex-1">
              <Search className="w-5 h-5 text-gray-500 mr-2" />
              <Input
                placeholder="Search audit log..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow"
              />
            </div>
            <Select onValueChange={setFilterAction} defaultValue={filterAction}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="User Login">User Login</SelectItem>
                <SelectItem value="User Suspended">User Suspended</SelectItem>
                <SelectItem value="Settings Changed">
                  Settings Changed
                </SelectItem>
                <SelectItem value="User Deleted">User Deleted</SelectItem>
                <SelectItem value="Report Generated">
                  Report Generated
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action</TableHead>
                  <TableHead>Admin</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLog.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">
                      {entry.action}
                    </TableCell>
                    <TableCell>{entry.admin}</TableCell>
                    <TableCell>{formatTimestamp(entry.timestamp)}</TableCell>
                    <TableCell>{entry.details}</TableCell>
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

export default AuditLog;
