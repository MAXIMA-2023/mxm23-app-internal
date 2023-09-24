"use client";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Flex, Text, Divider, HStack, Switch, Link, Select, Image, Button, Center, Icon } from "@chakra-ui/react";
import { createTheme } from "@mui/material/styles";
import Layout from "@/components/Layout";
import { useReadLocalStorage } from "usehooks-ts";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";

export default function PesertExternalaMalpun() {
  const columnsMalpun: MUIDataTableColumn[] = [
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
      label: "Email",
      name: "email",
      options: {
        filter: true,
      },
    },
    {
      label: "No. WhatsApp",
      name: "whatsapp",
      options: {
        filter: true,
      },
    },
    {
      label: "Kehadiran",
      name: "kehadiran",
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return <>{value ? <Icon as={BsCheckCircleFill} w={5} h={5} color="#36AD2C" /> : <Icon as={BsXCircleFill} w={5} h={5} color="#F43535" />}</>;
        },
      },
    },
  ];

  const options = {};

  // data dummy
  const dataMalpun = [
    ["GawrGura1", "gawrgura1@student.umn.ac.id", true],
    ["GawrGura2", "gawrgura2@student.umn.ac.id", false],
    ["GawrGura3", "gawrgura3@student.umn.ac.id", true],
    ["GawrGura4", "gawrgura4@student.umn.ac.id", true],
    ["GawrGura5", "gawrgura5@student.umn.ac.id", false],
    ["GawrGura6", "gawrgura6@student.umn.ac.id", true],
    ["GawrGura7", "gawrgura7@student.umn.ac.id", true],
    ["GawrGura8", "gawrgura8@student.umn.ac.id", true],
    ["GawrGura9", "gawrgura9@student.umn.ac.id", false],
    ["GawrGura10", "gawrgura10@student.umn.ac.id", false],
  ];

  return (
    <>
      <title>MAXIMA 2023 Internal - MALPUN (EXTERNAL)</title>
      <Layout title="Malpun External" showDashboardButton>
        <Box w={"full"}>
          <ThemeProvider theme={createTheme()}>
            <MUIDataTable
              title={""}
              data={dataMalpun}
              columns={columnsMalpun}
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
