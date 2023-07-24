"use client";
import React, { useRef, useEffect, useState, MutableRefObject } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/Auth";
import { Text, Box, Flex, Icon, Tooltip, Center } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { MdOutlineShield, MdOutlineSchool, MdOutlineAirplanemodeActive, MdInfoOutline } from "react-icons/md";
import { HiOutlineOfficeBuilding, HiOutlineSparkles } from "react-icons/hi";
import Charts from "@/components/Charts";
import { useRouter } from "next/navigation";
export default function Dashboard() {
  const router = useRouter();
  const auth = useAuth();
  const [width, setWidth] = useState(0);
  const cardRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    if (cardRef.current) {
      setWidth(cardRef.current.scrollWidth - cardRef.current.offsetWidth);
    }
  }, []);

  // chart dummy data
  const dummyJmlPesertaSTATE = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const dummySTATEDates = [
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

  const dummyJmlMahasiswa = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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

  const tabsPanitia = [
    {
      name: "Panitia",
      href: "/dashboard/panitia/daftarpanitia",
      icon: MdOutlineShield,
      bgColor: "#E7EDFE",
      iconBgColor: "#185C99",
      tooltipLabel: "Data ini menampilkan jumlah panitia yang terdaftar",
      tooltipIcon: "Panitia",
      total: 0,
    },
    {
      name: "Panitia Divisi",
      href: "/dashboard/panitia/panitiadivisi",
      icon: MdOutlineShield,
      bgColor: "#E7EDFE",
      iconBgColor: "#185C99",
      tooltipLabel: `Data ini menampilkan jumlah panitia divisi ${auth.user?.divisiName} yang terdaftar`,
      tooltipIcon: "Panitia",
      total: 0,
    },
    {
      name: "Organisator",
      href: "/dashboard/organisator",
      icon: HiOutlineOfficeBuilding,
      bgColor: "#FEE7E7",
      iconBgColor: "#E53E3E",
      tooltipLabel: "Data ini menampilkan jumlah PIC organisator yang terdaftar",
      tooltipIcon: "Organisator",
      total: 0,
    },
    {
      name: "Mahasiswa",
      href: "/dashboard/mahasiswa",
      icon: MdOutlineSchool,
      bgColor: "#FEF5E7",
      iconBgColor: "#D77300",
      tooltipLabel: "Data ini menampilkan jumlah mahasiswa yang terdaftar",
      tooltipIcon: "Mahasiswa",
      total: 0,
    },
    {
      name: "STATE",
      href: "/dashboard/state/daftarstate ",
      icon: MdOutlineAirplanemodeActive,
      bgColor: "#ECE7FE",
      iconBgColor: "#4A05DE",
      tooltipLabel: "Data ini menampilkan jumlah mahasiswa yang mengikuti STATE",
      tooltipIcon: "STATE",
      total: 0,
    },
    {
      name: "Malpun",
      href: "/dashboard/malpun/peserta ",
      icon: HiOutlineSparkles,
      bgColor: "#FEE7FC",
      iconBgColor: "#DE05C8",
      tooltipLabel: "Data ini menampilkan jumlah mahasiswa yang mengikuti Malam Puncak",
      tooltipIcon: "Malpun",
      total: 0,
    },
  ];

  const tabsOrganisator = [
    {
      name: "Detail dan Peserta",
      href: `/dashboard/state/details/${auth.user?.stateID}`,
      icon: MdOutlineAirplanemodeActive,
      bgColor: "#ECE7FE",
      iconBgColor: "#4A05DE",
      tooltipLabel: `Data ini menampilkan jumlah mahasiswa yang mengikuti STATE kamu`,
      tooltipIcon: "STATE",
      total: 0,
    },
  ];

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
                    {tabsPanitia.map((tab, index) => (
                      <Box as={motion.div} minW={"15em"} h={"7.5em"} p={"1em"} bg={tab.bgColor} mr={"1em"} mb={"1em"} key={index} borderRadius={"lg"}>
                        <Box w={"full"} h={"auto"}>
                          <Flex w={"full"} h={"auto"} justifyContent={"space-between"} alignItems={"center"}>
                            <Flex w={"full"} justifyContent={"start"} alignItems={"center"}>
                              <Box
                                _hover={{ textDecoration: "underline", cursor: "pointer" }}
                                onClick={() => {
                                  router.push(tab.href);
                                }}
                              >
                                <Text fontSize={"md"} fontWeight={"medium"}>
                                  {tab.name}
                                </Text>
                              </Box>
                              <Tooltip p={"1em"} hasArrow label={tab.tooltipLabel} bg={"white"} color={"#1E1D22"} borderRadius={"md"}>
                                <Center _hover={{ cursor: "pointer" }}>
                                  <Icon as={MdInfoOutline} color={"#1E1D22"} w={"0.85em"} h={"0.85em"} ml={"0.25em"} />
                                </Center>
                              </Tooltip>
                            </Flex>
                            <Tooltip p={"0.5em"} hasArrow label={tab.tooltipIcon} bg={"white"} color={"#1E1D22"} borderRadius={"md"}>
                              <Box ml={"auto"} bg={tab.iconBgColor} w={"1.5em"} h={"1.5em"} borderRadius={"50%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                <Icon as={tab.icon} color={"white"} w={"1em"} h={"1em"} />
                              </Box>
                            </Tooltip>
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
                    <Box as={motion.div} minW={"15em"} h={"7.5em"} p={"1em"} bg={tabsOrganisator[0].bgColor} mr={"1em"} mb={"1em"} borderRadius={"lg"}>
                      <Box w={"full"} h={"auto"}>
                        <Flex w={"full"} h={"auto"} justifyContent={"space-between"} alignItems={"center"}>
                          <Flex w={"full"} justifyContent={"start"} alignItems={"center"}>
                            <Box
                              _hover={{ textDecoration: "underline", cursor: "pointer" }}
                              onClick={() => {
                                router.push(tabsOrganisator[0].href);
                              }}
                            >
                              <Text fontSize={"md"} fontWeight={"medium"}>
                                {tabsOrganisator[0].name}
                              </Text>
                            </Box>
                            <Tooltip p={"1em"} hasArrow label={tabsOrganisator[0].tooltipLabel} bg={"white"} color={"#1E1D22"} borderRadius={"md"}>
                              <Center _hover={{ cursor: "pointer" }}>
                                <Icon as={MdInfoOutline} color={"#1E1D22"} w={"0.85em"} h={"0.85em"} ml={"0.25em"} />
                              </Center>
                            </Tooltip>
                          </Flex>
                          <Tooltip p={"0.5em"} hasArrow label={tabsOrganisator[0].tooltipIcon} bg={"white"} color={"#1E1D22"} borderRadius={"md"}>
                            <Box ml={"auto"} bg={tabsOrganisator[0].iconBgColor} w={"1.5em"} h={"1.5em"} borderRadius={"50%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                              <Icon as={tabsOrganisator[0].icon} color={"white"} w={"1em"} h={"1em"} />
                            </Box>
                          </Tooltip>
                        </Flex>
                        <Box w={"full"} h={"auto"} mt={"1em"}>
                          <Text fontSize={"3xl"} fontWeight={"semibold"}>
                            {tabsPanitia[5].total}
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
          {auth.role === "panit" ? (
            <>
              <Box w={"full"} mt={"2em"}>
                <Flex justifyContent={"start"} alignItems={"center"}>
                  <Box>
                    <Text color={"#1E1D22"} fontSize="md" fontWeight={"semibold"}>
                      Mahasiswa
                    </Text>
                  </Box>
                  <Box>
                    <Tooltip p={"1em"} hasArrow label={"Data ini menampilkan perkembangan mahasiswa yang mendaftar akun saat HoME berlangsung setiap harinya 🤩"} bg={"white"} color={"#1E1D22"} borderRadius={"md"}>
                      <Center _hover={{ cursor: "pointer" }}>
                        <Icon as={MdInfoOutline} color={"#1E1D22"} w={"0.85em"} h={"0.85em"} ml={"0.25em"} />
                      </Center>
                    </Tooltip>
                  </Box>
                </Flex>
                <Charts jmlPendaftar={dummyJmlMahasiswa} dates={dummyDates} />
              </Box>
            </>
          ) : auth.role === "organisator" ? (
            <>
              <Box w={"full"} mt={"2em"}>
                <Flex justifyContent={"start"} alignItems={"center"}>
                  <Box>
                    <Text color={"#1E1D22"} fontSize="md" fontWeight={"semibold"}>
                      Peserta STATE
                    </Text>
                  </Box>
                  <Box>
                    <Tooltip p={"1em"} hasArrow label={"Data ini menampilkan perkembangan mahasiswa yang mendaftar STATE kamu setiap harinya 🤩"} bg={"white"} color={"#1E1D22"} borderRadius={"md"}>
                      <Center _hover={{ cursor: "pointer" }}>
                        <Icon as={MdInfoOutline} color={"#1E1D22"} w={"0.85em"} h={"0.85em"} ml={"0.25em"} />
                      </Center>
                    </Tooltip>
                  </Box>
                </Flex>
                <Charts jmlPendaftar={dummyJmlPesertaSTATE} dates={dummySTATEDates} />
              </Box>
            </>
          ) : (
            <></>
          )}
        </Box>
      </Layout>
    </>
  );
}
