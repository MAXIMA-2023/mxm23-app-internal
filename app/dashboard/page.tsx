"use client";
import React, { useRef, useEffect, useState, MutableRefObject } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/Auth";
import {
  Text,
  Box,
  Flex,
  Icon,
  Tooltip,
  Center,
  Skeleton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  MdOutlineShield,
  MdOutlineSchool,
  MdOutlineAirplanemodeActive,
  MdInfoOutline,
} from "react-icons/md";
import { HiOutlineOfficeBuilding, HiOutlineSparkles } from "react-icons/hi";
import Charts from "@/components/Charts";
import { useRouter } from "next/navigation";
import api, { HandleAxiosError, ResponseModel } from "@/services/api";

// response
type StatisticMahasiswaResponse = {
  maxTown: DetailsMahasiswa[];
  home: DetailsMahasiswa[];
};

type DetailsMahasiswa = {
  date: string;
  registered: number;
};

type StatisticSTATEResponse = {
  name: string;
  statistic: DetailsMahasiswa[];
};

// state
type StatisticMahasiwa = {
  date: string[];
  registered: number[];
};

type PanitiaTabData = {
  totalPanit: number;
  totalPanitPerDivisi: number;
  totalOrg: number;
  totalMaba: number;
  totalMabaState: number;
};

