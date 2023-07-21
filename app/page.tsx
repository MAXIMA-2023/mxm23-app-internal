"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/Auth";

export default function Home() {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.loading && !auth?.isLoggedIn) {
      router.push("/signin");
      return;
    }

    if (!auth.loading && auth?.isLoggedIn) {
      router.push("/dashboard");
      return;
    }
  }, [auth?.isLoggedIn, auth.loading, router]);

  return <></>;
}
