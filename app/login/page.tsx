"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import Link from "next/link";
import Logo from "@/components/logo";
import ThemeToggle from "@/components/toggleTheme";
import { account, databases, Query } from "../../lib/appwrite";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hook";
import { setUser } from "@/store/userSlice";
import { setProfile } from "@/store/profileSlice";
import { ToastAction } from "@/components/ui/toast";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { LoginAdsSlider } from "@/components/login-ads";
// import withLoggedIn from "../hoc/with-loggedIn";
// import ENV from "@/constants/env"

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();
  // const userSession = useSelector((state: RootState) => state.user.isLoggedIn);
  // const profileSession = useSelector((state: RootState) => state.profile);
  const { profile } = useSelector((state: RootState) => state.profile);
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (isLoggedIn == true) {
      console.log(isLoggedIn);
      router.push(profile.isAdmin ? "/admin" : "/dashboard");
    }
  }, [isLoggedIn, router, profile]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);

    try {
      // Authenticate user
      const session = await account.createEmailPasswordSession(
        data.email,
        data.password
      );
      console.log("Session:", session);

      // Retrieve user data
      const userData = await account.get();
      if (!userData) {
        throw new Error("User data not found.");
      }
      console.log("User Data:", userData);

      // Fetch profile data
      const profile = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_PROFILE_COLLECTION_ID!,
        [Query.equal("user_id", userData.$id)]
      );

      if (!profile.documents.length) {
        // Redirect to onboarding if profile is incomplete
        toast({
          title: "Please complete your profile",
          description: "Redirecting to onboarding page...",
        });
        router.push("/onboarding");
        return;
      }

      const profileData = profile.documents[0];
      console.log("Profile:", profileData);

      // Dispatch user data to Redux store
      dispatch(
        setUser({
          id: userData.$id,
          email: userData.email,
          name: userData.name,
          emailVerification: userData.emailVerification,
        })
      );

      // Dispatch user profile to Redux store
      dispatch(setProfile({ ...profileData, id: profileData.$id }));

      // Check account status
      if (profileData.account_status && profileData.isAdmin === true) {
        // Show success toast
        console.log("Logged In Successfully", profileData.isAdmin);
        toast({
          title: "Logged In Successfully",
          description: "Redirecting to your dashboard...",
        });

        // Redirect based on admin status
        router.push("/admin");
      } else if (
        profileData.account_status === true &&
        profileData.isAdmin === false
      ) {
        // Handle suspended account case
        toast({
          title: "Logged In Successfully",
          description: "Redirecting to your dashboard...",
        });
        router.push("/dashboard");
      } else {
        toast({
          title: "Account Suspended!!!",
          description:
            "Please try again at a later date or contact support at support@copytrademarkets.com.",
        });
      }
    } catch (err) {
      const error = err as Error;
      console.error("Login error:", error.message);

      // Show error toast
      toast({
        title: "Sign In Error",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      // Ensure loading state is reset
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center relative">
      <div className="absolute top-8 right-8">
        <ThemeToggle />
      </div>
      <Link href={"/"} className="absolute top-8 left-8 text-sm">
        Return
      </Link>
      <div className="flex flex-col justify-center items-center md:items-end w-full md:w-1/2 h-screen">
        <div className="grid gap-4 justify-items-center">
          <motion.div
            initial={{ opacity: 0, translateX: -50 }}
            exit={{ opacity: 1, translateX: 0 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Logo />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, translateX: 50 }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 1, translateX: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="w-[300px] mx-4 sm:w-[350px]">
              <CardHeader className="">
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Enter your email and password to log in.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your email"
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage>
                            {form.formState.errors.email?.message}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter your password"
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage>
                            {form.formState.errors.password?.message}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full bg-appCardGold text-appDark"
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Log in"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className="text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link
                    href={"/signup"}
                    className="text-appGold100 cursor-pointer hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
      <div className="w-1/2 hidden md:flex justify-start items-center">
        <div className="w-full grid justify-items-start">
          <LoginAdsSlider />
        </div>
      </div>
    </div>
  );
}
