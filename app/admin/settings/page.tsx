"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminSettings = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container overflow-y-scroll max-w-3xl h-full p-4"
    >
      <h1 className="text-3xl font-bold mb-6">Admin Settings</h1>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3 p-0 h-14 mb-8">
          <TabsTrigger className="p-2 h-full" value="general">
            General
          </TabsTrigger>
          <TabsTrigger className="p-2 h-full" value="security">
            Security
          </TabsTrigger>
          <TabsTrigger className="p-2 h-full" value="notifications">
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage your admin account settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="admin-name">Admin Name</Label>
                  <Input id="admin-name" placeholder="John Doe" />
                </div>
                <div>
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Select>
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select Timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="est">Eastern Time</SelectItem>
                    <SelectItem value="pst">Pacific Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="bg-appCardGold text-appDarkCard">
                Save General Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              {/* <div className="flex items-center space-x-2">
                <Switch
                  className="data-[state=checked]:bg-appCardGold"
                  id="two-factor"
                />
                <Label htmlFor="two-factor">
                  Enable Two-Factor Authentication
                </Label>
              </div> */}
              <Button className="bg-appCardGold text-appDarkCard">
                Update Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              {/* <CardDescription>
                Manage your notification preferences
              </CardDescription> */}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  className="data-[state=checked]:bg-appCardGold"
                  id="email-notifications"
                />
                <Label htmlFor="email-notifications">Email Notifications</Label>
              </div>
              {/* <div className="flex items-center space-x-2">
                <Switch
                  className="data-[state=checked]:bg-appCardGold"
                  id="sms-notifications"
                />
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  className="data-[state=checked]:bg-appCardGold"
                  id="push-notifications"
                />
                <Label htmlFor="push-notifications">Push Notifications</Label>
              </div> */}
              <Button className="bg-appCardGold text-appDarkCard">Save</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default AdminSettings;
