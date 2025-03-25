import axios from "axios";
import axiosInstance from "./axios-config";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001";

export interface User {
  id: number;
  email: string;
  full_name: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface RegisterData {
  email: string;
  password: string;
  re_password: string;
  full_name?: string;
}

export interface UpdateProfileData {
  full_name: string;
}

export interface ChangePasswordData {
  current_password: string;
  new_password: string;
}

class AuthService {
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await axios.post<LoginResponse>(
        `${API_URL}/api/auth/token/`,
        {
          email,
          password,
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          const detail = error.response?.data?.detail || "Invalid credentials";
          if (detail.includes("No active account")) {
            throw new Error(
              "Account not activated yet or credentials are incorrect. Try logging in later or contact support."
            );
          }
          throw new Error(detail);
        }
        throw new Error(error.response?.data?.detail || "Login failed");
      }
      throw error;
    }
  }

  async register(data: RegisterData): Promise<void> {
    try {
      await axios.post(`${API_URL}/api/auth/users/`, data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.detail || "Registration failed");
      }
      throw error;
    }
  }

  async googleLogin(accessToken: string): Promise<LoginResponse> {
    try {
      const response = await axios.post<LoginResponse>(
        `${API_URL}/api/auth/google/`,
        {
          access_token: accessToken,
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || "Google login failed");
      }
      throw error;
    }
  }

  async refreshToken(refreshToken: string): Promise<{ access: string }> {
    try {
      const response = await axios.post<{ access: string }>(
        `${API_URL}/api/auth/token/refresh/`,
        {
          refresh: refreshToken,
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.detail || "Token refresh failed");
      }
      throw error;
    }
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      await axios.post(`${API_URL}/api/auth/token/verify/`, {
        token,
      });
      return true;
    } catch {
      return false;
    }
  }

  async getCurrentUser(): Promise<User> {
    try {
      const response = await axiosInstance.get<User>(`/api/auth/users/me/`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.detail || "Failed to get user data"
        );
      }
      throw error;
    }
  }

  async updateProfile(data: UpdateProfileData): Promise<User> {
    try {
      const response = await axiosInstance.patch<User>(
        `/api/users/profile/`,
        data
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.detail || "Failed to update profile"
        );
      }
      throw error;
    }
  }

  async changePassword(data: ChangePasswordData): Promise<void> {
    try {
      await axiosInstance.post(`/api/users/change-password/`, data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.detail || "Failed to change password"
        );
      }
      throw error;
    }
  }

  async deleteAccount(): Promise<void> {
    try {
      await axiosInstance.delete(`/api/users/delete-account/`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.detail || "Failed to delete account"
        );
      }
      throw error;
    }
  }
}

export const authService = new AuthService();
