import wretch from "wretch";
import { toast } from "sonner";

const BASE_URL = "http://localhost:8000";

interface AuthTokens {
  access: string;
  refresh: string;
}

interface GoogleAuthResponse {
  authorization_url: string;
}

interface User {
  id: number;
  email: string;
}

// Create base API instance
const api = wretch(BASE_URL)
  .errorType("json")
  .resolve((r) => r.json())
  .catcher(401, async (error, req) => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      // No refresh token, redirect to login
      window.location.href = "/auth/login";
      return;
    }

    try {
      // Try to refresh the token
      const response = await fetch(`${BASE_URL}/auth/jwt/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      const data = (await response.json()) as AuthTokens;
      localStorage.setItem("accessToken", data.access);

      // Retry the original request with new token
      const retryResponse = await req
        .auth(`JWT ${data.access}`)
        .fetch()
        .catch((err) => {
          // If it fails again, clear auth and redirect
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/auth/login";
          return Promise.reject(err);
        });

      if (!(retryResponse instanceof Response)) {
        throw new Error("Invalid response type");
      }

      return retryResponse.json();
    } catch (error) {
      // Refresh failed, clear auth and redirect
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/auth/login";
      return Promise.reject(error);
    }
  })
  .catcher(403, async (error) => {
    toast.error("You don't have permission to perform this action");
    return Promise.reject(error);
  })
  .catcher(404, async (error) => {
    toast.error("Resource not found");
    return Promise.reject(error);
  })
  .catcher(500, async (error) => {
    toast.error("Server error. Please try again later.");
    return Promise.reject(error);
  });

// Create authenticated API instance
export const authApi = (token?: string) => {
  const accessToken = token || localStorage.getItem("accessToken");
  return accessToken ? api.auth(`JWT ${accessToken}`) : api;
};

// Auth endpoints
export const auth = {
  login: async (email: string, password: string): Promise<AuthTokens> => {
    const response = await api
      .url("/auth/jwt/create/")
      .post({ email, password });
    return response as AuthTokens;
  },

  register: async (email: string, password: string): Promise<User> => {
    const response = await api.url("/auth/users/").post({ email, password });
    return response as User;
  },

  me: async (): Promise<User> => {
    const response = await authApi().url("/auth/users/me/").get();
    return response as User;
  },

  googleAuth: async (redirectUri: string): Promise<GoogleAuthResponse> => {
    const response = await api
      .url(
        `/auth/o/google-oauth2/?redirect_uri=${encodeURIComponent(redirectUri)}`
      )
      .get();
    return response as GoogleAuthResponse;
  },

  googleCallback: async (code: string, state: string): Promise<AuthTokens> => {
    const response = await api
      .url("/auth/o/google-oauth2/")
      .content("application/x-www-form-urlencoded")
      .post(`code=${code}&state=${state}`);
    return response as AuthTokens;
  },
};
