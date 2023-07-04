import { isExpired, decodeToken } from "react-jwt";
/*
    * JWT Authentication Hook

    * Usage Example:

      type JwtPayload = {
        id: string;
        name: string;
        nim: number;
        role: string;
      };

      const { isLoggedIn, isLoggedOut, setJwt, removeJwt, decodedJwt } = useAuth<JwtPayload>();
      const router = useRouter();

      * Misalkan di page signin, kita harus check apakah user sudah login atau belum
      * Jika sudah login, maka redirect ke dashboard
      
      if (isLoggedIn) {
        router.push("/dashboard");
      }

      * Jika belum login, maka tampilkan form login
         Jika login berhasil, maka set jwt dan redirect ke dashboard
      setJwt("jwt");
      router.push("/dashboard");

      * Misalkan untuk guarding page dashboard, kita harus check apakah user sudah login atau belum
      * Jika belum login / jwt expired, maka redirect ke page signin
      if (isLoggedOut) {
        router.push("/signin");
      }

      * Note : Untuk checking, selalu gunakan useEffect
  */
export default function useAuth<T>() {
  const jwt = localStorage.getItem("jwt");
  const isJwtExpired = isExpired(jwt ?? "");

  const isLoggedIn = !!jwt && !isJwtExpired;
  const isLoggedOut = !jwt && isJwtExpired;
  const setJwt = (jwt: string) => localStorage.setItem("jwt", jwt);
  const removeJwt = () => localStorage.removeItem("jwt");
  const decodedJwt: T | null = decodeToken<T>(jwt ?? "");

  return { isLoggedIn, isLoggedOut, setJwt, removeJwt, decodedJwt };
}
