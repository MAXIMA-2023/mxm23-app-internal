"use client";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Flex, Text, Divider, HStack, Switch, Link, Select, Image, Button, Icon } from "@chakra-ui/react";
import { createTheme } from "@mui/material/styles";
import Layout from "@/components/Layout";
import { useReadLocalStorage } from "usehooks-ts";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";

export default function Dashboard() {
  // interface DataMahasiswa {
  //   name: string;
  //   nim: string;
  //   email: string;
  //   stateID: string;
  // }

  // const [mahasiswa, setMahasiswa] = useState<DataMahasiswa[]>([]);
  // const [toggleLoading, setToggleLoading] = useState(false);

  // const jwt = useReadLocalStorage<string | undefined>("token");
  // const [isSkeletonLoading, setIsSkeletonLoading] = useState(false);
  // const headers = {
  //   "x-access-token": jwt!,
  // };

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<DataMahasiswa>();

  // useEffect(() => {
  //   try {
  //     const fetchMhs = async () => {
  //       const res = await axios.get(`${process.env.API_URL}/api`, { headers });
  //       setMahasiswa(res.data);
  //     };
  //     fetchMhs();
  //     console.log(mahasiswa);
  //   } catch (err: any) {
  //     console.log(err);
  //   }
  // }, []);

  const columnsMahasiswa: MUIDataTableColumn[] = [
    {
      label: "Nama",
      name: "nama",
      options: {
        filter: true,
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <Flex w={"12em"} alignItems={"center"}>
              <Text>{value}</Text>
            </Flex>
          );
        },
      },
    },
    {
      label: "NIM",
      name: "nim",
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <HStack>
              <Text>{value}</Text>
            </HStack>
          );
        },
      },
    },
    {
      label: "Email",
      name: "email",
      options: {
        filter: true,
      },
    },
    {
      label: "STATE 1",
      name: "stateID_1",
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <Flex alignItems={"center"}>
              {value} {dataMahasiswa[tableMeta.rowIndex].kehadiran_1 ? <Icon ms={"0.25em"} as={BsCheckCircleFill} w={3} h={3} color="#36AD2C" /> : <Icon ms={"0.25em"} as={BsXCircleFill} w={3} h={3} color="#F43535" />}
            </Flex>
          );
        },
      },
    },
  ];

  const options = {};

  // data dummy
  const dataMahasiswa = [
    {
      nama: "GawrGura1",
      nim: "12345678",
      email: "gawrgura1@student.umn.ac.id",
      stateID_1: "Jcafe",
      kehadiran_1: true,
    },
    {
      nama: "GawrGura2",
      nim: "23456789",
      email: "gawrgura2@student.umn.ac.id",
      stateID_1: "Jcafe",
      kehadiran_1: true,
    },
    {
      nama: "GawrGura3",
      nim: "34567890",
      email: "gawrgura3@student.umn.ac.id",
      stateID_1: "Jcafe",
      kehadiran_1: false,
    },
    {
      nama: "GawrGura4",
      nim: "45678901",
      email: "gawrgura4@student.umn.ac.id",
      stateID_1: "Jcafe",
      kehadiran_1: false,
    },
    {
      nama: "GawrGura5",
      nim: "56789012",
      email: "gawrgura5@student.umn.ac.id",
      stateID_1: "Jcafe",
      kehadiran_1: true,
    },
    {
      nama: "GawrGura6",
      nim: "67890123",
      email: "gawrgura6@student.umn.ac.id",
      stateID_1: "Jcafe",
      kehadiran_1: true,
    },
    {
      nama: "GawrGura7",
      nim: "78901234",
      email: "gawrgura7@student.umn.ac.id",
      stateID_1: "Jcafe",
      kehadiran_1: false,
    },
    {
      nama: "GawrGura8",
      nim: "89012345",
      email: "gawrgura8@student.umn.ac.id",
      stateID_1: "Jcafe",
      kehadiran_1: true,
    },
    {
      nama: "GawrGura9",
      nim: "90123456",
      email: "gawrgura9@student.umn.ac.id",
      stateID_1: "Jcafe",
      kehadiran_1: false,
    },
    {
      nama: "GawrGura10",
      nim: "01234567",
      email: "gawrgura10@student.umn.ac.id",
      stateID_1: "Jcafe",
      kehadiran_1: false,
    },
  ];

  return (
    <>
      <title>MAXIMA 2023 Internal - Mahasiswa</title>
      <Layout title="Mahasiswa" showDashboardButton disablePadding>
        <Box w={"full"} overflowY={"auto"} boxShadow={"xs"}>
          <Box w={"full"} mx={4} my={4}>
            <ThemeProvider theme={createTheme()}>
              <MUIDataTable
                title={""}
                data={dataMahasiswa}
                columns={columnsMahasiswa}
                options={{
                  rowsPerPage: 10,
                  selectableRows: "none",
                  elevation: 1,
                }}
              />
            </ThemeProvider>
          </Box>
        </Box>
      </Layout>
    </>
  );
}
