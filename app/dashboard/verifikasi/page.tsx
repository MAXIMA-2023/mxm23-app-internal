"use client";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Box, SkeletonText } from "@chakra-ui/react";
import { createTheme } from "@mui/material/styles";
import Layout from "@/components/Layout";
import { Switch as MuiSwitch } from "@mui/material";
import api, { HandleAxiosError, ResponseModel } from "@/services/api";
import { useAuth } from "@/contexts/Auth";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

type Organisator = {
  nim: number;
  name: string;
  email: string;
  stateID: number;
  isverified: number;
  stateName: string;
  role?: string;
  stateOrDivisiName: string;
};

type Panitia = {
  nim: number;
  name: string;
  email: string;
  isverified: boolean;
  divisiID: string;
  divisiName: string;
  role?: string;
  stateOrDivisiName: string;
};

export default function Dashboard() {
  const auth = useAuth();
  const route = useRouter();
  const [dataVerifikasi, setDataVerifikasi] = useState<
    (Panitia | Organisator)[]
  >([]);
  const [fetchLoading, setFetchLoading] = useState<boolean>(true);

  const loadVerifikasiData = async () => {
    try {
      const { data: responsePanit } = await api.get<ResponseModel<Panitia[]>>(
        "/panit/data"
      );
      const { data: respOrganisator } = await api.get<
        ResponseModel<Organisator[]>
      >("/organisator/data");

      // yes ik this is ugly, but its better than handling a nested array with 3 different types
      const dataPanitia = responsePanit.data?.map((panitia) => ({
        ...panitia,
        role: "Panitia",
        stateOrDivisiName: panitia.divisiName,
      }));
      const dataOrganisator = respOrganisator.data?.map((organisator) => ({
        ...organisator,
        role: "Organisator",
        stateOrDivisiName: organisator.stateName,
      }));

      setDataVerifikasi([...dataPanitia!, ...dataOrganisator!]);
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
      Swal.fire("Error!", "Anda tidak memiliki akses ke halaman ini", "error");
      route.push("/dashboard");
      return;
    }
    loadVerifikasiData().finally(() => setFetchLoading(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnsVerifikasi: MUIDataTableColumn[] = [
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
      label: "Panitia / Organisator",
      name: "role",
      options: {
        filter: true,
      },
    },
    {
      label: "Divisi / Kategori",
      name: "stateOrDivisiName",
      options: {
        filter: true,
      },
    },
    {
      label: "Verifikasi",
      name: "isverified",
      options: {
        filter: true,
        customBodyRender: (value: boolean, tableMeta, updateValue) => {
          return (
            <MuiSwitch
              checked={value}
              onChange={() => {
                api
                  .put(
                    `/${
                      tableMeta.rowData[2] === "Panitia"
                        ? "panit"
                        : "organisator"
                    }/verifyAcc/${tableMeta.rowData[1]}`,
                    {
                      isverified: !value,
                    }
                  )
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

  return (
    <>
      <title>MAXIMA 2023 Internal - Verifikasi</title>
      <Layout title="Verifikasi" tag="SUPERADMIN" showDashboardButton>
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
                data={dataVerifikasi}
                columns={columnsVerifikasi}
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
