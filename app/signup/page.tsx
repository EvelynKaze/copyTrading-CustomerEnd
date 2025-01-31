"use client";

import { useEffect } from "react";
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
import { account, ID, OAuthProvider } from "../../lib/appwrite";
import { useAppDispatch } from "@/store/hook";
import { setUser } from "@/store/userSlice";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { startLoading, stopLoading } from "@/store/loadingSlice";
import { LoginAdsSlider } from "@/components/login-ads";
import { Icon } from "@iconify/react/dist/iconify.js";

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
  const { loading } = useSelector((state: RootState) => state.loading);
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userSession = useSelector((state: RootState) => state.user.isLoggedIn);
  const profileSession = useSelector((state: RootState) => state.profile);

  console.log("Profile Session", profileSession);
  console.log("User Session", userSession);

  useEffect(() => {
    if (userSession && profileSession?.profile?.account_status) {
      router.push("/dashboard");
    }
  }, [profileSession, router, userSession]);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleGoogleSignUp = async () => {
    try {
      await account.createOAuth2Session(OAuthProvider.Auth0)
    } catch (error) {
      console.error(error)
    }
  };

  const onSubmit = async (data: SignupFormValues) => {
    dispatch(startLoading());

    try {
      await account.create(ID.unique(), data.email, data.password, data.name);
      await account.createEmailPasswordSession(data.email, data.password);

      // Retrieve user data
      const userData = await account.get();

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

      router.push("/onboarding");
    } catch (err) {
      const error = err as Error;
      toast({
        title: "Registration failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <div className="flex justify-center relative w-full min-h-screen">
      <div className="absolute top-8 right-8">
        <ThemeToggle />
      </div>
      <Link href="/" className="absolute top-8 left-8 text-sm">
        Return
      </Link>
      <div className="flex flex-col w-full md:w-1/2 justify-center before:block before:h-20 items-center md:items-end">
        <div className="grid justify-items-center gap-4">
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
                <Button
                  type="button"
                  variant="outline"
                  className="w-full mb-4"
                  onClick={handleGoogleSignUp}
                >
                  <Icon icon={"devicon:google"} className="mr-2 h-4 w-4" />
                  Sign up with Google
                </Button>
                <div className="relative mb-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
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
                      disabled={loading}
                    >
                      {loading ? "Creating account..." : "Sign up"}
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
