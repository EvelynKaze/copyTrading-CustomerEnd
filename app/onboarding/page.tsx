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
      const response = await fetch("/api/complete-onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "Onboarding Complete",
          description: "Your profile has been successfully set up.",
        });
        router.push("/dashboard");
      } else {
        throw new Error("Failed to complete onboarding");
      }
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
