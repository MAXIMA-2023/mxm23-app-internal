"use client";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@chakra-ui/react";
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
};

type Panitia = {
  nim: number;
  name: string;
  email: string;
  isverified: boolean;
  divisiID: string;
  divisiName: string;
};

export default function Dashboard() {
  const auth = useAuth();
  const route = useRouter();
  const [dataVerifikasi, setDataVerifikasi] = useState<
    (string | number | boolean)[][]
  >([]);

  const loadVerifikasiData = async () => {
    try {
      const { data: responsePanit } = await api.get<ResponseModel<Panitia[]>>(
        "/panit/data"
      );
      const { data: respOrganisator } = await api.get<
        ResponseModel<Organisator[]>
      >("/organisator/data");

      const dataPanitia = responsePanit.data?.map((panitia) => [
        panitia.name,
        panitia.nim,
        "Panitia",
        panitia.divisiName,
        panitia.isverified,
      ]);

      const dataOrganisator = respOrganisator.data?.map((organisator) => [
        organisator.name,
        organisator.nim,
        "Organisator",
        organisator.stateName,
        organisator.isverified,
      ]);

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
      auth.role !== "panit" &&
      !superAdmin.includes(auth.user?.divisiID!)
    ) {
      Swal.fire("Error!", "Anda tidak memiliki akses ke halaman ini", "error");
      route.push("/dashboard");
      return;
    }
    loadVerifikasiData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnsVerifikasi: MUIDataTableColumn[] = [
    {
      label: "Nama",
      name: "nama",
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
      name: "ketOrg",
      options: {
        filter: true,
      },
    },
    {
      label: "Divisi / Kategori",
      name: "ketDiv",
      options: {
        filter: true,
      },
    },
    {
      label: "Verifikasi",
      name: "verifAdm",
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
        </Box>
      </Layout>
    </>
  );
}
