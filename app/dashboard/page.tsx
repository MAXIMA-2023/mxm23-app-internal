"use client";
import React, { useRef, useEffect, useState, MutableRefObject } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/Auth";
import { Text, Box, Flex, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  MdOutlineShield,
  MdOutlineSchool,
  MdOutlineAirplanemodeActive,
} from "react-icons/md";
import { HiOutlineOfficeBuilding, HiOutlineSparkles } from "react-icons/hi";
import Charts from "@/components/Charts";

// chart dummy data

const dummyJmlMahasiswa = [20, 9, 12, 5, 7, 10, 15, 20, 25, 30];
const dummyDates = [
  "2023-07-18T15:50:24+0000",
  "2023-07-25T15:50:24+0000",
  "2023-07-30T15:50:24+0000",
  "2023-08-01T15:50:24+0000",
  "2023-08-05T15:50:24+0000",
  "2023-08-08T15:50:24+0000",
  "2023-08-15T15:50:24+0000",
  "2023-08-21T15:50:24+0000",
  "2023-08-30T15:50:24+0000",
  "2023-09-01T15:50:24+0000",
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

  const tabs = [
    {
      name: "Panitia",
      href: "/dashboard/daftarpanitia",
      icon: MdOutlineShield,
      bgColor: "#E7EDFE",
      iconBgColor: "#185C99",
      total: 249,
    },
    {
      name: "Panitia Divisi",
      href: "/dashboard/panitiafivisi",
      icon: MdOutlineShield,
      bgColor: "#E7EDFE",
      iconBgColor: "#185C99",
      total: 19,
    },
    {
      name: "Organisator",
      href: "/dashboard/organisator",
      icon: HiOutlineOfficeBuilding,
      bgColor: "#FEE7E7",
      iconBgColor: "#E53E3E",
      total: 86,
    },
    {
      name: "Mahasiswa",
      href: "/dashboard/mahasiswa",
      icon: MdOutlineSchool,
      bgColor: "#FEF5E7",
      iconBgColor: "#D77300",
      total: 3409,
    },
    {
      name: "STATE",
      href: "/dashboard/daftarstate ",
      icon: MdOutlineAirplanemodeActive,
      bgColor: "#ECE7FE",
      iconBgColor: "#4A05DE",
      total: 49,
    },
    {
      name: "Detail dan Peserta",
      href: "/dashboard/details ",
      icon: MdOutlineAirplanemodeActive,
      bgColor: "#ECE7FE",
      iconBgColor: "#4A05DE",
      total: 73,
    },
    {
      name: "Malpun",
      href: "/dashboard/malpun ",
      icon: HiOutlineSparkles,
      bgColor: "#FEE7FC",
      iconBgColor: "#DE05C8",
      total: 4021,
    },
  ];

  return (
    <>
      <title>MAXIMA 2023 Internal - Dashboard</title>
      <Layout title="Dashboard">
        <Box w={"full"} h={"auto"}>
          <Box w={"full"}>
            <Text color={"#6B6773"} fontSize="2xl" fontWeight={"medium"}>
              Selamat datang, <strong>Monkey D. Luffy</strong> 🤩
            </Text>
          </Box>
          <Box w={"full"} mt={"2em"}>
            {/* <Box>
              <Text color={"#6B6773"} fontSize="md" fontWeight={"medium"}>
                Tab
              </Text>
            </Box> */}
            <Box
              as={motion.div}
              overflowX={"hidden"}
              cursor={"grab"}
              whileTap={{ cursor: "grabbing" }}
            >
              <Flex
                as={motion.div}
                w={"full"}
                maxW={"full"}
                mt={"0.5em"}
                drag={"x"}
                dragConstraints={{ right: 0, left: -width }}
                ref={cardRef}
              >
                {tabs.map((tab, index) => (
                  <Box
                    as={motion.div}
                    minW={"15em"}
                    h={"7.5em"}
                    p={"1em"}
                    bg={tab.bgColor}
                    mr={"1em"}
                    mb={"1em"}
                    key={index}
                    borderRadius={"lg"}
                  >
                    <Box w={"full"} h={"auto"}>
                      <Flex
                        w={"full"}
                        h={"auto"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Box>
                          <Text fontSize={"md"} fontWeight={"medium"}>
                            {tab.name}
                          </Text>
                        </Box>
                        <Box
                          ml={"auto"}
                          bg={tab.iconBgColor}
                          w={"1.5em"}
                          h={"1.5em"}
                          borderRadius={"50%"}
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                        >
                          <Icon
                            as={tab.icon}
                            color={"white"}
                            w={"1em"}
                            h={"1em"}
                          />
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
