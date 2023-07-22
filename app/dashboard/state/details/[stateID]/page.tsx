"use client";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Flex,
  Text,
  Divider,
  Stack,
  Switch,
  Link,
  Select,
  Image,
  Button,
  Icon,
  Spacer,
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
import { Checkbox as MuiCheckbox } from "@mui/material";

import { createTheme } from "@mui/material/styles";
import Layout from "@/components/Layout";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import DropZone from "@/components/DropZone";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import {
  MdCalendarToday,
  MdPeople,
  MdLocationOn,
  MdEdit,
} from "react-icons/md";
import { useAuth } from "@/contexts/Auth";
import { useParams, useRouter } from "next/navigation";
import api, { HandleAxiosError, ResponseModel } from "@/services/api";
import Swal from "sweetalert2";

type StateActivities = {
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

type UpdateStateActivities = Omit<
  StateActivities,
  "stateID" | "stateLogo" | "registered" | "date"
> & {
  stateLogo: File;
};

type DayManagement = {
  day: string;
  hari: number;
  date: string;
};

type PesertaSTATE = {
  stateID: number;
  nim: number;
  token: string;
  name: string;
  created_at: string;
  attendanceTime: string;
  isFirstAttended: boolean;
  isLastAttended: boolean;
  stateName: string;
  stateLogo: string;
  day: string;
};

export default function Details() {
  const iconBoxSize = 5;
  const { isOpen, onOpen, onClose } = useDisclosure();

  // data
  const [dataState, setDataState] = useState<StateActivities | null>(null);
  const [dataPesertaState, setDataPesertaState] = useState<PesertaSTATE[]>([]);
  const [dataDayManagement, setDataDayManagement] = useState<DayManagement[]>(
    []
  );
  const [fetchLoading, setFetchLoading] = useState<boolean>(true);

  const auth = useAuth();
  const params = useParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateStateActivities>();

  const loadDataState = async () => {
    try {
      const { data } = await api.get(`/stateAct/${params.stateID}`);
      setDataState(data[0]);
    } catch (error) {
      console.log(error);
      HandleAxiosError(error);
    }
  };

  const loadDataPesertaState = async () => {
    try {
      const { data } = await api.get<ResponseModel<PesertaSTATE[]>>(
        `/stateRegBySID/data/${params.stateID}`
      );
      setDataPesertaState(data.data!);
    } catch (error) {
      console.log(error);
      HandleAxiosError(error);
    }
  };

  const loadDataDayManagement = async () => {
    try {
      const { data } = await api.get<DayManagement[]>(`/dayManagement/`);
      setDataDayManagement(data);
      return;
    } catch (err) {
      console.log(err);
      HandleAxiosError(err);
    }
  };

  useEffect(() => {
    if (auth.loading) {
      return;
    }

    if (
      auth.role === "organisator" &&
      auth.user?.stateID !== Number(params.stateID)
    ) {
      Swal.fire(
        "Error!",
        "Anda tidak memiliki akses untuk mengakses details selain STATE anda sendiri!",
        "error"
      );
      router.push("/dashboard");
      return;
    }

    Promise.all([
      loadDataState(),
      loadDataPesertaState(),
      loadDataDayManagement(),
    ]).finally(() => setFetchLoading(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.loading]);

  const allowedEditPanitia = ["D01", "D02", "D05", "D13"]; // divisi registrasi?

  // exclude divisi D13 - Inspice (registrasi)
  // cursed banget :(
  const isSuntingAllowed =
    auth.role === "organisator" ||
    (auth.role === "panit" &&
      allowedEditPanitia.includes(auth.user?.divisiID!) &&
      auth.user?.divisiID !== "D13");

  const columnsDetails: MUIDataTableColumn[] = [
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
    // {
    //   label: "Email",
    //   name: "email",
    //   options: {
    //     filter: true,
    //   },
    // },
    {
      label: "Kehadiran Awal",
      name: "isFirstAttended",
      options: {
        customBodyRender: (value: boolean, tableMeta, updatevalue) => {
          const rowData = dataPesertaState[tableMeta.rowIndex];
          return (
            <MuiCheckbox
              checked={Boolean(value)}
              onChange={() => {
                api
                  .post(`state/attendance/first`, {
                    token: rowData.token,
                    stateID: rowData.stateID,
                  })
                  .then((res) => {
                    if (res.status === 200) {
                      Swal.fire(
                        "Berhasil!",
                        `Berhasil mengubah kehadiran awal ${rowData.name}`,
                        "success"
                      );
                      updatevalue(true as unknown as string);
                      loadDataPesertaState();
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    HandleAxiosError(err);
                  });
              }}
              disabled={
                auth.role !== "panit" ||
                !allowedEditPanitia.includes(auth.user?.divisiID!) ||
                auth.user?.divisiID === "D05" ||
                value
              }
            />
          );
        },
      },
    },
    {
      label: "Kehadiran Akhir",
      name: "isLastAttended",
      options: {
        customBodyRender: (value: boolean, tableMeta: any, updatevalue) => {
          const rowData = dataPesertaState[tableMeta.rowIndex];

          return (
            <MuiCheckbox
              checked={Boolean(value)}
              onChange={() => {
                api
                  .post(`state/attendance/last`, {
                    token: rowData.token,
                    stateID: rowData.stateID,
                  })
                  .then((res) => {
                    Swal.fire(
                      "Berhasil!",
                      `Berhasil mengubah kehadiran akhir ${rowData.name}`,
                      "success"
                    );
                    updatevalue(true as unknown as string);
                    loadDataPesertaState();
                  })
                  .catch((err) => {
                    console.log(err);

                    HandleAxiosError(err);
                  });
              }}
              disabled={
                auth.role !== "panit" ||
                !allowedEditPanitia.includes(auth.user?.divisiID!) ||
                auth.user?.divisiID === "D05" ||
                value
              }
            />
          );
        },
      },
    },
  ];

  return (
    <>
      <title>MAXIMA 2023 Internal - STATE</title>
      <Layout
        title="Detail dan Peserta"
        showDaftarStateButton={auth.role === "panit"}
        showDashboardButton={auth.role === "organisator"}
      >
        <Box w={"full"} h={"auto"}>
          {isSuntingAllowed && (
            <Flex justifyContent={"flex-end"} mb={"2em"}>
              <Button
                h={"2.25em"}
                bgColor={"#185C99"}
                borderRadius={"full"}
                _hover={{ bgColor: "#295278" }}
                onClick={onOpen}
              >
                <Flex alignItems={"center"} color={"white"}>
                  <Icon as={MdEdit} boxSize={4} />
                  <Text ml={"0.5em"} fontSize={"lg"} fontWeight={"semibold"}>
                    Sunting
                  </Text>
                </Flex>
              </Button>
            </Flex>
          )}
          <Skeleton isLoaded={!fetchLoading}>
            <Stack
              direction={["column", "row"]}
              spacing={"1.25em"}
              w={"full"}
              h={"auto"}
              mb={"3em"}
            >
              <Center
                w={"auto"}
                h={"auto"}
                borderWidth={2}
                borderColor={"#EFEFEF"}
              >
                <Image
                  w={"20em"}
                  h={"10em"}
                  src={dataState?.stateLogo}
                  alt={`Logo ${dataState?.name}`}
                  objectFit={"contain"}
                />
              </Center>
              <Box w={["full", "20em"]} maxH={"12.5em"} overflowY={"auto"}>
                <Stack direction={"column"} spacing={"0.75em"}>
                  <Text
                    fontSize={"3xl"}
                    fontWeight={"semibold"}
                    color={"#11D22"}
                  >
                    {dataState?.name}
                  </Text>
                  <Flex alignItems={"center"}>
                    <Icon as={MdCalendarToday} boxSize={iconBoxSize} />
                    <Text ml={"0.7em"} fontSize={"md"} fontWeight={"normal"}>
                      {dataState?.day} / {dataState?.date}
                    </Text>
                  </Flex>
                  <Flex alignItems={"center"}>
                    <Icon as={MdPeople} boxSize={iconBoxSize} />
                    <Text ml={"0.7em"} fontSize={"md"} fontWeight={"normal"}>
                      {dataState?.registered} / {dataState?.quota}
                    </Text>
                  </Flex>
                  <Flex alignItems={"center"}>
                    <Icon as={MdLocationOn} boxSize={iconBoxSize} />
                    <Text ml={"0.7em"} fontSize={"md"} fontWeight={"normal"}>
                      {dataState?.location}
                    </Text>
                  </Flex>
                </Stack>
              </Box>
              <Center display={["none", "flex"]} height={"auto"}>
                <Divider
                  orientation={"vertical"}
                  borderWidth={2}
                  borderColor={"#EFEFEF"}
                  borderRadius={"full"}
                />
              </Center>
              <Box w={["auto", "25em"]}>
                <Box mb={["0.25em", "0.5em"]}>
                  <Text
                    fontSize={"xl"}
                    fontWeight={"semibold"}
                    color={"#11D22"}
                  >
                    Deskripsi
                  </Text>
                </Box>
                <Box maxH={"12.5em"} overflowY={"auto"}>
                  <Text fontSize={"sm"} fontWeight={"normal"} align={"justify"}>
                    {dataState?.stateDesc}
                  </Text>
                </Box>
              </Box>
            </Stack>
          </Skeleton>
          <Box w={"full"}>
            <Text
              mb={"0.5em"}
              fontSize={"2xl"}
              color={"#11D22"}
              fontWeight={"semibold"}
            >
              Peserta
            </Text>
            <SkeletonText
              isLoaded={!fetchLoading}
              noOfLines={10}
              spacing={8}
              skeletonHeight={12}
            >
              <ThemeProvider theme={createTheme()}>
                <MUIDataTable
                  title={""}
                  data={dataPesertaState}
                  columns={columnsDetails}
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
        </Box>
      </Layout>
      <Modal size={"2xl"} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius={"xl"}>
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
                .put(`/stateAct/update/`, formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                })
                .then((res) => {
                  // refetch
                  loadDataState();
                  Swal.fire("Berhasil!", "Berhasil mengubah STATE", "success");
                })
                .catch((err) => {
                  HandleAxiosError(err);
                });

              onClose();
            })}
          >
            <ModalBody>
              <Center w={"full"} my={"1em"}>
                <Text fontSize={"2xl"} fontWeight={"semibold"} color={"#11D22"}>
                  Sunting
                </Text>
              </Center>
              <Box w={"full"}>
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
                        value: dataState?.name,
                        required: "Nama STATE tidak boleh kosong.",
                        pattern: {
                          value: /^[A-Za-z .]*$/,
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
                        value: dataState?.stateDesc,
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
                        value: dataState?.location,
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
                      // defaultValue={"D1"}
                      defaultValue={dataState?.day}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          onChange={onChange}
                          // defaultValue={"D1"}
                          value={value}
                        >
                          {dataDayManagement.map((day) => (
                            <option value={day.day} key={day.day}>
                              {day.date}
                            </option>
                          ))}
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
                        value: dataState?.quota,
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
              </Box>
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
        </ModalContent>
      </Modal>
    </>
  );
}
