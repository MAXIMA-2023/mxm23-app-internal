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
  Center,
  Icon,
} from "@chakra-ui/react";

import { Checkbox as MuiCheckbox } from "@mui/material";

import { createTheme } from "@mui/material/styles";
import Layout from "@/components/Layout";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";

import { useAuth } from "@/contexts/Auth";
import api, { HandleAxiosError, ResponseModel } from "@/services/api";
import Swal from "sweetalert2";
import LoadingSpinner from "@/components/LoadingSpinner";

type MalpunInternal = {
  name: string;
  nim: number;
  ticketClaimed: boolean;
  isAttendedMalpun: boolean;
  tokenMalpun: string;
};

export default function PesertaInternalMalpun() {
  const auth = useAuth();
  const allowedEditPanitia = ["D01", "D02", "D05", "D13"];

  const [dataMalpun, setDataMalpun] = useState<MalpunInternal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!auth.loading) {
      api
        .get<ResponseModel<MalpunInternal[]>>("/malpun/mabatiket/data")
        .then(({ data }) => {
          setDataMalpun(data.data!);
        })
        .catch(HandleAxiosError)
        .finally(() => setIsLoading(false));
    }
  }, [auth.loading]);

  const columnsMalpun: MUIDataTableColumn[] = [
    {
      label: "Nama",
      name: "name",
      // options: {
      //   filter: true,
      // },
    },
    {
      label: "NIM",
      name: "nim",
      // options: {
      //   filter: true,
      // },
    },
    {
      label: "Token",
      name: "tokenMalpun",
      options: {
        // filter: true,
        display: "false",
      },
    },
    {
      label: "Kehadiran",
      name: "isAttendedMalpun",
      options: {
        customBodyRender: (value: boolean, tableMeta: any, updateValue) => {
          const rowData = dataMalpun[tableMeta.rowIndex];

          return (
            <MuiCheckbox
              checked={Boolean(value)}
              disabled={
                auth.role !== "panit" ||
                !allowedEditPanitia.includes(auth.user?.divisiID!) ||
                value
              }
              onChange={() => {
                Swal.fire({
                  title: "Apakah kamu yakin?",
                  text: `Toggle absensi ${rowData.nim} ${rowData.name}?`,
                  showCancelButton: true,
                  confirmButtonText: "Yakin",
                  cancelButtonText: "Batal",
                  cancelButtonColor: "red",
                  icon: "warning",
                }).then((result) => {
                  if (result.isConfirmed) {
                    api
                      .post("/malpun/absen/", {
                        token: rowData.tokenMalpun,
                      })
                      .then(({ data }) => {
                        Swal.fire(
                          "Berhasil!",
                          `Berhasil mengubah kehadiran ${rowData.name}`,
                          "success"
                        );
                        updateValue(1 as unknown as string); // mui-datatables jelek :(
                      })
                      .catch(HandleAxiosError);
                  }
                });
              }}
            />
          );
        },
      },
    },
  ];

  if (auth.loading || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <title>MAXIMA 2023 Internal - MALPUN (INTERNAL)</title>
      <Layout title="Malpun Internal" showDashboardButton>
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
