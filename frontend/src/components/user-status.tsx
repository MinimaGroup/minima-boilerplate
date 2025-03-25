"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth-context";

export function UserStatus() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center gap-4">
        <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage alt={user.email} />
          <AvatarFallback>{user.email[0]?.toUpperCase() || "?"}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{user.email}</span>
          <button
            onClick={logout}
            className="text-sm text-muted-foreground hover:underline"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" asChild>
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button asChild>
        <Link href="/auth/register">Register</Link>
      </Button>
    </div>
  );
}
