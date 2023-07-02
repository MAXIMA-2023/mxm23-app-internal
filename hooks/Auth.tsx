import { isExpired, decodeToken } from "react-jwt";

export default function useAuth() {
  const jwt = localStorage.getItem("jwt");
  const isJwtExpired = isExpired(jwt ?? "");

  const isLoggedIn = !!jwt && !isJwtExpired;
  const isLoggedOut = !jwt && isJwtExpired;
  const setJwt = (jwt: string) => localStorage.setItem("jwt", jwt);
  const removeJwt = () => localStorage.removeItem("jwt");
  const decodedJwt = decodeToken(jwt ?? "");

  return { isLoggedIn, isLoggedOut, setJwt, removeJwt, decodedJwt };
}
