"use client";
import React, { useState } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { storage, databases, ID } from "@/lib/appwrite";
import { useDispatch } from "react-redux";
import { setProfile } from "@/store/profileSlice";
import { useRouter } from "next/navigation";
import ENV from "@/constants/env";
import { useProfile } from "@/app/context/ProfileContext";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const UserProfile = () => {
  const { profile } = useProfile();
  const user = useSelector((state: RootState) => state.user.user);

  const dispatch = useDispatch();
  const router = useRouter();
  const { toast } = useToast();

  console.log("Profile Info in Settings", profile)

  const [formData, setFormData] = useState({
    fullName: profile?.full_name || "",
    phoneNumber: profile?.phone_number || "",
    username: profile?.user_name || "",
  });

  const [avatar, setAvatar] = useState(profile?.avatar_url || "");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModified, setIsModified] = useState(false);

  // Handle Input Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setIsModified(true);
  };

  // Handle Image Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
      setIsModified(true);
    }
  };

  // Handle Profile Update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = avatar;

      // Upload new avatar if selected
      if (profilePicture) {
        const avatarUpload = await storage.createFile(
            ENV.buckets.profile,
            ID.unique(),
            profilePicture
        );

        const bucketId = ENV.buckets.profile;
        const projectId = ENV.projectId;
        imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${avatarUpload.$id}/view?project=${projectId}`;
      }

      // Prepare updated profile data
      const profileData = {
        user_id: user?.id,
        full_name: formData.fullName,
        phone_number: formData.phoneNumber,
        user_name: formData.username,
        avatar_url: imageUrl,
        email_address: user?.email,
        copy_trade_plan: null,
        account_status: true,
        total_investment: null,
        current_value: null,
        roi: null,
        kyc_status: false,
        isAdmin: false,
      };

      console.log("Profile Info in Settings Submit:", profileData);

      // Update profile document in Appwrite
      if (!profile?.id) {
        throw new Error("Profile is null");
      }

      const updatedProfile = await databases.updateDocument(
          ENV.databaseId,
          ENV.collections.profile,
          profile.id,
          profileData
      );

      // Update Redux state
      dispatch(setProfile({ ...profileData, id: updatedProfile.$id }));

      toast({
        title: "Profile Updated Successfully!",
        description: "Your profile information has been saved.",
      });
      setIsModified(false);
      router.refresh();
    } catch (err) {
      const error = err as Error;
      console.error("Error updating profile:", error);
      toast({
        title: "Profile Update Failed",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={avatar} alt="User Avatar" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
              <div>
                <Label htmlFor="avatar">Change Avatar</Label>
                <Input id="avatar" type="file" accept="image/*" onChange={handleImageUpload} />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="John Doe" required />
                </div>
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" value={formData.username} onChange={handleInputChange} placeholder="johndoe" required />
                </div>
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input id="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleInputChange} required />
              </div>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full bg-appCardGold text-appDarkCard" disabled={!isModified || isLoading}>
          {isLoading ? "Saving..." : "Save Profile"}
        </Button>
      </form>
  );
};

export default UserProfile;
