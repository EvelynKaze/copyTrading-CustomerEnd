import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const KYC = () => {
  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Know Your Customer (KYC)</CardTitle>
          <CardDescription>
            Verify your identity to unlock full account features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="id-type">ID Type</Label>
            <Select>
              <SelectTrigger id="id-type">
                <SelectValue placeholder="Select ID Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="passport">Passport</SelectItem>
                <SelectItem value="drivers-license">
                  Driver&#39;s License
                </SelectItem>
                <SelectItem value="national-id">National ID</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="id-number">ID Number</Label>
            <Input id="id-number" placeholder="Enter your ID number" />
          </div>
          <div>
            <Label htmlFor="id-expiry">ID Expiry Date</Label>
            <Input id="id-expiry" type="date" />
          </div>
          <div>
            <Label htmlFor="id-front">Upload ID Front</Label>
            <Input id="id-front" type="file" accept="image/*" />
          </div>
          <div>
            <Label htmlFor="id-back">Upload ID Back</Label>
            <Input id="id-back" type="file" accept="image/*" />
          </div>
          <div>
            <Label htmlFor="selfie">Upload Selfie</Label>
            <Input id="selfie" type="file" accept="image/*" />
          </div>
        </CardContent>
      </Card>

      <Button className="w-full bg-appCardGold text-appDarkCard">
        Submit KYC Information
      </Button>
    </>
  );
};

export default KYC;
