import React from "react";
import {
  Center,
  Box,
  Text,
  HStack,
  Flex,
  Icon,
  Stack,
  Tag,
} from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { AppBar, BottomBar } from "./MobileLayout";
import Link from "next/link";
import { BsArrowLeftShort } from "react-icons/bs";

/* 
  * property title : buat judul halaman
  * property showDashboardButton :  kalo mau ada tombol back to dashboard (disable kalo buat dasboard)
  * properti disablePadding :  kalo mau disable padding di content (buat halaman qr scan yg butuh fullscreen)

  Content nya bisa dimasukkin ke children nya Layout
  Liat contoh di dashboard yaa
*/
export default function Layout({
  title,
  tag,
  showDashboardButton = false,
  disablePadding = false,
  children,
}: {
  title: string;
  tag?: string;
  showDashboardButton?: boolean;
  disablePadding?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <AppBar />
      <Box w={"full"} h={"auto"}>
        <Box
          w={"full"}
          py={["1em", "1em", "1.5em", "3em", "3em"]}
          px={["1em", "1em", "1.5em", "2em", "2em"]}
        >
          <Box
            w={"full"}
            py={["4em", "4em", "4em", "0em"]}
            pl={["0", "0", "0", "17em", "20em"]}
          >
            <Box mb={"2em"}>
              {showDashboardButton && (
                <Link href={"/dashboard"}>
                  <Flex
                    alignItems={"center"}
                    textColor="#9CA3AF"
                    _hover={{ textColor: "#185C99" }}
                    cursor={"pointer"}
                    transition={"0.1s ease-in-out"}
                  >
                    <Icon as={BsArrowLeftShort} boxSize={6} />
                    <Text ml={"0.7em"} fontSize={"md"}>
                      Back to Dashboard
                    </Text>
                  </Flex>
                </Link>
              )}
              <Stack direction={"row"} align={"center"}>
                <Text
                  fontSize={"4xl"}
                  fontWeight={"medium"}
                  textColor={"#1E1D22"}
                >
                  {title}
                </Text>
                {tag && (
                  <Tag
                    maxH={"1.5em"}
                    size={"md"}
                    color={"#185C99"}
                    variant={"subtle"}
                    rounded={"full"}
                  >
                    {tag}
                  </Tag>
                )}
              </Stack>
            </Box>
            <Flex
              w={"full"}
              h={"auto"}
              bgColor={"white"}
              borderRadius={"2xl"}
              boxShadow={"lg"}
            >
              <Box w={"full"} p={disablePadding ? undefined : "2em"}>
                <Flex
                  p={"0em"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  {children}
                </Flex>
                {/* <Box maxH={["88.5%", "60vh", "75vh", "70vh", "70vh"]} overflowY={"auto"}></Box> */}
              </Box>
            </Flex>
          </Box>
        </Box>
      </Box>
      <BottomBar />
    </>
  );
}
