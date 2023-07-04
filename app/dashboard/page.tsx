"use client";
import Layout from "@/components/Layout";
import {
  Center,
  Box,
  Text,
  HStack,
  Flex,
  Image,
  Divider,
} from "@chakra-ui/react";

export default function Dashboard() {
  return (
    <>
      <title>MAXIMA 2023 Internal - Dashboard</title>
      <Layout>
        <Box
          w={"full"}
          py={["1em", "1em", "1.5em", "3em", "3em"]}
          px={["1em", "1em", "1.5em", "2em", "2em"]}
        >
          <Box w={"full"} pl={["0", "0", "0", "17em", "20em"]}>
            <Box my={"2em"}>
              <Text
                fontSize={"4xl"}
                fontWeight={"medium"}
                textColor={"#1E1D22"}
              >
                Dashboard
              </Text>
            </Box>
            <Flex
              w={"full"}
              minH={["95vh", "95vh", "auto", "86vh", "86vh"]}
              bgColor={"white"}
              borderRadius={"2xl"}
              boxShadow={"lg"}
            >
              <Box w={"full"} p={"2em"}>
                <Flex
                  justifyContent={"space-between"}
                  alignItems={"center"}
                ></Flex>
                <Box
                  maxH={["88.5%", "60vh", "75vh", "70vh", "70vh"]}
                  overflowY={"auto"}
                ></Box>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Layout>
    </>
  );
}
