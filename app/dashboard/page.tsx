"use client";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/Auth";
import { Text } from "@chakra-ui/react";

export default function Dashboard() {
  const auth = useAuth()!;

  if (auth.loading) {
    return (
      <>
        <Text>Loading...</Text>
      </>
    );
  }

  return (
    <>
      <title>MAXIMA 2023 Internal - Dashboard</title>
      <Layout title="Dashboard">
        <Text>Ini dashboard ya</Text>
      </Layout>
    </>
  );
}
