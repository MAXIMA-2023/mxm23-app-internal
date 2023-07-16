import axios, { isAxiosError, AxiosError } from "axios";
import Swal from "sweetalert2";

// !CHANGEME: hardcode
export const baseUrl =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api";

export const HandleAxiosError = (error: any) => {
  if (!isAxiosError(error)) {
    console.log("error");
    Swal.fire("Error", "Terjadi kesalahan pada request", "error");
    return;
  }

  const { response } = error as AxiosError<{
    message: string;
    error?: ZodError;
  }>;
  if (!response) {
    Swal.fire("Error", "Tidak dapat terhubung ke server", "error");
    return;
  }

  if (response.data.error) {
    const errorString = response.data.error.issues
      .map((issue) => {
        const { message } = issue;
        return message;
      })
      .join(", ");

    Swal.fire("Error", errorString, "error");
    return;
  }

  Swal.fire(
    "Error",
    response.data.message ?? "Terjadi kesalahan saat request",
    "error"
  );
};

export type ResponseModel<T> = {
  code?: number;
  message: string;
  data?: T;
  error?: any;
};

type ZodError = {
  issues: ZodIssue[];
};

type ZodIssue = {
  code: string;
  message: string;
  path: string[];
};

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
