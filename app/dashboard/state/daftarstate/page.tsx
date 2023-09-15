"use client";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Flex,
  Text,
  Divider,
  HStack,
  Switch,
  Select,
  Image,
  Button,
  Icon,
  Spacer,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Center,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";

import {
  Button as MuiButton,
  IconButton as MuiIconButton,
} from "@mui/material";

import { createTheme } from "@mui/material/styles";
import Layout from "@/components/Layout";
import {
  Controller,
  SubmitHandler,
  useController,
  useForm,
} from "react-hook-form";

import axios from "axios";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";

import {
  MdSearch,
  MdViewColumn,
  MdPrint,
  MdCloudDownload,
  MdFilterList,
  MdAddBox,
  MdDownload
} from "react-icons/md";
import { MdDeleteForever, MdInfo, MdOutlineEdit } from "react-icons/md";

import { useAuth } from "@/contexts/Auth";
import { useRouter } from "next/navigation";

import Swal from "sweetalert2";
import api, { HandleAxiosError, ResponseModel } from "@/services/api";
import { useDropzone } from "react-dropzone";

import DropZone from "@/components/DropZone";

import exportToExcel from "@/components/Excel";

type StateActivites = {
  stateID: number;
  name: string;
  day: string;
  stateLogo: string;
  stateDesc: string;
  location: string;
  quota: number;
  registered: number;
  date: string;
};

type StateActivitiesCreate = Omit<
  StateActivites,
  "stateID" | "stateLogo" | "registered" | "date"
> & {
  stateLogo: File;
};

type DayManagement = {
  day: string;
  hari: number;
  date: string;
};

type ModalContext = {
  mode: "create" | "delete";
  id?: number;
};

