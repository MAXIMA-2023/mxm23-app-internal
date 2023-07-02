import React from "react";
import { Center, Box, Text, HStack } from "@chakra-ui/react";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <Box w={"full"} h={"full"} bgColor={"#FAFAFA"}>
        {children}
      </Box>
    </>
  );
}