export default function Dashboard() {
  const router = useRouter();
  const auth = useAuth();
  const [width, setWidth] = useState(0);
  const cardRef = useRef() as MutableRefObject<HTMLDivElement>;

  const [fetchLoading, setFetchLoading] = useState(true);

  const [statisticMahasiswa, setStatisticMahasiswa] =
    useState<StatisticMahasiwa>({
      date: [],
      registered: [],
    });

  // todo: tunggu api malpun, add totalMalpun
  const [panitiaTabData, setPanitiaTabData] = useState<PanitiaTabData>({
    totalPanit: 0,
    totalPanitPerDivisi: 0,
    totalOrg: 0,
    totalMaba: 0,
    totalMabaState: 0,
  });

  const [organisatorTabData, setOrganisatorTabData] = useState<number>(0);

  const yaxisMaxValue = auth.role === "panit" ? 1000 : 200;

  useEffect(() => {
    if (!auth.loading && auth.role === "panit") {
      const fetchPanitiaTabData = async () => {
        try {
          const { data } = await api.get<ResponseModel<PanitiaTabData>>(
            "/panit/data/stat"
          );
          setPanitiaTabData(data.data!);
        } catch (error) {
          HandleAxiosError(error);
        }
      };

      const fetchStatisticMahasiswa = async () => {
        try {
          const { data } = await api.get<
            ResponseModel<StatisticMahasiswaResponse>
          >("/mahasiswa/statistic");

          const combined = [...data.data?.maxTown!, ...data.data?.home!];
          setStatisticMahasiswa({
            date: combined.map((item) => item.date),
            registered: combined.map((item) => item.registered),
          });
        } catch (error) {
          HandleAxiosError(error);
        }
      };

      Promise.all([fetchPanitiaTabData(), fetchStatisticMahasiswa()]).finally(
        () => setFetchLoading(false)
      );
    }

    if (!auth.loading && auth.role === "organisator") {
      const fetchOrganisatorTabData = async () => {
        try {
          const { data } = await api.get<ResponseModel<number>>(
            "/organisator/data/stat"
          );
          setOrganisatorTabData(data.data!);
        } catch (error) {
          HandleAxiosError(error);
        }
      };

      const fetchStatisticSTATE = async () => {
        try {
          const { data } = await api.get<ResponseModel<StatisticSTATEResponse>>(
            `/organisator/state/statistik/${auth.user?.stateID}`
          );
          setStatisticMahasiswa({
            date: data.data?.statistic.map((item) => item.date) ?? [],
            registered:
              data.data?.statistic.map((item) => item.registered) ?? [],
          });
        } catch (error) {
          HandleAxiosError(error);
        }
      };

      Promise.all([fetchOrganisatorTabData(), fetchStatisticSTATE()]).finally(
        () => setFetchLoading(false)
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  // for card width
  useEffect(() => {
    if (cardRef.current) {
      setWidth(cardRef.current.scrollWidth - cardRef.current.offsetWidth);
    }
  }, [cardRef]);

  const tabsPanitia = [
    {
      name: "Panitia",
      href: "/dashboard/panitia/daftarpanitia",
      icon: MdOutlineShield,
      bgColor: "#E7EDFE",
      iconBgColor: "#185C99",
      tooltipLabel: "Data ini menampilkan jumlah panitia yang terdaftar",
      tooltipIcon: "Panitia",
      total: panitiaTabData.totalPanit,
    },
    {
      name: "Panitia Divisi",
      href: "/dashboard/panitia/panitiadivisi",
      icon: MdOutlineShield,
      bgColor: "#E7EDFE",
      iconBgColor: "#185C99",
      tooltipLabel: `Data ini menampilkan jumlah panitia divisi ${auth.user?.divisiName} yang terdaftar`,
      tooltipIcon: "Panitia",
      total: panitiaTabData.totalPanitPerDivisi,
    },
    {
      name: "Organisator",
      href: "/dashboard/organisator",
      icon: HiOutlineOfficeBuilding,
      bgColor: "#FEE7E7",
      iconBgColor: "#E53E3E",
      tooltipLabel:
        "Data ini menampilkan jumlah PIC organisator yang terdaftar",
      tooltipIcon: "Organisator",
      total: panitiaTabData.totalOrg,
    },
    {
      name: "Mahasiswa",
      href: "/dashboard/mahasiswa",
      icon: MdOutlineSchool,
      bgColor: "#FEF5E7",
      iconBgColor: "#D77300",
      tooltipLabel: "Data ini menampilkan jumlah mahasiswa yang terdaftar",
      tooltipIcon: "Mahasiswa",
      total: panitiaTabData.totalMaba,
    },
    {
      name: "STATE",
      href: "/dashboard/state/daftarstate ",
      icon: MdOutlineAirplanemodeActive,
      bgColor: "#ECE7FE",
      iconBgColor: "#4A05DE",
      tooltipLabel:
        "Data ini menampilkan jumlah mahasiswa yang mengikuti STATE",
      tooltipIcon: "STATE",
      total: panitiaTabData.totalMabaState,
    },
    {
      name: "Malpun",
      href: "/dashboard/malpun/peserta ",
      icon: HiOutlineSparkles,
      bgColor: "#FEE7FC",
      iconBgColor: "#DE05C8",
      tooltipLabel:
        "Data ini menampilkan jumlah mahasiswa yang mengikuti Malam Puncak",
      tooltipIcon: "Malpun",
      total: 0, // todo: tunggu api malpun
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
      total: organisatorTabData,
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
            <Box
              as={motion.div}
              overflowX={"hidden"}
              cursor={"grab"}
              whileTap={{ cursor: "grabbing" }}
            >
              <Skeleton isLoaded={!fetchLoading}>
                <Flex
                  as={motion.div}
                  w={"full"}
                  maxW={"full"}
                  mt={"0.5em"}
                  drag={"x"}
                  dragConstraints={{ right: 0, left: -width }}
                  ref={cardRef}
                >
                  {auth.role === "panit" ? (
                    <>
                      {tabsPanitia.map((tab, index) => (
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
                              <Flex
                                w={"full"}
                                justifyContent={"start"}
                                alignItems={"center"}
                              >
                                <Box
                                  _hover={{
                                    textDecoration: "underline",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    router.push(tab.href);
                                  }}
                                >
                                  <Text fontSize={"md"} fontWeight={"medium"}>
                                    {tab.name}
                                  </Text>
                                </Box>
                                <Tooltip
                                  p={"1em"}
                                  hasArrow
                                  label={tab.tooltipLabel}
                                  bg={"white"}
                                  color={"#1E1D22"}
                                  borderRadius={"md"}
                                >
                                  <Center _hover={{ cursor: "pointer" }}>
                                    <Icon
                                      as={MdInfoOutline}
                                      color={"#1E1D22"}
                                      w={"0.85em"}
                                      h={"0.85em"}
                                      ml={"0.25em"}
                                    />
                                  </Center>
                                </Tooltip>
                              </Flex>
                              <Tooltip
                                p={"0.5em"}
                                hasArrow
                                label={tab.tooltipIcon}
                                bg={"white"}
                                color={"#1E1D22"}
                                borderRadius={"md"}
                              >
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
                      <Box
                        as={motion.div}
                        minW={"15em"}
                        h={"7.5em"}
                        p={"1em"}
                        bg={tabsOrganisator[0].bgColor}
                        mr={"1em"}
                        mb={"1em"}
                        borderRadius={"lg"}
                      >
                        <Box w={"full"} h={"auto"}>
                          <Flex
                            w={"full"}
                            h={"auto"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                          >
                            <Flex
                              w={"full"}
                              justifyContent={"start"}
                              alignItems={"center"}
                            >
                              <Box
                                _hover={{
                                  textDecoration: "underline",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  router.push(tabsOrganisator[0].href);
                                }}
                              >
                                <Text fontSize={"md"} fontWeight={"medium"}>
                                  {tabsOrganisator[0].name}
                                </Text>
                              </Box>
                              <Tooltip
                                p={"1em"}
                                hasArrow
                                label={tabsOrganisator[0].tooltipLabel}
                                bg={"white"}
                                color={"#1E1D22"}
                                borderRadius={"md"}
                              >
                                <Center _hover={{ cursor: "pointer" }}>
                                  <Icon
                                    as={MdInfoOutline}
                                    color={"#1E1D22"}
                                    w={"0.85em"}
                                    h={"0.85em"}
                                    ml={"0.25em"}
                                  />
                                </Center>
                              </Tooltip>
                            </Flex>
                            <Tooltip
                              p={"0.5em"}
                              hasArrow
                              label={tabsOrganisator[0].tooltipIcon}
                              bg={"white"}
                              color={"#1E1D22"}
                              borderRadius={"md"}
                            >
                              <Box
                                ml={"auto"}
                                bg={tabsOrganisator[0].iconBgColor}
                                w={"1.5em"}
                                h={"1.5em"}
                                borderRadius={"50%"}
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                              >
                                <Icon
                                  as={tabsOrganisator[0].icon}
                                  color={"white"}
                                  w={"1em"}
                                  h={"1em"}
                                />
                              </Box>
                            </Tooltip>
                          </Flex>
                          <Box w={"full"} h={"auto"} mt={"1em"}>
                            <Text fontSize={"3xl"} fontWeight={"semibold"}>
                              {tabsOrganisator[0].total}
                            </Text>
                          </Box>
                        </Box>
                      </Box>
                    </>
                  ) : (
                    <></>
                  )}
                </Flex>
              </Skeleton>
            </Box>
          </Box>
          <Skeleton isLoaded={!fetchLoading}>
            <Box w={"full"} mt={"2em"}>
              <Flex justifyContent={"start"} alignItems={"center"}>
                <Box>
                  <Text color={"#1E1D22"} fontSize="md" fontWeight={"semibold"}>
                    Mahasiswa
                  </Text>
                </Box>
                <Box>
                  <Tooltip
                    p={"1em"}
                    hasArrow
                    label={
                      auth.role === "panit"
                        ? "Data ini menampilkan perkembangan mahasiswa yang mendaftar akun saat MaxTown dan HoME berlangsung setiap harinya 🤩"
                        : "Data ini menampilkan perkembangan mahasiswa yang mendaftar STATE kamu setiap harinya 🤩"
                    }
                    bg={"white"}
                    color={"#1E1D22"}
                    borderRadius={"md"}
                  >
                    <Center _hover={{ cursor: "pointer" }}>
                      <Icon
                        as={MdInfoOutline}
                        color={"#1E1D22"}
                        w={"0.85em"}
                        h={"0.85em"}
                        ml={"0.25em"}
                      />
                    </Center>
                  </Tooltip>
                </Box>
              </Flex>
              <Charts
                jmlPendaftar={statisticMahasiswa.registered}
                dates={statisticMahasiswa.date}
                yaxisMax={yaxisMaxValue}
              />
            </Box>
          </Skeleton>
        </Box>
      </Layout>
    </>
  );
}
