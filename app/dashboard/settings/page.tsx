"use client";

import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsIcon, User } from "lucide-react";
import GeneralSettings from "./general-settings";
import UserProfile from "./user-profile";
// import KYC from "./kyc";


const Settings = () => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container overflow-y-scroll max-w-3xl h-full p-4"
    >
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3 p-2 h-14 mb-8">
          <TabsTrigger
            value="general"
            className="flex items-center p-2 justify-center"
          >
            <SettingsIcon className="w-4 h-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger
            value="profile"
            className="flex items-center p-2 justify-center"
          >
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          {/*<TabsTrigger*/}
          {/*  value="kyc"*/}
          {/*  className="flex items-center p-2 justify-center"*/}
          {/*>*/}
          {/*  <FileCheck className="w-4 h-4 mr-2" />*/}
          {/*  KYC*/}
          {/*</TabsTrigger>*/}
        </TabsList>
        <TabsContent value="general">
          <GeneralSettings />
        </TabsContent>
        <TabsContent value="profile">
          <UserProfile />
        </TabsContent>
        {/*<TabsContent value="kyc">*/}
        {/*  <KYC />*/}
        {/*</TabsContent>*/}
      </Tabs>
    </motion.div>
  );
};

export default Settings;
