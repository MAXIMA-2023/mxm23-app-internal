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
  Button,
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
import Layout from "@/components/Layout";
import api, { ResponseModel, HandleAxiosError } from "@/services/api";
import { useAuth } from "@/contexts/Auth";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { MdDeleteForever, MdOutlineEdit } from "react-icons/md";

// mui button
import {
  Button as MuiButton,
  IconButton as MuiIconButton,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

type Organisator = {
  nim: number;
  name: string;
  email: string;
  stateID: number;
  isverified: number;
  stateName: string;
};

type State = {
  stateID: number;
  name: string;
};

type SelectOptions = {
  selectMode: "Edit" | "Delete";
  nim: string;
};

export default function Organisator() {
  const [dataOrganisator, setDataOrganisator] = useState<string[][]>([]);
  const [dataState, setDataState] = useState<State[]>([]);
  const [fetchLoading, setFetchLoading] = useState<boolean>(true);

  // modal
  const [selectOptions, setSelectOptions] = useState<SelectOptions | null>(
    null
  );
  const [selectedOrganisator, setSelectedOrganisator] =
    useState<Organisator | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<
    Partial<
      Omit<Organisator, "isverified" | "stateName"> & { password: string }
    >
  >({ mode: "onSubmit" });

  const auth = useAuth();
  const route = useRouter();

  const columnsOrganisator: MUIDataTableColumn[] = [
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
      label: "Email",
      name: "email",
      options: {
        filter: true,
      },
    },
    {
      label: "STATE",
      name: "stateID",
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
                <MuiIconButton
                  sx={{ color: "#185C99" }}
                  onClick={() => {
                    setSelectOptions({
                      selectMode: "Edit",
                      nim: tableMeta.rowData[1],
                    });
                    api
                      .get(`organisator/data/${tableMeta.rowData[1]}`)
                      .then((res) => {
                        setSelectedOrganisator(res.data.data);
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
                      .get(`organisator/data/${tableMeta.rowData[1]}`)
                      .then((res) => {
                        setSelectedOrganisator(res.data.data);
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

  const loadDataOrganisator = async () => {
    try {
      const response = await api.get<ResponseModel<Organisator[]>>(
        `organisator/data`
      );
      setDataOrganisator(
        response.data.data!.map((organisator) => [
          organisator.name,
          organisator.nim.toString(),
          organisator.email,
          organisator.stateName,
        ])
      );
    } catch (error) {
      console.log(error);
      HandleAxiosError(error);
    }
  };

  const loadDataState = async () => {
    try {
      const { data } = await api.get<State[]>(`/state_activities`);

      setDataState(data!);
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
      Swal.fire(
        "Error!",
        "Maaf, anda tidak memiliki akses ke page ini",
        "error"
      );
      route.push("/dashboard");
      return;
    }

    loadDataOrganisator();
    loadDataState();
    setFetchLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // sementara fetch loading pake spinner, kalo jadi pake skeleton gaskan
  if (fetchLoading || auth.loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <title>MAXIMA 2023 Internal - Organisator</title>
      <Layout title="Organisator" showDashboardButton>
        <Box w={"full"}>
          <ThemeProvider theme={createTheme()}>
            <MUIDataTable
              title={""}
              data={dataOrganisator}
              columns={columnsOrganisator}
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
        {/* buat moodal */}
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{`${selectOptions?.selectMode} ${selectedOrganisator?.nim}`}</ModalHeader>
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
                    .put(`/organisator/data/${selectOptions?.nim}`, {
                      ...data,
                      stateID: Number(data.stateID),
                    })
                    .then((res) => {
                      // refetch
                      loadDataOrganisator();
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
                      placeholder={selectedOrganisator?.nim.toString()}
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
                      placeholder={selectedOrganisator?.name}
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
                      placeholder={selectedOrganisator?.email}
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
                    <FormControl isInvalid={!!errors.stateID}>
                      <FormLabel>STATE</FormLabel>
                      <Controller
                        name="stateID"
                        control={control}
                        defaultValue={selectedOrganisator?.stateID}
                        render={({ field: { onChange, value } }) => (
                          <Select
                            // placeholder="Pilih arah kamera"
                            onChange={onChange}
                            value={value}
                          >
                            {dataState.map((state) => (
                              <option value={state.stateID} key={state.stateID}>
                                {state.name}
                              </option>
                            ))}
                          </Select>
                        )}
                      />
                      <FormErrorMessage>
                        {errors.stateID && errors.stateID.message}
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
                  <Text>{selectedOrganisator?.nim}</Text>
                  <Text fontWeight={"bold"}>Nama :</Text>
                  <Text>{selectedOrganisator?.name}</Text>
                  <Text fontWeight={"bold"}>Email</Text>
                  <Text>{selectedOrganisator?.email}</Text>
                  <Text fontWeight={"bold"}>STATE : </Text>
                  <Text>{selectedOrganisator?.stateName}</Text>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="red.500"
                    mr={3}
                    onClick={() => {
                      api
                        .delete(`/organisator/data/${selectOptions?.nim}`)
                        .then((res) => {
                          // refetch
                          loadDataOrganisator();
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
