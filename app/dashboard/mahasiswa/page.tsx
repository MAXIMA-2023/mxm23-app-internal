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
  useDisclosure,
  Stack,
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
  SkeletonText,
} from "@chakra-ui/react";
import { createTheme } from "@mui/material/styles";
import {
  Button as MuiButton,
  IconButton as MuiIconButton,
} from "@mui/material";

import Layout from "@/components/Layout";
import { Controller, SubmitHandler, set, useForm } from "react-hook-form";

import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { MdDeleteForever, MdOutlineEdit } from "react-icons/md";
import api, { HandleAxiosError, ResponseModel } from "@/services/api";
import { useAuth } from "@/contexts/Auth";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import LoadingSpinner from "@/components/LoadingSpinner";

type StateStatus = {
  stateID: number;
  stateName: string;
  nim: number;
  day: string;
  attendanceTime: null | string;
  isFirstAttended: number;
  isLastAttended: number;
};

type Mahasiswa = {
  nim: number;
  name: string;
  email: string;
  whatsapp: string;
  angkatan: number;
  idLine: string;
  prodi: string;
  token: string;
  state: StateStatus[];
};

type ProfileMahasiswa = Omit<Mahasiswa, "state"> & {
  password: string;
  whatsapp: string;
  prodi: string;
  idLine: string;
};

type SelectOptions = {
  selectMode: "Edit" | "Delete";
  nim: string;
};

const dataProdi = [
  "Akuntansi",
  "Arsitektur",
  "DKV",
  "Film dan Animasi",
  "Informatika",
  "Jurnalistik",
  "Manajemen",
  "Perhotelan",
  "Sistem Informasi",
  "Strategic Communication",
  "Teknik Elektro",
  "Teknik Fisika",
  "Teknik Komputer",
];

