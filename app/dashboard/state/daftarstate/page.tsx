"use client";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Flex, Text, Divider, HStack, Switch, Link, Select, Image, Button, Icon, Spacer } from "@chakra-ui/react";
import { createTheme } from "@mui/material/styles";
import Layout from "@/components/Layout";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { MdSearch, MdViewColumn, MdPrint, MdCloudDownload, MdFilterList } from "react-icons/md";
import { MdDeleteForever, MdInfo, MdOutlineEdit } from "react-icons/md";

export default function DaftarSTATE() {
  // data dummy
  const dataSTATE = [
    {
      namaSTATE: "MAPALA",
      kuotaCurr: "40",
      kuotaMax: "100",
    },
    {
      namaSTATE: "Mufomic",
      kuotaCurr: "50",
      kuotaMax: "100",
    },
    {
      namaSTATE: "Jcafe",
      kuotaCurr: "80",
      kuotaMax: "100",
    },
    {
      namaSTATE: "Ultima Sonora",
      kuotaCurr: "74",
      kuotaMax: "100",
    },
    {
      namaSTATE: "Fortius E-Sport",
      kuotaCurr: "68",
      kuotaMax: "100",
    },
    {
      namaSTATE: "HMIF",
      kuotaCurr: "37",
      kuotaMax: "50",
    },
    {
      namaSTATE: "Teater Katak",
      kuotaCurr: "113",
      kuotaMax: "200",
    },
    {
      namaSTATE: "MAPALA2",
      kuotaCurr: "40",
      kuotaMax: "100",
    },
    {
      namaSTATE: "MAPALA3",
      kuotaCurr: "40",
      kuotaMax: "100",
    },
    {
      namaSTATE: "MAPALA4",
      kuotaCurr: "40",
      kuotaMax: "100",
    },
    {
      namaSTATE: "MAPALA5",
      kuotaCurr: "40",
      kuotaMax: "100",
    },
  ];

  const columnsSTATE: MUIDataTableColumn[] = [
    {
      label: "Nama STATE",
      name: "namaSTATE",
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
      label: "Kuota",
      name: "kuotaCurr",
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          const rowData = dataSTATE[tableMeta.rowIndex];
          const kuotaMax = rowData.kuotaMax;
          return (
            <HStack>
              <Text>{`${value}/${kuotaMax}`}</Text>
            </HStack>
          );
        },
      },
    },
    {
      label: "Aksi",
      name: "aksi",
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <>
              {" "}
              <Flex justifyContent="center" gap={3}>
                {" "}
                <Button rounded="25px" colorScheme="teal" variant="solid">
                  <MdInfo />
                  <Spacer mx={1} />
                  Detail{" "}
                </Button>{" "}
                <Button rounded="25px" colorScheme="teal" variant="solid">
                  <MdOutlineEdit />
                  <Spacer mx={1} />
                  Sunting{" "}
                </Button>{" "}
                <Button rounded="25px" colorScheme="red" variant="solid">
                  <MdDeleteForever />{" "}
                </Button>{" "}
              </Flex>
            </>
          );
        },
      },
    },
  ];

  const options = {};

  return (
    <>
      <title>MAXIMA 2023 Internal - STATE</title>
      <Layout title="Daftar STATE" showDashboardButton>
        <Box w={"full"}>
          <ThemeProvider theme={createTheme()}>
            <MUIDataTable
              title={""}
              data={dataSTATE}
              columns={columnsSTATE}
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
