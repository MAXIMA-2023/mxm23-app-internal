"use client"
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Flex, Text, Divider, HStack, Switch, Link, Select, Image, Button } from "@chakra-ui/react";
import { createTheme } from "@mui/material/styles";
import Layout from "@/components/Layout";
import { useReadLocalStorage } from "usehooks-ts";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

export default function PesertaMalpun() {

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
    label: "Kehadiran",
    name: "",
    options: {
      filter: true,
    },
  },
];

const options = {
};

// data dummy
const dataMahasiswa = [
  ["GawrGura1", "12345678", "gawrgura1@student.umn.ac.id", null],
  ["GawrGura2", "23456789", "gawrgura2@student.umn.ac.id", null],
  ["GawrGura3", "34567890", "gawrgura3@student.umn.ac.id", null],
  ["GawrGura4", "45678901", "gawrgura4@student.umn.ac.id", null],
  ["GawrGura5", "56789012", "gawrgura5@student.umn.ac.id", null],
  ["GawrGura6", "67890123", "gawrgura6@student.umn.ac.id", null],
  ["GawrGura7", "78901234", "gawrgura7@student.umn.ac.id", null],
  ["GawrGura8", "89012345", "gawrgura8@student.umn.ac.id", null],
  ["GawrGura9", "90123456", "gawrgura9@student.umn.ac.id", null],
  ["GawrGura10", "01234567", "gawrgura10@student.umn.ac.id", null],
];

return (
  <>
  <title>MAXIMA 2023 Internal - MALPUN</title>
  <Layout title="MALPUN" showDashboardButton disablePadding>
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