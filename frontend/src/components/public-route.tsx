"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

interface PublicRouteProps {
  children: React.ReactNode;
}

function PublicRouteContent({ children }: PublicRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  useEffect(() => {
    if (!loading && user) {
      router.push(callbackUrl);
    }
  }, [user, loading, router, callbackUrl]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary" />
      </div>
    );
  }

  if (user) {
    return null;
  }

  return <>{children}</>;
}

export function PublicRoute({ children }: PublicRouteProps) {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary" />
        </div>
      }
    >
      <PublicRouteContent>{children}</PublicRouteContent>
    </Suspense>
  );
}
