"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { auth } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

function GoogleCallbackContent() {
  const searchParams = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code");
      const state = searchParams.get("state");

      if (!code || !state) {
        toast.error("Invalid callback parameters");
        window.location.href = "/auth/login";
        return;
      }

      try {
        const tokens = await auth.googleCallback(code, state);
        login(tokens);
        toast.success("Successfully signed in with Google!");
        window.location.href = "/";
      } catch (error) {
        console.error("Google callback error:", error);
        toast.error("Failed to complete Google authentication");
        window.location.href = "/auth/login";
      }
    };

    handleCallback();
  }, [searchParams, login]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">Completing sign in...</h1>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  );
}

export default function GoogleCallback() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-4">Loading...</h1>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          </div>
        </div>
      }
    >
      <GoogleCallbackContent />
    </Suspense>
  );
}
