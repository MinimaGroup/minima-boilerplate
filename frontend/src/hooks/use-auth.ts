import { useContext } from "react";
import { AuthContext, AuthContextType, User } from "@/contexts/auth-context";

export function useAuth(): AuthContextType & {
  updateProfile: (data: { full_name: string }) => Promise<User>;
  changePassword: (data: {
    current_password: string;
    new_password: string;
  }) => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
} {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const updateProfile = async ({ full_name }: { full_name: string }) => {
    try {
      const response = await fetch("/api/users/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${context.accessToken}`,
        },
        body: JSON.stringify({ full_name }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUser = await response.json();
      context.setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  const changePassword = async ({
    current_password,
    new_password,
  }: {
    current_password: string;
    new_password: string;
  }) => {
    try {
      const response = await fetch("/api/users/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${context.accessToken}`,
        },
        body: JSON.stringify({ current_password, new_password }),
      });

      if (!response.ok) {
        throw new Error("Failed to change password");
      }

      return true;
    } catch (error) {
      console.error("Error changing password:", error);
      throw error;
    }
  };

  const deleteAccount = async () => {
    try {
      const response = await fetch("/api/users/delete", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${context.accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete account");
      }

      context.logout();
      return true;
    } catch (error) {
      console.error("Error deleting account:", error);
      throw error;
    }
  };

  return {
    ...context,
    updateProfile,
    changePassword,
    deleteAccount,
  };
}