export default function DaftarSTATE() {
  const auth = useAuth();
  const router = useRouter();

  // datas
  const [dataSTATE, setDataSTATE] = useState<StateActivites[]>([]);
  const [dataDayManagement, setDataDayManagement] = useState<DayManagement[]>(
    []
  );
  const [fetchLoading, setFetchLoading] = useState<boolean>(true);

  // modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalState, setModalState] = useState<ModalContext | null>(null);
  const [selectedStateAct, setSelectedStateAct] =
    useState<StateActivites | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<StateActivitiesCreate>({ mode: "onSubmit" });

  // const allowedEditPanitia = ["D01", "D02", "D05"];
  const allowedEditPanitia = ["D01", "D02", "D05", "D13"]; // + registrasi

  const loadDataSTATE = async () => {
    try {
      // - kalo superadmin bisa update all,
      // - kalo panitia bisa read all,
      // - organisator cuma bisa read dan update state mereka sendiri
      const { data } = await api.get<StateActivites[]>(`/stateAct/`);
      setDataSTATE(data);
      return;
    } catch (err) {
      console.log(err);
      HandleAxiosError(err);
    }
  };

  const loadDataDayManagement = async () => {
    try {
      // - kalo superadmin bisa update all,
      // - kalo panitia bisa read all,
      // - organisator cuma bisa read dan update state mereka sendiri
      const { data } = await api.get<DayManagement[]>(`/dayManagement/`);
      setDataDayManagement(data);
      return;
    } catch (err) {
      console.log(err);
      HandleAxiosError(err);
    }
  };

  useEffect(() => {
    if (!auth.loading && auth.role !== "panit") {
      Swal.fire("Error!", "Anda tidak memiliki akses ke halaman ini", "error");
      return;
    }
    Promise.all([loadDataDayManagement(), loadDataSTATE()]).finally(() =>
      setFetchLoading(false)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnsSTATE: MUIDataTableColumn[] = [
    {
      label: "ID",
      name: "stateID",
      options: {
        display: false,
        filter: true,
      },
    },
    {
      label: "Nama STATE",
      name: "name",
      options: {
        filter: true,
      },
    },
    {
      label: "Kuota",
      name: "quota",
      options: {
        filter: true,
        customBodyRender: (
          value: Pick<StateActivites, "quota">,
          tableMeta: any
        ) => {
          const rowData = dataSTATE[tableMeta.rowIndex];
          return <Text>{`${rowData.registered}/${rowData.quota}`}</Text>;
        },
      },
    },
  ];

  // semua panit bisa read state

  if (
    // D01, D02, D05 bisa edit state
    (auth.role === "panit" &&
      allowedEditPanitia.includes(auth.user?.divisiID!)) ||
    // organisator bisa edit state mereka sendiri
    (auth.role === "organisator" &&
      dataSTATE.length &&
      dataSTATE.some((state) => state.stateID === auth.user?.stateID))
  ) {
    columnsSTATE.push({
      label: "Aksi",
      name: "aksi",
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          const rowData = dataSTATE[tableMeta.rowIndex];
          return (
            <>
              <Stack direction={"row"}>
                <Link href={`/dashboard/state/details/${rowData.stateID}`}>
                  <MuiButton
                    startIcon={<MdInfo />}
                    sx={{
                      borderRadius: "100px",
                      px: "1em",
                      backgroundColor: "#185C99",
                      color: "#fff",
                      textTransform: "none",
                    }}
                  >
                    Details
                  </MuiButton>
                </Link>
                {auth.user?.divisiID !== "D13" && (
                  <MuiIconButton
                    size="small"
                    sx={{
                      borderRadius: "8px",
                      px: "0.5em",
                      backgroundColor: "red",
                      color: "#fff",
                      textTransform: "none",
                    }}
                    onClick={() => {
                      setModalState({
                        mode: "delete",
                        id: rowData.stateID,
                      });

                      api
                        .get<ResponseModel<StateActivites>>(
                          `/stateAct/${rowData.stateID}`
                        )
                        .then(({ data }) => {
                          setSelectedStateAct(data.data!);
                        })
                        .catch((err) => {
                          HandleAxiosError(err);
                        });

                      onOpen();
                    }}
                  >
                    <MdDeleteForever />
                  </MuiIconButton>
                )}
              </Stack>
            </>
          );
        },
      },
    });
  }

  // biar gak bingung,
  // - kalo kalo dia panit dan role dia ada di allowed array, tampilkan SUPERADMIN
  // - kalo dia panit tapi role dia gak ada di allowed array (kec, inspice - registrasi), tampilkan PANITIA
  // - kalo dia organisator, tampilkan nama state nya
  const showTag =
    auth.role === "panit"
      ? allowedEditPanitia.includes(auth.user?.divisiID!) &&
        auth.user?.divisiID! !== "D13"
        ? "SUPERADMIN"
        : "PANITIA"
      : auth.user?.stateName;

  return (
    <>
      <title>MAXIMA 2023 Internal - STATE</title>
      <Layout title="Daftar STATE" tag={showTag} showDashboardButton>
        <Box w={"full"}>
          {auth.role === "panit" &&
            allowedEditPanitia.includes(auth.user?.divisiID!) &&
            auth.user?.divisiID! !== "D13" && (
              <Flex justifyContent={"flex-end"} mb={"2em"}>
                <Button
                  h={"2.25em"}
                  bgColor={"#185C99"}
                  borderRadius={"full"}
                  _hover={{ bgColor: "#295278" }}
                  onClick={() => {
                    reset();
                    setModalState({
                      mode: "create",
                    });
                    onOpen();
                  }}
                >
                  <Flex alignItems={"center"} color={"white"}>
                    <Icon as={MdAddBox} boxSize={4} />
                    <Text ml={"0.5em"} fontSize={"lg"} fontWeight={"semibold"}>
                      Tambah STATE
                    </Text>
                  </Flex>
                </Button>
              </Flex>
            )}
          <SkeletonText
            isLoaded={!fetchLoading}
            noOfLines={10}
            spacing={8}
            skeletonHeight={12}
          >
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
                  "Daftar STATE",
                  columnsSTATE,
                  dataSTATE
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
          </SkeletonText>
        </Box>
        {/* modal goes here */}
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {modalState?.mode === "create"
                ? `Tambah STATE baru`
                : `Hapus ${selectedStateAct?.name}`}
            </ModalHeader>
            <ModalCloseButton />
            {modalState?.mode === "create" ? (
              <form
                // to handle multipart, please use formData :)
                onSubmit={handleSubmit((data) => {
                  const formData = new FormData();
                  formData.append("name", data.name);
                  formData.append("day", data.day);
                  formData.append("stateDesc", data.stateDesc);
                  formData.append("location", data.location);
                  formData.append("quota", data.quota.toString());
                  formData.append("test_file", data.stateLogo);

                  api
                    .post(`/stateAct/createState/`, formData, {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    })
                    .then((res) => {
                      // refetch
                      loadDataSTATE();
                      Swal.fire(
                        "Berhasil!",
                        "Berhasil membuat STATE",
                        "success"
                      );
                    })
                    .catch((err) => {
                      HandleAxiosError(err);
                    });

                  //
                  // console.log(data);
                  // alert("NOT IMPLEMENTED, please check console");

                  setSelectedStateAct(null);
                  onClose();
                })}
              >
                <ModalBody textColor="#1e1d22">
                  <FormControl isInvalid={!!errors.stateLogo}>
                    <Box w={"full"} mb={"2em"}>
                      <FormLabel
                        fontSize={"md"}
                        fontWeight={"semibold"}
                        color={"#11D22"}
                      >
                        Logo
                      </FormLabel>

                      <Box
                        padding={"1em"}
                        border={"solid #CBD5E0"}
                        width={"100%"}
                        height={"100%"}
                        borderRadius={10}
                        transition={"0.1s ease-in-out"}
                        _hover={{ border: "solid #CBD5E0" }}
                      >
                        <DropZone
                          control={control}
                          name="stateLogo"
                          rules={{
                            required: "Logo STATE tidak boleh kosong.",
                          }}
                        />
                        {/* <Input
                          id="stateLogo"
                          type="file"
                          {...register("stateLogo", {
                            required: "Logo STATE tidak boleh kosong.",
                          })}
                        /> */}
                      </Box>
                      <FormErrorMessage>
                        {errors.stateLogo && errors.stateLogo.message}
                      </FormErrorMessage>
                    </Box>
                  </FormControl>

                  <FormControl isInvalid={!!errors.name}>
                    <FormLabel>Name</FormLabel>
                    <Input
                      id="name"
                      {...register("name", {
                        required: "Nama STATE tidak boleh kosong.",
                        pattern: {
                          value: /^[A-Za-z . & -]*$/,
                          message: "Nama STATE tidak valid",
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {errors.name && errors.name.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.stateDesc}>
                    <FormLabel>Deksripsi</FormLabel>
                    <Textarea
                      id="stateDesc"
                      {...register("stateDesc", {
                        required: "Deskripsi STATE tidak boleh kosong",
                      })}
                    />
                    <FormErrorMessage>
                      {errors.stateDesc && errors.stateDesc.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.location}>
                    <FormLabel>Lokasi</FormLabel>
                    <Input
                      id="location"
                      {...register("location", {
                        required: "Lokasi STATE tidak boleh kosong",
                      })}
                    />
                    <FormErrorMessage>
                      {errors.location && errors.location.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.day}>
                    <FormLabel>Day</FormLabel>
                    <Controller
                      name="day"
                      control={control}
                      defaultValue={"D1"}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          // placeholder="Pilih arah kamera"
                          onChange={onChange}
                          value={value}
                        >
                          {dataDayManagement.map((day) => {
                            const date = new Date(day.date)
                              .toUTCString()
                              .split(" ")
                              .slice(0, 4)
                              .join(" ");
                            const time = new Date(day.date).toLocaleTimeString(
                              "en-GB",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            );
                            return (
                              <option value={day.day} key={day.day}>
                                {date} {time} WIB
                              </option>
                            );
                          })}
                        </Select>
                      )}
                    />
                    <FormErrorMessage>
                      {errors.day && errors.day.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.quota}>
                    <FormLabel>Quota</FormLabel>
                    <Input
                      id="quota"
                      type="number"
                      {...register("quota", {
                        required: "Quota harus diisi",
                        min: { value: 1, message: "Kuota tidak boleh ≤ 0" },
                        max: {
                          value: 200,
                          message: "Kuota tidak boleh lebih dari 200",
                        },
                        valueAsNumber: true,
                      })}
                    />
                    <FormErrorMessage>
                      {errors.quota && errors.quota.message}
                    </FormErrorMessage>
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button type="submit" color="#185C99" mr={3}>
                    Create
                  </Button>
                  <Button
                    color="#185C99"
                    // outlineColor="#185C99"
                    variant="outline"
                    // mr={3}
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                </ModalFooter>
              </form>
            ) : (
              <>
                <ModalBody>
                  <Text>
                    Apakah anda yakin ingin menghapus STATE{" "}
                    {selectedStateAct?.name}?
                  </Text>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="red.500"
                    mr={3}
                    onClick={() => {
                      api
                        .delete(`/stateAct/delete/${selectedStateAct?.stateID}`)
                        .then((res) => {
                          // refetch
                          loadDataSTATE();
                          Swal.fire(
                            "Berhasil!",
                            "Berhasil menghapus STATE",
                            "success"
                          );
                        })
                        .catch((err) => {
                          HandleAxiosError(err);
                        });

                      setSelectedStateAct(null);
                      onClose();
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    color="#185C99"
                    // outlineColor="#185C99"
                    variant="outline"
                    // mr={3}
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </Layout>
    </>
  );
}
