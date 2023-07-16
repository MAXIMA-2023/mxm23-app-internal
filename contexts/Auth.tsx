import api, { HandleAxiosError, ResponseModel } from "@/services/api";
import { createContext, useContext, useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import Swal from "sweetalert2";

type User = {
  nim: number;
  name: string;
  email: string;
  stateID?: number;
  stateName?: string;
  divisiID?: string;
  divisiName?: string;
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
  login: (nim: number, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContext | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<"organisator" | "panit" | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      if (!token || !role) {
        setLoading(false);
        return;
      }

      api.defaults.headers.authorization = `Bearer ${token}`;

      try {
        // ambil nim aja
        // const decoded = decodeToken(token) as DecodedJWT;
        const { data } = await api.get<ResponseModel<User>>(`${role}/profile`);

        setUser(data.data!);
        setUserRole(role as "organisator" | "panit");
      } catch (error) {
        console.log(error);

        delete api.defaults.headers.authorization;
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        HandleAxiosError(error);
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (nim: number, password: string) => {
    try {
      const { data } = await api.post<ResponseModel<JWT>>(
        `/internal/login`, // harusnya masih default
        {
          nim,
          password,
        }
      );

      const decoded = decodeToken(data.data?.token!) as DecodedJWT;

      api.defaults.headers.authorization = `Bearer ${data.data?.token!}`;

      const { data: user } = await api.get<ResponseModel<User>>(
        `${decoded.role}/profile/`
      );

      setUser(user.data!);
      setUserRole(decoded.role);

      localStorage.setItem("token", data.data?.token!);
      localStorage.setItem("role", decoded.role);

      Swal.fire("Berhasil", "Selamat, anda berhasil masuk!", "success");
    } catch (error: any) {
      delete api.defaults.headers.authorization;
      console.log(error);
      HandleAxiosError(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
    setUserRole(null);
    delete api.defaults.headers.authorization;
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
export const useAuth = () => useContext(AuthContext)!;
