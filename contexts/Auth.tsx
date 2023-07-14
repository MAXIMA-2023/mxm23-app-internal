import api, { baseUrl, HandleAxiosError } from "@/services/api";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { AxiosError, isAxiosError } from "axios";
import Swal from "sweetalert2";

type User = {
  nim: number;
  name: string;
  email: string;
  stateID: number;
  isverified: boolean;
  Statenameisi?: string;
  divisi?: string;
};

type JWT = {
  token: string;
  expiresIn: number;
};

type DecodedJWT = {
  nim: number;
  role: "organisator" | "panit";
};

type AuthContext = {
  user: User | null;
  role: "organisator" | "panit" | null;
  loading: boolean;
  isLoggedIn: boolean;
  login: (user: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContext | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<"organisator" | "panit" | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  // const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      if (!token) {
        setLoading(false);
        return;
      }

      api.defaults.headers.Authorization = `Bearer ${token}`;
      api.defaults.headers.common["x-access-token"] = token;
      api.defaults.baseURL = `${baseUrl}/${role}`;

      try {
        // ambil nim aja
        const decoded = decodeToken(token) as DecodedJWT;

        const { data } = await api.get<User[]>(
          role === "organisator" ? `/get/${decoded.nim}` : `/${decoded.nim}`
        );
        if (!data.length) {
          localStorage.removeItem("token");
          Swal.fire(
            "Error",
            "Sesi kamu telah expired, silahkan login kembali",
            "error"
          );

          // raise error
          throw new Error();
        }

        setUser(data[0]);
        setUserRole(role as "organisator" | "panit");
      } catch (error) {
        console.log(error);

        delete api.defaults.headers.Authorization;
        delete api.defaults.headers.common["x-access-token"];
        api.defaults.baseURL = baseUrl;
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        HandleAxiosError(error);
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const { data } = await api.post<JWT>(
        `/login`, // harusnya masih default
        {
          username,
          password,
        }
      );
      const decoded = decodeToken(data.token) as DecodedJWT;

      api.defaults.headers.Authorization = `Bearer ${data.token}`;
      api.defaults.headers.common["x-access-token"] = data.token;
      api.defaults.baseURL = `${baseUrl}/${decoded.role}`;

      const { data: user } = await api.get<User[]>(`/get/${decoded.nim}`);

      setUser(user[0]);
      setUserRole(decoded.role);

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", decoded.role);

      Swal.fire("Berhasil", "Selamat, anda berhasil masuk!", "success");
    } catch (error: any) {
      delete api.defaults.headers.Authorization;
      delete api.defaults.headers.common["x-access-token"];

      api.defaults.baseURL = baseUrl;
      console.log(error);
      HandleAxiosError(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
    setUserRole(null);
    delete api.defaults.headers.Authorization;
    delete api.defaults.headers.common["x-access-token"];

    api.defaults.baseURL = baseUrl;
    // router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: userRole,
        loading,
        isLoggedIn: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
