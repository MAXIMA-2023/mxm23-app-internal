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
import { Switch as MuiSwitch } from "@mui/material";
import Layout from "@/components/Layout";

import api, { HandleAxiosError, ResponseModel } from "@/services/api";
import { useAuth } from "@/contexts/Auth";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

type Toggles = {
  timeline: string;
  isOpen: boolean;
};

export default function Dashboard() {
  const auth = useAuth();
  const route = useRouter();

  // data dummy -- nunggu backend
  const [dataToggles, setDataToggles] = useState<Toggles[]>([
    {
      timeline: "Pendaftaran",
      isOpen: true,
    },
    {
      timeline: "Malam Puncak",
      isOpen: true,
    },
  ]);

  const loadTogglesData = async () => {
    try {
      const { data } = await api.get<ResponseModel<Toggles[]>>("/toggles");
      setDataToggles(data.data!);
    } catch (error) {
      console.log(error);
      HandleAxiosError(error);
    }
  };
  const superAdmin = ["D01", "D02"];

  useEffect(() => {
    if (
      !auth.loading &&
      auth.role !== "panit" &&
      !superAdmin.includes(auth.user?.divisiID!)
    ) {
      Swal.fire("Error!", "Anda tidak memiliki akses!", "error");
      route.push("/dashboard");
      return;
    }
    // loadTogglesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnsToggles: MUIDataTableColumn[] = [
    {
      label: "Toggle",
      name: "timeline",
      options: {
        filter: true,
      },
    },
    {
      label: "Status",
      name: "status",
      options: {
        filter: true,
        customBodyRender: (value: boolean, tableMeta, updateValue) => {
          return (
            <MuiSwitch
              checked={value}
              onChange={() => {
                // tunggu backend :)

                // api
                //   .put(
                //     `/toggle/data${tableMeta.rowData[0]}`,
                //     {
                //       isverified: !value,
                //     }
                //   )
                //   // iyaa tau emg ini jelek, yang penting work😂
                //   // gua ga ngerti cara masukkin types ke customBodyRender, yg penting typescript nya bungkam
                //   .then((res) => updateValue(!value as unknown as string))
                //   .catch((err) => {
                //     console.log(err);
                //     HandleAxiosError(err);
                //   });

                // buat dummy data
                updateValue(!value as unknown as string);
              }}
            />
          );
        },
      },
    },
  ];

  const options = {};

  return (
    <>
      <title>MAXIMA 2023 Internal - Toggles</title>
      <Layout title="Toggles" tag="SUPERADMIN" showDashboardButton>
        <Box w={"full"}>
          <ThemeProvider theme={createTheme()}>
            <MUIDataTable
              title={""}
              data={dataToggles}
              columns={columnsToggles}
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
