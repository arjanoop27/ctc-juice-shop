import jwtDecode from "jwt-decode";

export type UserJwtDecode = {
  userId: string;
  iat: number;
  exp: number;
  email?: string;
  username?: string;
  ctcMode?: string;
};

export function decodeToken(token: string): UserJwtDecode {
  return jwtDecode<UserJwtDecode>(token);
}

export function isTokenExpired(token: string): boolean {
  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
}
