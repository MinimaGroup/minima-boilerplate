import { jwtDecode } from "jwt-decode";

interface JWTPayload {
  exp: number;
  iat: number;
  jti: string;
  token_type: string;
  user_id: number;
}

export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<JWTPayload>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
}

export function isTokenExpiringSoon(
  token: string,
  thresholdMinutes: number = 5
): boolean {
  try {
    const decoded = jwtDecode<JWTPayload>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    const timeUntilExpiry = decoded.exp - currentTime;
    return timeUntilExpiry < thresholdMinutes * 60;
  } catch {
    return true;
  }
}

export function getTokenExpiryTime(token: string): Date | null {
  try {
    const decoded = jwtDecode<JWTPayload>(token);
    return new Date(decoded.exp * 1000);
  } catch {
    return null;
  }
}

export function getUserIdFromToken(token: string): number | null {
  try {
    const decoded = jwtDecode<JWTPayload>(token);
    return decoded.user_id;
  } catch {
    return null;
  }
}
