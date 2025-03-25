"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

export function MainNav() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link
            href="/dashboard"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/dashboard"
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            Overview
          </Link>
          <Link
            href="/dashboard/customers"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/dashboard/customers"
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            Customers
          </Link>
          <Link
            href="/dashboard/products"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/dashboard/products"
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            Products
          </Link>
          <Link
            href="/dashboard/settings"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/dashboard/settings"
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            Settings
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                {user.email}
              </span>
              <button
                onClick={logout}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
