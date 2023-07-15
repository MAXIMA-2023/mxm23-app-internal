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
      timeline: "Pendaftaran",
      tlStatus: "Open",
    },
    {
      timeline: "Malam Puncak",
      tlStatus: "Closed",
    },
  ];

  const columnState: MUIDataTableColumn[] = [
    {
      label: "Toggle",
      name: "timeline",
      options: {
        filter: true,
      },
    },
    {
      label: "Status",
      name: "tlStatus",
      options: {
        filter: true,
      },
    },
  ];

  const options = {};

  return (
    <>
      <title>MAXIMA 2023 Internal - Toggles</title>
      <Layout title="Toggles" showDashboardButton disablePadding>
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
