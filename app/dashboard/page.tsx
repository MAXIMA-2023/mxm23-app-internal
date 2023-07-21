"use client";
import React, { useRef, useEffect, useState, MutableRefObject } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/Auth";
import { Text, Box, Flex, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { MdOutlineShield, MdOutlineSchool, MdOutlineAirplanemodeActive } from "react-icons/md";
import { HiOutlineOfficeBuilding, HiOutlineSparkles } from "react-icons/hi";
import Charts from "@/components/Charts";
import LoadingSpinner from "@/components/LoadingSpinner";

// chart dummy data
const dummyJmlMahasiswa = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const dummyDates = [
  "2023-09-18T00:00:00+0700",
  "2023-09-19T00:00:00+0700",
  "2023-09-20T00:00:00+07:00",
  "2023-09-21T00:00:00+0700",
  "2023-09-22T00:00:00+0700",
  "2023-09-23T00:00:00+0700",
  "2023-09-24T00:00:00+0700",
  "2023-09-25T00:00:00+0700",
  "2023-09-26T00:00:00+0700",
  "2023-09-27T00:00:00+0700",
  "2023-09-28T00:00:00+0700",
];

const tabs = [
  {
    name: "Panitia",
    href: "/dashboard/daftarpanitia",
    icon: MdOutlineShield,
    bgColor: "#E7EDFE",
    iconBgColor: "#185C99",
    total: 0,
  },
  {
    name: "Panitia Divisi",
    href: "/dashboard/panitiafivisi",
    icon: MdOutlineShield,
    bgColor: "#E7EDFE",
    iconBgColor: "#185C99",
    total: 0,
  },
  {
    name: "Organisator",
    href: "/dashboard/organisator",
    icon: HiOutlineOfficeBuilding,
    bgColor: "#FEE7E7",
    iconBgColor: "#E53E3E",
    total: 0,
  },
  {
    name: "Mahasiswa",
    href: "/dashboard/mahasiswa",
    icon: MdOutlineSchool,
    bgColor: "#FEF5E7",
    iconBgColor: "#D77300",
    total: 0,
  },
  {
    name: "STATE",
    href: "/dashboard/daftarstate ",
    icon: MdOutlineAirplanemodeActive,
    bgColor: "#ECE7FE",
    iconBgColor: "#4A05DE",
    total: 0,
  },
  {
    name: "Malpun",
    href: "/dashboard/malpun ",
    icon: HiOutlineSparkles,
    bgColor: "#FEE7FC",
    iconBgColor: "#DE05C8",
    total: 0,
  },
];

export default function Dashboard() {
  const auth = useAuth();
  const [width, setWidth] = useState(0);
  const cardRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    if (cardRef.current) {
      setWidth(cardRef.current.scrollWidth - cardRef.current.offsetWidth);
    }
  }, []);

  return (
    <>
      <title>MAXIMA 2023 Internal - Dashboard</title>
      <Layout title="Dashboard">
        <Box w={"full"} h={"auto"}>
          <Box w={"full"}>
            <Text color={"#6B6773"} fontSize="2xl" fontWeight={"medium"}>
              Selamat datang, <strong>{auth.user?.name}</strong> 🤩
            </Text>
          </Box>
          <Box w={"full"} mt={"2em"}>
            {/* <Box>
              <Text color={"#6B6773"} fontSize="md" fontWeight={"medium"}>
                Tab
              </Text>
            </Box> */}
            <Box as={motion.div} overflowX={"hidden"} cursor={"grab"} whileTap={{ cursor: "grabbing" }}>
              <Flex as={motion.div} w={"full"} maxW={"full"} mt={"0.5em"} drag={"x"} dragConstraints={{ right: 0, left: -width }} ref={cardRef}>
                {auth.role === "panit" ? (
                  <>
                    {tabs.map((tab, index) => (
                      <Box as={motion.div} minW={"15em"} h={"7.5em"} p={"1em"} bg={tab.bgColor} mr={"1em"} mb={"1em"} key={index} borderRadius={"lg"}>
                        <Box w={"full"} h={"auto"}>
                          <Flex w={"full"} h={"auto"} justifyContent={"space-between"} alignItems={"center"}>
                            <Box>
                              <Text fontSize={"md"} fontWeight={"medium"}>
                                {tab.name}
                              </Text>
                            </Box>
                            <Box ml={"auto"} bg={tab.iconBgColor} w={"1.5em"} h={"1.5em"} borderRadius={"50%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                              <Icon as={tab.icon} color={"white"} w={"1em"} h={"1em"} />
                            </Box>
                          </Flex>
                          <Box w={"full"} h={"auto"} mt={"1em"}>
                            <Text fontSize={"3xl"} fontWeight={"semibold"}>
                              {tab.total}
                            </Text>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </>
                ) : auth.role === "organisator" ? (
                  <>
                    <Box as={motion.div} minW={"15em"} h={"7.5em"} p={"1em"} bg={tabs[4].bgColor} mr={"1em"} mb={"1em"} borderRadius={"lg"}>
                      <Box w={"full"} h={"auto"}>
                        <Flex w={"full"} h={"auto"} justifyContent={"space-between"} alignItems={"center"}>
                          <Box>
                            <Text fontSize={"md"} fontWeight={"medium"}>
                              Detail dan Peserta
                            </Text>
                          </Box>
                          <Box ml={"auto"} bg={tabs[4].iconBgColor} w={"1.5em"} h={"1.5em"} borderRadius={"50%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <Icon as={tabs[4].icon} color={"white"} w={"1em"} h={"1em"} />
                          </Box>
                        </Flex>
                        <Box w={"full"} h={"auto"} mt={"1em"}>
                          <Text fontSize={"3xl"} fontWeight={"semibold"}>
                            0
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                  </>
                ) : (
                  <></>
                )}
              </Flex>
            </Box>
          </Box>
          <Box w={"full"} mt={"2em"}>
            <Charts jmlPendaftar={dummyJmlMahasiswa} dates={dummyDates} />
          </Box>
        </Box>
      </Layout>
    </>
  );
}
