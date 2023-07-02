"use client";
import Layout from "@/components/Layout";
import Sidebar from "@/components/Sidebar";
import { Center, Box, Text, HStack } from "@chakra-ui/react";

export default function Dashboard() {
  return (
    <>
      <title>MAXIMA 2023 Internal - Dashboard</title>
      <Layout>
        <Center w={"100%"} h={"100vh"}>
          <Box w={"25em"} h={"auto"} boxShadow={"lg"}>
            <Box w={"full"} p={"2em"} bg={"RGBA(0, 0, 0, 0.92)"} rounded={"md"}>
              <HStack spacing={3}>
                <Box boxSize={"1em"} bg={"white"} rounded={"full"}></Box>
                <Box boxSize={"1em"} bg={"white"} rounded={"full"}></Box>
                <Box boxSize={"1em"} bg={"white"} rounded={"full"}></Box>
              </HStack>
              <Box mt={"1em"}>
                <Text align={"left"} color={"white"} fontSize={"xl"} fontWeight={"normal"}>
                  Hi, selamat liburan para frontend MAXIMA 2023
                </Text>
              </Box>
            </Box>
          </Box>
        </Center>
      </Layout>
    </>
  );
}
