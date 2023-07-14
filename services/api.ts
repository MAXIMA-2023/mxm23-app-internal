import axios, { isAxiosError, AxiosError } from "axios";
import Swal from "sweetalert2";

// !CHANGEME: hardcode
export const baseUrl = process.env.API_URL ?? "http://localhost:3000/api";

export const HandleAxiosError = (error: any) => {
  if (!isAxiosError(error)) {
    console.log("error");
    Swal.fire("Error", "Terjadi kesalahan pada request", "error");
    return;
  }

  const { response } = error as AxiosError<{ message: string }>;
  if (!response) {
    Swal.fire("Error", "Tidak dapat terhubung ke server", "error");
    return;
  }
  Swal.fire(
    "Error",
    response.data.message ?? "Terjadi kesalahan saat request",
    "error"
  );
};

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
