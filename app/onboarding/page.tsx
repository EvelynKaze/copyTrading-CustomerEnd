// Updates to onboarding/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  storage,
  databases,
  ID,
  Permission,
  Role,
} from "@/lib/appwrite";
import { useToast } from "@/hooks/use-toast";
import { setProfile } from "@/store/profileSlice";
import withOnboarding from "../hoc/with-onboarding";
import { useAppDispatch } from "@/store/hook";
import ENV from "@/constants/env"


const OnboardingPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    username: "",
  });
  const [avatar, setAvatar] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const user = useSelector((state: RootState) => state.user.user);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  console.log("user", isLoggedIn);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!profilePicture) {
      toast({
        description: "Please upload a profile picture",
      });
      setIsLoading(false);
      return;
    }

    try {
      const avatarUpload = await storage.createFile(
        ENV.buckets.profile,
        ID.unique(),
        profilePicture
      );

      const bucketId = ENV.buckets.profile;
      const projectId = ENV.projectId;
      const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${avatarUpload.$id}/view?project=${projectId}`;

      const profileData = {
        user_id: user?.id,
        full_name: formData.fullName,
        phone_number: formData.phoneNumber,
        user_name: formData.username,
        avatar_url: imageUrl,
        copy_trader: null,
        account_status: true,
        total_investment: null,
        current_value: null,
        roi: null,
        kyc_status: false,
        isAdmin: false,
      };

      const profile = await databases.createDocument(
        ENV.databaseId,
        ENV.collections.profile,
        ID.unique(),
        profileData,
        [Permission.read(Role.any())]
      );

      dispatch(setProfile({ ...profileData, id: profile.$id }));

      toast({
        title: "Profile completed successfully!",
        description: "Redirecting to your dashboard...",
      });
      router.push("/dashboard");
    } catch (err) {
      const error = err as Error;
      console.error("Error completing profile:", error);
      toast({
        title: "Profile Completion Failed",
        description:
          error.message ||
          "There was an error completing your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Complete Your Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="w-32 h-32">
                <AvatarImage src={avatar || undefined} alt="Profile picture" />
                <AvatarFallback>
                  {formData.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Label
                htmlFor="avatar"
                className="cursor-pointer text-sm text-blue-600 hover:text-blue-800"
              >
                Upload Profile Picture
              </Label>
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="johndoe123"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Completing Profile..." : "Complete Profile"}
            </Button>
          </form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default withOnboarding(OnboardingPage);
