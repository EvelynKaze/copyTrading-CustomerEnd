"use client";
import { useState } from "react";
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
import { setUser } from "@/store/userSlice"
import { setProfile } from "@/store/profileSlice";
import { ToastAction } from "@/components/ui/toast"

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
  const dispatch = useAppDispatch(); // Moved to the top of the component


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
      const session = await account.createEmailPasswordSession(data.email, data.password);
      console.log("Session:", session);
        // Retrieve user data
        const userData = await account.get();
        const profile = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_PROFILE_COLLECTION_ID!,
            [
                Query.equal("user_id", userData?.$id)
            ]
        )
        console.log("profileee", profile.documents[0])

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
        dispatch(setProfile({ ...profile.documents[0], id: profile.documents[0].$id }));

        toast({
            title: "Logged In Successfully",
            description: "Redirecting to your dashboard...",
        });

      setIsLoading(false);
      if(profile.documents[0].isAdmin) {
          router.push("/admin");
      } else{
          router.push("/dashboard");
      }
    } catch (error: any) {
      console.error("Login error:", error.message);
        toast({
            title: "Sign In Error",
            description: `${error.message}`,
            variant: "destructive",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      setIsLoading(false);
    }


  };

  return (
    <div className="flex flex-col gap-4 md:flex-row justify-center relative items-center w-full h-screen">
      <div className="absolute top-8 right-8">
        <ThemeToggle />
      </div>
      <Link href={"/"} className="absolute top-8 left-8 text-sm">
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
  );
}
