"use client";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Flex, Text, Divider, HStack, Switch, Link, Select, Image, Button } from "@chakra-ui/react";
import { createTheme } from "@mui/material/styles";
import Layout from "@/components/Layout";
import { useReadLocalStorage } from "usehooks-ts";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

export default function Organisator() {
  // interface DataOrganisator {
  //   name: string;
  //   nim: string;
  //   email: string;
  //   stateID: string;
  // }

  // const [organisator, setOrganisator] = useState<DataOrganisator[]>([]);
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
  // } = useForm<DataOrganisator>();

  // useEffect(() => {
  //   try {
  //     const fetchMhs = async () => {
  //       const res = await axios.get(`${process.env.API_URL}/api`, { headers });
  //       setOrganisator(res.data);
  //     };
  //     fetchMhs();
  //     console.log(organisator);
  //   } catch (err: any) {
  //     console.log(err);
  //   }
  // }, []);

  const columnsOrganisator: MUIDataTableColumn[] = [
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
      label: "STATE",
      name: "stateID",
      options: {
        filter: true,
      },
    },
  ];

  const options = {};

  // data dummy
  const dataOrganisator = [
    ["GawrGura1", "12345678", "gawrgura1@student.umn.ac.id", "Jcafe"],
    ["GawrGura2", "23456789", "gawrgura2@student.umn.ac.id", "Mapala"],
    ["GawrGura3", "34567890", "gawrgura3@student.umn.ac.id", "Lions"],
    ["GawrGura4", "45678901", "gawrgura4@student.umn.ac.id", "Fortius"],
    ["GawrGura5", "56789012", "gawrgura5@student.umn.ac.id", "Jcafe"],
    ["GawrGura6", "67890123", "gawrgura6@student.umn.ac.id", "Jcafe"],
    ["GawrGura7", "78901234", "gawrgura7@student.umn.ac.id", "Jcafe"],
    ["GawrGura8", "89012345", "gawrgura8@student.umn.ac.id", "Rencang"],
    ["GawrGura9", "90123456", "gawrgura9@student.umn.ac.id", "BEM"],
    ["GawrGura10", "01234567", "gawrgura10@student.umn.ac.id", "DKBM"],
    ["GawrGura10", "01234567", "gawrgura10@student.umn.ac.id", "DKBM"],
    ["GawrGura10", "01234567", "gawrgura10@student.umn.ac.id", "DKBM"],
    ["GawrGura10", "01234567", "gawrgura10@student.umn.ac.id", "DKBM"],
    ["GawrGura10", "01234567", "gawrgura10@student.umn.ac.id", "DKBM"],
    ["GawrGura10", "01234567", "gawrgura10@student.umn.ac.id", "DKBM"],
    ["GawrGura10", "01234567", "gawrgura10@student.umn.ac.id", "DKBM"],
    ["GawrGura10", "01234567", "gawrgura10@student.umn.ac.id", "DKBM"],
    ["GawrGura10", "01234567", "gawrgura10@student.umn.ac.id", "DKBM"],
    ["GawrGura10", "01234567", "gawrgura10@student.umn.ac.id", "DKBM"],
    ["GawrGura10", "01234567", "gawrgura10@student.umn.ac.id", "DKBM"],
    ["GawrGura10", "01234567", "gawrgura10@student.umn.ac.id", "DKBM"],
    ["GawrGura10", "01234567", "gawrgura10@student.umn.ac.id", "DKBM"],
    ["GawrGura10", "01234567", "gawrgura10@student.umn.ac.id", "DKBM"],
    ["GawrGura10", "01234567", "gawrgura10@student.umn.ac.id", "DKBM"],
    ["GawrGura10", "01234567", "gawrgura10@student.umn.ac.id", "DKBM"],
    ["GawrGura10", "01234567", "gawrgura10@student.umn.ac.id", "DKBM"],
    ["GawrGura10", "01234567", "gawrgura10@student.umn.ac.id", "DKBM"],
    ["GawrGura10", "01234567", "gawrgura10@student.umn.ac.id", "DKBM"],
    ["GawrGura10", "01234567", "gawrgura10@student.umn.ac.id", "DKBM"],
    ["GawrGura10", "01234567", "gawrgura10@student.umn.ac.id", "DKBM"],
    ["GawrGura10", "01234567", "gawrgura10@student.umn.ac.id", "DKBM"],
    ["GawrGura10", "01234567", "gawrgura10@student.umn.ac.id", "DKBM"],
    ["GawrGura10", "01234567", "gawrgura10@student.umn.ac.id", "DKBM"],
    ["GawrGura10", "01234567", "gawrgura10@student.umn.ac.id", "DKBM"],
    ["GawrGura10", "01234567", "gawrgura10@student.umn.ac.id", "DKBM"],
    ["GawrGura10", "01234567", "gawrgura10@student.umn.ac.id", "DKBM"],
    ["GawrGura10", "01234567", "gawrgura10@student.umn.ac.id", "DKBM"],
  ];

  return (
    <>
      <title>MAXIMA 2023 Internal - Organisator</title>
      <Layout title="Organisator" showDashboardButton>
        <Box w={"full"}>
          <ThemeProvider theme={createTheme()}>
            <MUIDataTable
              title={""}
              data={dataOrganisator}
              columns={columnsOrganisator}
              options={{
                rowsPerPage: 10,
                selectableRows: "none",
                elevation: 1,
                tableBodyHeight: "70vh",
                tableBodyMaxHeight: "70vh",
              }}
            />
          </ThemeProvider>
        </Box>
      </Layout>
    </>
  );
}
