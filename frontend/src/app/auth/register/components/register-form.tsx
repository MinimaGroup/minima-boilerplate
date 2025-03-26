"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { authService } from "@/lib/auth-service";
import { useAuth } from "@/lib/auth-context";

interface GoogleOAuthResponse {
  code?: string;
  error?: string;
}

declare global {
  interface Window {
    google?: {
      accounts?: {
        oauth2?: {
          initCodeClient(config: {
            client_id: string;
            scope: string;
            callback: (response: GoogleOAuthResponse) => void;
          }): {
            requestCode(): void;
          };
        };
      };
    };
  }
}

const formSchema = z
  .object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long.",
    }),
    re_password: z.string(),
    full_name: z.string().optional(),
  })
  .refine((data) => data.password === data.re_password, {
    message: "Passwords do not match",
    path: ["re_password"],
  });

export function RegisterForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const { login } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      re_password: "",
      full_name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);

    try {
      await authService.register(values);

      // Add a small delay to ensure the account is properly created in the database
      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        const response = await authService.login(values.email, values.password);
        login(response);
        toast.success("Successfully registered and signed in!");
        window.location.href = "/dashboard";
      } catch (loginError) {
        console.error("Login after registration error:", loginError);
        // If login fails after successful registration, still show success for registration
        toast.success("Successfully registered! Please try logging in.");
        window.location.href = "/auth/login";
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleLogin = async () => {
    try {
      // Initialize Google OAuth
      const googleAuth = window.google?.accounts?.oauth2;
      if (!googleAuth) {
        throw new Error("Google OAuth is not initialized");
      }

      const client = googleAuth.initCodeClient({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        scope: "email profile",
        callback: async (response: GoogleOAuthResponse) => {
          if (response.code) {
            try {
              const tokens = await authService.googleLogin(response.code);
              login(tokens);
              toast.success("Successfully signed in with Google!");
              window.location.href = "/dashboard";
            } catch (error) {
              console.error("Google sign in error:", error);
              toast.error("Failed to sign in with Google");
            }
          }
        },
      });

      client.requestCode();
    } catch (error) {
      console.error("Google auth error:", error);
      toast.error("Failed to start Google authentication");
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded">
              {error}
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="full_name">Full Name (Optional)</Label>
            <Input
              id="full_name"
              placeholder="John Doe"
              type="text"
              disabled={isLoading}
              {...form.register("full_name")}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              disabled={isLoading}
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="text-sm text-red-500">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="re_password">Confirm Password</Label>
            <Input
              id="re_password"
              type="password"
              disabled={isLoading}
              {...form.register("re_password")}
            />
            {form.formState.errors.re_password && (
              <p className="text-sm text-red-500">
                {form.formState.errors.re_password.message}
              </p>
            )}
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Register
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        onClick={handleGoogleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}
        Google
      </Button>
    </div>
  );
}