export default function Dashboard() {
  // dummy data for now, tunggu backend
  // - backend yang getAll mahasiswa harusnya nampilin semua data?
  const auth = useAuth();
  const route = useRouter();

  const [dataMahasiswa, setDataMahasiswa] = useState<Mahasiswa[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);

  // modal
  const [selectOptions, setSelectOptions] = useState<SelectOptions | null>(
    null
  );
  const [selectedMahasiswa, setSelectedMahasiswa] =
    useState<ProfileMahasiswa | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Partial<ProfileMahasiswa>>({ mode: "onSubmit" });

  const loadDataMahasiswa = async () => {
    try {
      const { data } = await api.get<ResponseModel<Mahasiswa[]>>(
        "/mahasiswa/dataWithState"
      );
      setDataMahasiswa(data.data!);
    } catch (error) {
      console.log(error);
      HandleAxiosError(error);
    }
  };

  // list disini divisi yang boleh edit data mahasiswa
  const allowedEditPanitia = ["D01", "D02"];

  useEffect(() => {
    if (!auth.loading && auth.role !== "panit") {
      Swal.fire("Error!", "Anda tidak memiliki akses ke halaman ini", "error");
      route.push("/dashboard");
      return;
    }

    loadDataMahasiswa().finally(() => setFetchLoading(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnsMahasiswa: MUIDataTableColumn[] = [
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
      label: "STATE 1",
      name: "state",
      options: {
        customBodyRender: (value: StateStatus[], tableMeta) => {
          return (
            <Stack direction={"row"} align={"center"} justify={"space-between"}>
              {value[0] ? (
                <>
                  <Text>{value[0].stateName}</Text>
                  {value[0].isFirstAttended && value[0].isLastAttended ? (
                    <Icon
                      as={BsCheckCircleFill}
                      mb={"0.5em"}
                      color="green.500"
                    />
                  ) : (
                    <Icon as={BsXCircleFill} mb={"0.5em"} color="red.500" />
                  )}
                </>
              ) : (
                <Text>-</Text>
              )}
            </Stack>
          );
        },
      },
    },
    {
      label: "STATE 2",
      name: "state",
      options: {
        customBodyRender: (value: StateStatus[], tableMeta) => {
          return (
            <Stack direction={"row"} align={"center"} justify={"space-between"}>
              {value[1] ? (
                <>
                  <Text>{value[1].stateName}</Text>
                  {value[1].isFirstAttended && value[1].isLastAttended ? (
                    <Icon
                      as={BsCheckCircleFill}
                      mb={"0.5em"}
                      color="green.500"
                    />
                  ) : (
                    <Icon as={BsXCircleFill} mb={"0.5em"} color="red.500" />
                  )}
                </>
              ) : (
                <Text>-</Text>
              )}
            </Stack>
          );
        },
      },
    },
    {
      label: "STATE 3",
      name: "state",
      options: {
        customBodyRender: (value: StateStatus[], tableMeta) => {
          return (
            <Stack direction={"row"} align={"center"} justify={"space-between"}>
              {value[2] ? (
                <>
                  <Text>{value[2].stateName}</Text>
                  {value[2].isFirstAttended && value[2].isLastAttended ? (
                    <Icon
                      as={BsCheckCircleFill}
                      mb={"0.5em"}
                      color="green.500"
                    />
                  ) : (
                    <Icon as={BsXCircleFill} mb={"0.5em"} color="red.500" />
                  )}
                </>
              ) : (
                <Text>-</Text>
              )}
            </Stack>
          );
        },
      },
    },
  ];

  allowedEditPanitia.includes(auth.user?.divisiID!) &&
    columnsMahasiswa.push({
      label: "Aksi",
      name: "aksi",
      options: {
        customBodyRender: (value, tableMeta) => {
          return (
            <>
              <Stack direction={"row"}>
                <MuiIconButton
                  size="small"
                  sx={{
                    borderRadius: "8px",
                    px: "0.5em",
                    // backgroundColor: "red",
                    color: "#185C99",
                    outlineColor: "#185C99",
                    outline: "1px solid",
                    // color: "#fff",
                    textTransform: "none",
                  }}
                  onClick={() => {
                    setSelectOptions({
                      selectMode: "Edit",
                      nim: tableMeta.rowData[1],
                    });
                    api
                      .get(`mahasiswa/data/${tableMeta.rowData[1]}`)
                      .then((res) => {
                        setSelectedMahasiswa(res.data.data);
                        reset();
                        onOpen();
                      })
                      .catch((err) => {
                        HandleAxiosError(err);
                      });
                  }}
                >
                  <MdOutlineEdit />
                </MuiIconButton>
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
                    setSelectOptions({
                      selectMode: "Delete",
                      nim: tableMeta.rowData[1],
                    });
                    api
                      .get(`mahasiswa/data/${tableMeta.rowData[1]}`)
                      .then((res) => {
                        setSelectedMahasiswa(res.data.data);
                        onOpen();
                      })
                      .catch((err) => {
                        HandleAxiosError(err);
                      });
                    onOpen();
                  }}
                >
                  <MdDeleteForever />
                </MuiIconButton>
              </Stack>
            </>
          );
        },
      },
    });

  return (
    <>
      <title>MAXIMA 2023 Internal - Mahasiswa</title>
      <Layout
        title="Mahasiswa"
        tag={
          allowedEditPanitia.includes(auth.user?.divisiID!)
            ? "SUPERADMIN"
            : auth.user?.divisiName
        }
        showDashboardButton
      >
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
                data={dataMahasiswa}
                columns={columnsMahasiswa}
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

        {/* modal coy */}
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{`${selectOptions?.selectMode} ${selectedMahasiswa?.nim}`}</ModalHeader>
            <ModalCloseButton />
            {selectOptions?.selectMode === "Edit" ? (
              <form
                onSubmit={handleSubmit((data) => {
                  // sanitize data, gatau gmn caranya biar nggak empty string/nan
                  Object.keys(data).forEach((key) => {
                    if (
                      data[key as keyof typeof data] === "" ||
                      Number.isNaN(data[key as keyof typeof data]) ||
                      data[key as keyof typeof data] === null
                    ) {
                      delete data[key as keyof typeof data];
                    }
                  });

                  // put
                  api
                    .put(`/mahasiswa/data/${selectOptions?.nim}`, data)
                    .then((res) => {
                      // refetch
                      loadDataMahasiswa();
                      Swal.fire(
                        "Berhasil!",
                        "Berhasil mengupdate data",
                        "success"
                      );
                    })
                    .catch((err) => {
                      HandleAxiosError(err);
                    });

                  setSelectOptions(null);
                  onClose();
                })}
              >
                <ModalBody textColor="#1e1d22">
                  <FormControl isInvalid={!!errors.nim}>
                    <FormLabel>NIM</FormLabel>
                    <Input
                      id="nim"
                      type="number"
                      {...register("nim", {
                        required: false,
                        value: selectedMahasiswa?.nim,
                        max: {
                          value: 999999,
                          message: "NIM harus 5/6 digit",
                        },
                        min: {
                          value: 10000,
                          message: "NIM harus 5/6 digit",
                        },
                        valueAsNumber: true,
                      })}
                    />
                    <FormErrorMessage>
                      {errors.nim && errors.nim.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.name}>
                    <FormLabel>Nama</FormLabel>
                    <Input
                      id="name"
                      {...register("name", {
                        required: false,
                        value: selectedMahasiswa?.name,
                        maxLength: {
                          value: 20,
                          message: "Nama lengkap maximum 20 karakter",
                        },
                        pattern: {
                          value: /^[A-Za-z .]*$/,
                          message: "Nama lengkap tidak valid",
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {errors.name && errors.name.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      id="email"
                      {...register("email", {
                        required: false,
                        value: selectedMahasiswa?.email,
                        pattern: {
                          value: /^(\w+(\.\w+)*)@student\.umn\.ac\.id$/gm,
                          message: "Harus menggunakan email student",
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {errors.email && errors.email.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.password}>
                    <FormLabel>Password</FormLabel>
                    <Input
                      placeholder="Buat password baru"
                      id="password"
                      {...register("password", {
                        required: false,
                        min: {
                          value: 8,
                          message: "Password minimum 8 karakter",
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {errors.password && errors.password.message}
                    </FormErrorMessage>
                  </FormControl>

                  <HStack>
                    <FormControl isInvalid={!!errors.prodi}>
                      <FormLabel>Prodi</FormLabel>
                      <Controller
                        name="prodi"
                        control={control}
                        defaultValue={selectedMahasiswa?.prodi}
                        render={({ field: { onChange, value } }) => (
                          <Select onChange={onChange} value={value}>
                            {dataProdi.map((prodi) => (
                              <option value={prodi} key={prodi}>
                                {prodi}
                              </option>
                            ))}
                          </Select>
                        )}
                      />
                      <FormErrorMessage>
                        {errors.prodi && errors.prodi.message}
                      </FormErrorMessage>
                    </FormControl>
                  </HStack>

                  <FormControl isInvalid={!!errors.whatsapp}>
                    <FormLabel>No. WhatsApp</FormLabel>
                    <Input
                      id="whatsapp"
                      {...register("whatsapp", {
                        required: false,
                        value: selectedMahasiswa?.whatsapp,
                        min: {
                          value: 10,
                          message: "Nomor WhatsApp tidak valid",
                        },
                        maxLength: {
                          value: 15,
                          message: "Nomor WhatsApp tidak valid",
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {errors.name && errors.name.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.idLine}>
                    <FormLabel>Id Line</FormLabel>
                    <Input
                      id="idLine"
                      {...register("idLine", {
                        required: false,
                        value: selectedMahasiswa?.idLine,
                      })}
                    />
                    <FormErrorMessage>
                      {errors.name && errors.name.message}
                    </FormErrorMessage>
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button type="submit" color="#185C99" mr={3}>
                    Change
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
                  <Text>Apakah anda yakin ingin menghapus?</Text>
                  <Text fontWeight={"bold"}>NIM : </Text>
                  <Text>{selectedMahasiswa?.nim}</Text>
                  <Text fontWeight={"bold"}>Nama :</Text>
                  <Text>{selectedMahasiswa?.name}</Text>
                  <Text fontWeight={"bold"}>Email</Text>
                  <Text>{selectedMahasiswa?.email}</Text>
                  <Text fontWeight={"bold"}>Prodi</Text>
                  <Text>{selectedMahasiswa?.prodi}</Text>
                  <Text fontWeight={"bold"}>No. WhatsApp</Text>
                  <Text>{selectedMahasiswa?.whatsapp}</Text>
                  <Text fontWeight={"bold"}>Id Line</Text>
                  <Text>{selectedMahasiswa?.idLine}</Text>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="red.500"
                    mr={3}
                    onClick={() => {
                      api
                        .delete(`/mahasiswa/data/${selectOptions?.nim}`)
                        .then((res) => {
                          // refetch
                          loadDataMahasiswa();
                          Swal.fire(
                            "Berhasil!",
                            "Berhasil menghapus data",
                            "success"
                          );
                        })
                        .catch((err) => {
                          HandleAxiosError(err);
                        });

                      setSelectOptions(null);
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
