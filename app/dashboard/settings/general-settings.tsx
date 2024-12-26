import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Bell, Moon, Sun, Globe } from "lucide-react";

const GeneralSettings = () => {
  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Manage your notification preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <Label htmlFor="push-notifications">Push Notifications</Label>
            </div>
            <Switch
              className="data-[state=checked]:bg-appCardGold"
              id="push-notifications"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <Label htmlFor="email-notifications">Email Notifications</Label>
            </div>
            <Switch
              className="data-[state=checked]:bg-appCardGold"
              id="email-notifications"
            />
          </div>
        </CardContent>
      </Card>

      {/* <Card className="mb-6">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize your app experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sun className="h-5 w-5" />
              <Label htmlFor="dark-mode">Dark Mode</Label>
            </div>
            <Switch
              className="data-[state=checked]:bg-appCardGold"
              id="dark-mode"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <Label htmlFor="language">Language</Label>
            <Select>
              <SelectTrigger id="language">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card> */}

      <Button className="w-full bg-appCardGold text-appDarkCard">
        Save General Settings
      </Button>
    </>
  );
};

export default GeneralSettings;
