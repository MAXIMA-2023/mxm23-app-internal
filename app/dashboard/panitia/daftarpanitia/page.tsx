"use client";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import { useState, useEffect } from "react";
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
  Stack,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  SkeletonText,
} from "@chakra-ui/react";
import { createTheme } from "@mui/material/styles";
import Layout from "@/components/Layout";
import api, { ResponseModel, HandleAxiosError } from "@/services/api";
import { useAuth } from "@/contexts/Auth";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { MdDeleteForever, MdInfo, MdOutlineEdit } from "react-icons/md";

// mui button
import {
  Button as MuiButton,
  IconButton as MuiIconButton,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

type Panitia = {
  nim: number;
  name: string;
  email: string;
  isverified: boolean;
  divisiID: string;
  divisiName: string;
};

type Divisi = {
  divisiID: string;
  name: string;
};

type SelectOptions = {
  selectMode: "Edit" | "Delete";
  nim: string;
};

export default function DaftarPanitia() {
  const [dataPanitia, setDataPanitia] = useState<Panitia[]>([]);
  const [dataDivisi, setDataDivisi] = useState<Divisi[]>([]);
  const [fetchLoading, setFetchLoading] = useState<boolean>(true);

  // modal
  const [selectOptions, setSelectOptions] = useState<SelectOptions | null>(
    null
  );
  const [selectedPanitia, setSelectedPanitia] = useState<Panitia | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<
    Partial<Omit<Panitia, "isverified" | "divisiName"> & { password: string }>
  >({ mode: "onSubmit" });

  // hooks
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
    {
      label: "Aksi",
      name: "aksi",
      options: {
        customBodyRender: (value, tableMeta) => {
          return (
            <>
              <Stack direction={"row"}>
                <MuiButton
                  startIcon={<MdOutlineEdit />}
                  sx={{
                    borderRadius: "100px",
                    px: "1em",
                    color: "#185C99",
                    // color: "#fff",
                    textTransform: "none",
                  }}
                  variant="outlined"
                  onClick={() => {
                    setSelectOptions({
                      selectMode: "Edit",
                      nim: tableMeta.rowData[1],
                    });
                    api
                      .get(`panit/data/${tableMeta.rowData[1]}`)
                      .then((res) => {
                        setSelectedPanitia(res.data.data);
                        reset();
                        onOpen();
                      })
                      .catch((err) => {
                        HandleAxiosError(err);
                      });
                  }}
                >
                  Sunting
                </MuiButton>
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
                      .get(`panit/data/${tableMeta.rowData[1]}`)
                      .then((res) => {
                        setSelectedPanitia(res.data.data);
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
    },
  ];

  const loadDataPanit = async () => {
    try {
      const { data } = await api.get<ResponseModel<Panitia[]>>(`panit/data`);
      setDataPanitia(data.data!);
    } catch (error) {
      console.log(error);
      HandleAxiosError(error);
    }
  };
  const loadDataDivisi = async () => {
    try {
      const { data } = await api.get<ResponseModel<Divisi[]>>(`/divisi`);
      setDataDivisi(data.data!);
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
      Swal.fire(
        "Error!",
        "Maaf, anda tidak memiliki akses ke page ini",
        "error"
      );
      route.push("/dashboard");
      return;
    }

    loadDataPanit();
    loadDataDivisi();
    Promise.all([loadDataPanit(), loadDataDivisi()]).finally(() =>
      setFetchLoading(false)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <title>MAXIMA 2023 Internal - Organisator</title>
      <Layout title="Panitia" tag="SUPERADMIN" showDashboardButton>
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
          </SkeletonText>
        </Box>

        {/* buat moodal */}
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{`${selectOptions?.selectMode} ${selectedPanitia?.nim}`}</ModalHeader>
            <ModalCloseButton />
            {selectOptions?.selectMode === "Edit" ? (
              <form
                onSubmit={handleSubmit((data, e) => {
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
                    .put(`/panit/data/${selectOptions?.nim}`, data)
                    .then((res) => {
                      loadDataPanit();
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
                        value: selectedPanitia?.nim,
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
                      id="name"
                      {...register("name", {
                        required: false,
                        value: selectedPanitia?.name,
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
                        value: selectedPanitia?.email,
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
                    <FormControl isInvalid={!!errors.divisiID}>
                      <FormLabel>Divisi</FormLabel>
                      <Controller
                        name="divisiID"
                        control={control}
                        defaultValue={selectedPanitia?.divisiID}
                        render={({ field: { onChange, value } }) => (
                          <Select onChange={onChange} value={value}>
                            {dataDivisi.map((divisi) => (
                              <option
                                value={divisi.divisiID}
                                key={divisi.divisiID}
                              >
                                {divisi.name}
                              </option>
                            ))}
                          </Select>
                        )}
                      />
                      <FormErrorMessage>
                        {errors.divisiID && errors.divisiID.message}
                      </FormErrorMessage>
                    </FormControl>
                  </HStack>
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
                  <Text>{selectedPanitia?.nim}</Text>
                  <Text fontWeight={"bold"}>Nama :</Text>
                  <Text>{selectedPanitia?.name}</Text>
                  <Text fontWeight={"bold"}>Email</Text>
                  <Text>{selectedPanitia?.email}</Text>
                  <Text fontWeight={"bold"}>Divisi : </Text>
                  <Text>{selectedPanitia?.divisiName}</Text>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="red.500"
                    mr={3}
                    onClick={() => {
                      api
                        .delete(`/panit/data/${selectOptions?.nim}`)
                        .then((res) => {
                          loadDataPanit();
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
