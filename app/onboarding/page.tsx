"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { StepIndicator } from "./step-indicator";
import { ProfilePictureUpload } from "./profile-picture-upload";
import { KYCForm } from "./kyc-form";

const steps = ["Basic Info", "Profile Picture", "KYC (Optional)"];

const basicInfoSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: "Please enter a valid phone number.",
  }),
});

const profilePictureSchema = z.object({
  profilePicture: z.string().optional(),
});

const kycSchema = z.object({
  idNumber: z.string().optional(),
  dateOfBirth: z.string().optional(),
});

const formSchema = basicInfoSchema.merge(profilePictureSchema).merge(kycSchema);

type FormData = z.infer<typeof formSchema>;

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      profilePicture: "",
      idNumber: "",
      dateOfBirth: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    if (step < steps.length - 1) {
      setStep(step + 1);
      return;
    }

    try {
      // Upload the profile picture to Appwrite Storage
      // const avatarUpload = await storage.createFile(
      //     process.env.NEXT_PUBLIC_PROFILE_BUCKET_ID,
      //     ID.unique(),
      //     profilePicture
      // )
      //
      // const bucketId = process.env.NEXT_PUBLIC_PROFILE_BUCKET_ID
      // const projectID = process.env.NEXT_PUBLIC_PROJECT_ID
      // const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${avatarUpload.$id}/view?project=${projectID}`

      // Profile object to be saved in Appwrite Database
      // const profileData = {
      //   userId: loggedInUser?.$id,
      //   full_name: fullName,
      //   avatar_url: imageUrl, // Appwrite file URL
      //   account_trader: null,
      //   account_status: null,
      //   btc_balance: null,
      //   eth_balance: null,
      //   usdt_balance: null,
      //   total_investment: null,
      //   current_value: null,
      //   roi: null,
      //   kyc_status: null
      // }
      //
      // // Save profile to Appwrite Database
      // const profile = await databases.createDocument(
      //     process.env.NEXT_PUBLIC_DATABASE_ID,
      //     process.env.NEXT_PUBLIC_PROFILE_COLLECTION_ID,
      //     ID.unique(),
      //     profileData,
      //     [
      //       Permission.read(Role.any()) // Allow public read
      //     ]
      // )

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to complete onboarding. Please try again.",
        variant: "destructive",
      });
    }
  };

  const currentSchema = [basicInfoSchema, profilePictureSchema, kycSchema][
    step
  ];

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="max-w-xl w-full mx-auto mt-10 p-6 border rounded-lg shadow-md">
        <StepIndicator steps={steps} currentStep={step} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {step === 0 && (
              <>
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {step === 1 && <ProfilePictureUpload form={form} />}
            {step === 2 && <KYCForm form={form} />}
            <div className="flex justify-between">
              {step > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                >
                  Previous
                </Button>
              )}
              <Button type="submit">
                {step === steps.length - 1 ? "Complete" : "Next"}
              </Button>
            </div>
            {step === 2 && (
              <Button type="submit" variant="link" className="w-full">
                Skip KYC (You can complete this later)
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
