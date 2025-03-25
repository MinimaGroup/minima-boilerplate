"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "./auth-service";
import { isTokenExpired } from "./token-utils";

interface User {
  id: number;
  email: string;
  full_name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (tokens: { access: string; refresh: string }) => void;
  logout: () => void;
  refreshAccessToken: () => Promise<string | null>;
  updateProfile: (data: { full_name: string }) => Promise<void>;
  changePassword: (data: {
    current_password: string;
    new_password: string;
  }) => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        // Check if token is expired
        if (isTokenExpired(accessToken)) {
          const refreshToken = localStorage.getItem("refreshToken");
          if (refreshToken) {
            const newTokens = await authService.refreshToken(refreshToken);
            localStorage.setItem("accessToken", newTokens.access);
          } else {
            throw new Error("No refresh token available");
          }
        }

        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error("Auth check failed:", error);
        // Clear tokens on error
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (tokens: { access: string; refresh: string }) => {
    localStorage.setItem("accessToken", tokens.access);
    localStorage.setItem("refreshToken", tokens.refresh);
    // We'll fetch user data after login
    window.location.reload();
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    window.location.href = "/auth/login";
  };

  const refreshAccessToken = async (): Promise<string | null> => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const newTokens = await authService.refreshToken(refreshToken);
      localStorage.setItem("accessToken", newTokens.access);
      return newTokens.access;
    } catch (error) {
      console.error("Token refresh failed:", error);
      logout();
      return null;
    }
  };

  const updateProfile = async (data: { full_name: string }) => {
    const updatedUser = await authService.updateProfile(data);
    setUser(updatedUser);
  };

  const changePassword = async (data: {
    current_password: string;
    new_password: string;
  }) => {
    await authService.changePassword(data);
  };

  const deleteAccount = async () => {
    await authService.deleteAccount();
    logout();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        refreshAccessToken,
        updateProfile,
        changePassword,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
