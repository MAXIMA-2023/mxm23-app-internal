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
  SkeletonText,
} from "@chakra-ui/react";
import { createTheme } from "@mui/material/styles";
import { Switch as MuiSwitch } from "@mui/material";
import Layout from "@/components/Layout";

import api, { HandleAxiosError, ResponseModel } from "@/services/api";
import { useAuth } from "@/contexts/Auth";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

type Toggles = {
  id: number;
  name: string;
  toggle: boolean;
};

export default function Dashboard() {
  const auth = useAuth();
  const route = useRouter();

  const [dataToggles, setDataToggles] = useState<Toggles[]>([]);
  const [fetchLoading, setFetchLoading] = useState<boolean>(true);

  const loadTogglesData = async () => {
    try {
      const { data } = await api.get<Toggles[]>("/toggle");
      setDataToggles(data);
    } catch (error) {
      console.log(error);
      HandleAxiosError(error);
    }
  };
  const superAdmin = ["D01", "D02"];

  useEffect(() => {
    if (
      !auth.loading &&
      (auth.role !== "panit" || !superAdmin.includes(auth.user?.divisiID!))
    ) {
      Swal.fire("Error!", "Anda tidak memiliki akses!", "error");
      route.push("/dashboard");
      return;
    }
    loadTogglesData().finally(() => setFetchLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnsToggles: MUIDataTableColumn[] = [
    {
      label: "ID",
      name: "id",
      options: {
        filter: true,
        display: false,
      },
    },
    {
      label: "Toggle",
      name: "name",
      options: {
        filter: true,
      },
    },
    {
      label: "Status",
      name: "toggle",
      options: {
        filter: true,
        customBodyRender: (value: boolean, tableMeta, updateValue) => {
          return (
            <MuiSwitch
              checked={value}
              onChange={() => {
                api
                  .put(`/toggle/updateToggle/${tableMeta.rowData[0]}`, {
                    toggle: !value,
                  })
                  // iyaa tau emg ini jelek, yang penting work😂
                  // gua ga ngerti cara masukkin types ke customBodyRender, yg penting typescript nya bungkam
                  .then((res) => updateValue(!value as unknown as string))
                  .catch((err) => {
                    console.log(err);
                    HandleAxiosError(err);
                  });
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
          <SkeletonText
            isLoaded={!fetchLoading}
            noOfLines={10}
            spacing={8}
            skeletonHeight={12}
          >
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
          </SkeletonText>
        </Box>
      </Layout>
    </>
  );
}
