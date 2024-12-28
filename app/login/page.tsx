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
import { account } from "../../lib/appwrite";
import { useRouter } from "next/router";

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
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {
    setIsLoading(true);
      setError("");
      try {
          const session = await account.createEmailPasswordSession(email, password);
          console.log('Session:', session);
          const user = await account.get();
          // setLoggedInUser(user); // Set logged-in user data globally
          setIsLoading(false);
          await router.push("/dashboard");
      } catch (error:Error) {
          console.error("Login error:", error.message);
          setError(error.message);
          setIsLoading(false);
      }

    toast({
      title: "Login Successful",
      description: "You have been successfully logged in.",
    });
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
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
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
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
