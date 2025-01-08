"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { useRouter } from "next/navigation";
import { account, ID, databases, Query } from "../../lib/appwrite";
import { useAppDispatch } from "@/store/hook";
import { clearUser, setUser } from "@/store/userSlice";
import { setProfile } from "@/store/profileSlice";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const signupSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userSession = useSelector((state: RootState) => state.user.isLoggedIn);

  // useEffect(() => {
  //   if (userSession) {
  //   }
  // }, []);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);

    try {
      await account.create(ID.unique(), data.email, data.password, data.name);
      await account.createEmailPasswordSession(data.email, data.password);

      // Retrieve user data
      const userData = await account.get();

      // Fetch profile data
      const profile = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_PROFILE_COLLECTION_ID!,
        [Query.equal("user_id", userData.$id)]
      );

      if (!profile.documents.length) {
        // throw new Error("Profile not found for this user.");
        toast({
          title: "Please complete your profile",
          description: "Redirecting to onboarding page...",
        });
        router.push("/onboarding");
      }
      const profileData = profile.documents[0];
      console.log("Profile:", profileData);

      console.log("User Data:", userData);

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

      // Dispatch user data to Redux store
      dispatch(
        setUser({
          id: userData.$id,
          email: userData.email,
          name: userData.name,
          emailVerification: userData.emailVerification,
        })
      );

      toast({
        title: "Account created",
        description: "Complete Profile Information...",
      });

      // router.push("/onboarding");
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Appwrite logout function
  const logout = async () => {
    try {
      await account.deleteSession("current");
      dispatch(clearUser());
      dispatch(clearProfile());
      toast({
        description: "Logged out successfully",
      });
      // if (typeof window !== "undefined") {
      //     localStorage.removeItem("userName")
      //     localStorage.removeItem("userId")
      //     localStorage.removeItem("fullName")
      // }
    } catch (error: any) {
      console.error("Logout error:", error.message);
      toast({
        description: `${error.message}`,
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row-reverse justify-center gap-4 relative items-center w-full h-screen">
      <div className="absolute top-8 right-8">
        <ThemeToggle />
      </div>
      <Link href="/" className="absolute top-8 left-8 text-sm">
        Return
      </Link>
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
        <Card className="w-[300px] sm:w-[350px]">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Create a new account to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
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
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
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
                          placeholder="Create a password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-appCardGold text-appDark"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Sign up"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="p-0 text-appGold100 cursor-pointer"
              >
                Log in
              </Link>
            </p>
            <div
              className="cursor-pointer text-orange-600 px-3"
              onClick={() => logout()}
            >
              Log out
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
