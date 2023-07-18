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
  isFinished: boolean;
};

type Mahasiswa = {
  nim: number;
  name: string;
  email: string;
  state_1?: StateStatus | null;
  state_2?: StateStatus | null;
  state_3?: StateStatus | null;
};

type ProfileMahasiswa = Omit<Mahasiswa, "state_1" | "state_2" | "state_3"> & {
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
  const [fetchLoading, setFetchLoading] = useState(false);

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
        "/mahasiswa/data"
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

    loadDataMahasiswa();
    setFetchLoading(false);

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
      name: "state_1",
      options: {
        customBodyRender: (value: StateStatus | null, tableMeta) => {
          return (
            <Stack direction={"row"} align={"center"}>
              {value ? (
                <>
                  <Text>{value.stateName}</Text>
                  {value.isFinished ? (
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
      name: "state_2",
      options: {
        customBodyRender: (value: StateStatus | null, tableMeta) => {
          return (
            <Stack direction={"row"} align={"center"}>
              {value ? (
                <>
                  <Text>{value.stateName}</Text>
                  {value.isFinished ? (
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
      name: "state_3",
      options: {
        customBodyRender: (value: StateStatus | null, tableMeta) => {
          return (
            <Stack direction={"row"} align={"center"}>
              {value ? (
                <>
                  <Text>{value.stateName}</Text>
                  {value.isFinished ? (
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
                  sx={{ color: "#185C99" }}
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
                  color="error"
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

  // sementara fetch loading pake spinner, kalo jadi pake skeleton gaskan
  if (fetchLoading || auth.loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <title>MAXIMA 2023 Internal - Mahasiswa</title>
      <Layout title="Mahasiswa" tag={auth.user?.divisiName} showDashboardButton>
        <Box w={"full"}>
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
                      placeholder={selectedMahasiswa?.nim.toString()}
                      id="nim"
                      type="number"
                      {...register("nim", {
                        required: false,
                        max: {
                          value: 99999,
                          message: "NIM harus 5 digit",
                        },
                        min: {
                          value: 1000,
                          message: "NIM harus 5 digit",
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
                      placeholder={selectedMahasiswa?.name}
                      id="name"
                      {...register("name", {
                        required: false,
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
                      placeholder={selectedMahasiswa?.email}
                      id="email"
                      {...register("email", {
                        required: false,
                        pattern: {
                          value: /^(\w+(.\w+)*)(@student.umn.ac.id)$/gm,
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
                          <Select
                            // placeholder="Pilih arah kamera"
                            onChange={onChange}
                            value={value}
                          >
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
                      placeholder={selectedMahasiswa?.whatsapp}
                      id="whatsapp"
                      {...register("whatsapp", {
                        required: false,
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
                      placeholder={selectedMahasiswa?.idLine}
                      id="idLine"
                      {...register("idLine", {
                        required: false,
                      })}
                    />
                    <FormErrorMessage>
                      {errors.name && errors.name.message}
                    </FormErrorMessage>
                  </FormControl>

                  <Text py={8} textAlign="justify">
                    <Text as="span" fontWeight="medium">
                      Note :
                    </Text>{" "}
                    Hanya isi yang ingin diganti saja, tidak perlu diisi semua.
                  </Text>
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
