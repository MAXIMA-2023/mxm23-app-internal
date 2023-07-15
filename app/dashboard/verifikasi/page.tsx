"use client";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Flex,
  Text,
  Divider,
  HStack,
  Switch,
  Link,
  Select,
  Image,
  Button,
  Icon,
} from "@chakra-ui/react";
import { createTheme } from "@mui/material/styles";
import Layout from "@/components/Layout";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";

export default function Dashboard() {
  // data dummy
  const dataSTATE = [
    {
      nama: "Michael Danda Pratama",
      nim: "12345",
      ketOrg: "Panitia",
      ketDiv: "Facio",
    },
    {
      nama: "Zedro Deniro Mason",
      nim: "54321",
      ketOrg: "Organisator",
      ketDiv: "MAPALA",
    },
  ];

  const columnState: MUIDataTableColumn[] = [
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
      label: "Panitia / Organisator",
      name: "ketOrg",
      options: {
        filter: true,
      },
    },
    {
      label: "Divisi / Kategori",
      name: "ketDiv",
      options: {
        filter: true,
      },
    },
    {
      label: "Verifikasi",
      name: "verifAdm",
      options: {
        filter: true,
      },
    },
  ];

  const options = {};

  return (
    <>
      <title>MAXIMA 2023 Internal - Verifikasi</title>
      <Layout title="Verifikasi" showDashboardButton disablePadding>
        <Box w={"full"} overflowY={"auto"} boxShadow={"xs"}>
          <Box w={"full"} mx={4} my={4}>
            <ThemeProvider theme={createTheme()}>
              <MUIDataTable
                title={""}
                data={dataSTATE}
                columns={columnState}
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
