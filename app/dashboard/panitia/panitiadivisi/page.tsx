"use client";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Flex, Text, Divider, HStack, Switch, Link, Select, Image, Button, SkeletonText, Icon } from "@chakra-ui/react";
import { createTheme } from "@mui/material/styles";
import Layout from "@/components/Layout";
import api, { ResponseModel, HandleAxiosError } from "@/services/api";
import { useAuth } from "@/contexts/Auth";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { MdDownload } from "react-icons/md";

import exportToExcel from "@/components/Excel";

type Panitia = {
  nim: number;
  name: string;
  email: string;
  isverified: boolean;
  divisiID: string;
  divisiName: string;
};

export default function PanitiaDivisi() {
  const [dataPanitia, setDataPanitia] = useState<Panitia[]>([]);
  const [fetchLoading, setFetchLoading] = useState<boolean>(true);
  const auth = useAuth();
  const route = useRouter();

  const columnsPanitia: MUIDataTableColumn[] = [
    {
      label: "Nama",
      name: "name",
      options: {
        filter: true,
      },
    },
    {
      label: "NIM",
      name: "nim",
      options: {
        filter: true,
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
      label: "Divisi",
      name: "divisiName",
      options: {
        filter: true,
      },
    },
  ];

  useEffect(() => {
    if (!auth.loading && auth.role !== "panit") {
      Swal.fire("Error!", "Maaf, anda tidak memiliki akses ke page ini", "error");
      route.push("/dashboard");
      return;
    }

    const loadDataPanit = async () => {
      try {
        const { data } = await api.get<ResponseModel<Panitia[]>>(`panit/data`);
        setDataPanitia(data.data!.filter((panitia) => panitia.divisiID === auth.user?.divisiID));
      } catch (error) {
        console.log(error);
        HandleAxiosError(error);
      }
    };
    loadDataPanit().finally(() => setFetchLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <title>MAXIMA 2023 Internal - Organisator</title>
      <Layout title={"Panitia Divisi"} tag={auth.user?.divisiName} showDashboardButton>
        <Box w={"full"}>
        <Flex justifyContent={"flex-end"}>
            <Button
                h={"2.25em"}
                mt={"1em"}
                mb={"1em"}
                bgColor="#185C99"
                borderRadius="full"
                _hover={{ bgColor: "#295278" }}
                onClick={() =>
                  exportToExcel(
                  "Daftar Panitia Divisi",
                  columnsPanitia,
                  dataPanitia
                  )
                }
              >
                <Flex alignItems="center" color="white">
                  <Icon as={MdDownload} boxSize={4} />
                    <Text ml="0.5em" fontSize="lg" fontWeight="semibold">
                      Export to Excel
                    </Text>
                </Flex>
              </Button>
            </Flex>
          <SkeletonText isLoaded={!fetchLoading} noOfLines={10} spacing={8} skeletonHeight={12}>
            <ThemeProvider theme={createTheme()}>
              <MUIDataTable
                title={""}
                data={dataPanitia}
                columns={columnsPanitia}
                options={{
                  rowsPerPage: 10,
                  selectableRows: "none",
                  elevation: 1,
                  tableBodyHeight: "70vh",
                  tableBodyMaxHeight: "70vh",
                }}
              />
            </ThemeProvider>
             {/* button buat export */}
              <Button
              onClick={() =>
                exportToExcel(
                  "Panitia Divisi",
                  columnsPanitia,
                  dataPanitia
                )
              }
            >
              Export to Excel
            </Button>
          </SkeletonText>
        </Box>
      </Layout>
    </>
  );
}
