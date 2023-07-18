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
  Center,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { createTheme } from "@mui/material/styles";
import Layout from "@/components/Layout";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { MdSearch, MdViewColumn, MdPrint, MdCloudDownload, MdFilterList } from "react-icons/md";
import { MdCalendarToday, MdPeople, MdLocationOn, MdEdit } from "react-icons/md";

type STATE = {
  logo: FileList;
  deskripsi: string;
};

const Previews = (props: any) => {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/jpg": [],
      "image/jpeg": [],
      "image/png": [],
    },
    onDrop: (acceptedFiles: any) => {
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  if (files.length !== 0) {
    props.setFiles(files);
  }
  const thumbs = files.map((file: any) => (
    <Box display={"inline-flex"} borderRadius={4} border={"2px solid #eaeaea"} mt={"16px"} mx={1} w={"auto"} h={"auto"} p={1} boxSizing={"border-box"} key={file.name}>
      <Box display={"flex"} w={"auto"} h={"100%"}>
        <Image
          src={file.preview}
          style={{ display: "block", width: "auto", height: "100%" }}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
          alt={file.name}
        />
      </Box>
    </Box>
  ));

  useEffect(() => {
    return () => files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <>
      <Center p={"0.8em"} border={"dashed #e2e8f0"} width={"100%"} height={"5em"} borderRadius={10} {...getRootProps({ className: "dropzone" })} transition={"0.1s ease-in-out"} _hover={{ border: "dashed #CBD5E0", cursor: "pointer" }}>
        <input {...getInputProps()} />
        <Text color={"#A6A8AC"} userSelect={"none"} align={"center"}>
          Seret dan taruh file di sini, atau klik untuk memilih file
        </Text>
      </Center>
      <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"}>
        {thumbs}
      </Box>
    </>
  );
};

export default function Details() {
  const iconBoxSize = 5;
  const [logo, setLogo] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<STATE>();

  // data dummy
  const dataPeserta = [
    {
      nama: "Monkey D Luffy",
      nim: "12345",
      email: "monkey.dlufy@student.umn.ac.id",
      kehadiran: 1,
    },
    {
      nama: "Monkey D Luffy",
      nim: "12345",
      email: "monkey.dlufy@student.umn.ac.id",
      kehadiran: 0,
    },
  ];

  const columnsDetails: MUIDataTableColumn[] = [
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
      label: "Kehadiran",
      name: "kehadiran",
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return <>{value === 1 ? <Icon as={BsCheckCircleFill} w={5} h={5} color="#36AD2C" /> : <Icon as={BsXCircleFill} w={5} h={5} color="#F43535" />}</>;
        },
      },
    },
  ];

  const options = {};

  return (
    <>
      <title>MAXIMA 2023 Internal - STATE</title>
      <Layout title="Detail dan Peserta" showDashboardButton showSuntingButton>
        <Box w={"full"} h={"auto"}>
          <Flex justifyContent={"flex-end"} mb={"2em"}>
            <Button h={"2.25em"} bgColor={"#185C99"} borderRadius={"full"} _hover={{ bgColor: "#295278" }} onClick={onOpen}>
              <Flex alignItems={"center"} color={"white"}>
                <Icon as={MdEdit} boxSize={4} />
                <Text ml={"0.5em"} fontSize={"lg"} fontWeight={"semibold"}>
                  Sunting
                </Text>
              </Flex>
            </Button>
          </Flex>
          <Stack direction={["column", "row"]} spacing={"1.25em"} w={"full"} h={"auto"} mb={"3em"}>
            <Center w={"auto"} h={"auto"} borderWidth={2} borderColor={"#EFEFEF"}>
              <Image w={"20em"} h={"10em"} src="https://bit.ly/dan-abramov" alt="Dan Abramov" objectFit={"contain"} />
            </Center>
            <Box w={["full", "20em"]} maxH={"12.5em"} overflowY={"auto"}>
              <Stack direction={"column"} spacing={"0.75em"}>
                <Text fontSize={"3xl"} fontWeight={"semibold"} color={"#11D22"}>
                  ULTIMA SONORA
                </Text>
                <Flex alignItems={"center"}>
                  <Icon as={MdCalendarToday} boxSize={iconBoxSize} />
                  <Text ml={"0.7em"} fontSize={"md"} fontWeight={"normal"}>
                    Dashboard
                  </Text>
                </Flex>
                <Flex alignItems={"center"}>
                  <Icon as={MdPeople} boxSize={iconBoxSize} />
                  <Text ml={"0.7em"} fontSize={"md"} fontWeight={"normal"}>
                    40 / 100
                  </Text>
                </Flex>
                <Flex alignItems={"center"}>
                  <Icon as={MdLocationOn} boxSize={iconBoxSize} />
                  <Text ml={"0.7em"} fontSize={"md"} fontWeight={"normal"}>
                    Lecture Hall
                  </Text>
                </Flex>
              </Stack>
            </Box>
            <Center display={["none", "flex"]} height={"auto"}>
              <Divider orientation={"vertical"} borderWidth={2} borderColor={"#EFEFEF"} borderRadius={"full"} />
            </Center>
            <Box w={["auto", "25em"]}>
              <Box mb={["0.25em", "0.5em"]}>
                <Text fontSize={"xl"} fontWeight={"semibold"} color={"#11D22"}>
                  Deskripsi
                </Text>
              </Box>
              <Box maxH={"12.5em"} overflowY={"auto"}>
                <Text fontSize={"sm"} fontWeight={"normal"} align={"justify"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam rutrum mauris viverra ligula pulvinar blandit. Curabitur molestie ante pretium lorem lacinia, a lacinia risus volutpat. Fusce cursus pharetra quam ac rutrum.
                  Nullam a velit non dui ullamcorper ultricies ac id velit. Suspendisse ex donec.
                </Text>
              </Box>
            </Box>
          </Stack>
          <Box w={"full"}>
            <Text mb={"0.5em"} fontSize={"2xl"} color={"#11D22"} fontWeight={"semibold"}>
              Peserta
            </Text>
            <ThemeProvider theme={createTheme()}>
              <MUIDataTable
                title={""}
                data={dataPeserta}
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
          </Box>
        </Box>
      </Layout>
      <Modal size={"2xl"} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius={"xl"}>
          <ModalBody>
            <Center w={"full"} my={"1em"}>
              <Text fontSize={"2xl"} fontWeight={"semibold"} color={"#11D22"}>
                Sunting
              </Text>
            </Center>
            <Box w={"full"}>
              <form>
                <Box w={"full"} mb={"2em"}>
                  <FormLabel fontSize={"xl"} fontWeight={"semibold"} color={"#11D22"}>
                    Logo
                  </FormLabel>
                  <Box padding={"1em"} border={"solid #CBD5E0"} width={"100%"} height={"100%"} borderRadius={10} transition={"0.1s ease-in-out"} _hover={{ border: "solid #CBD5E0" }}>
                    <Previews name={"logo"} setFiles={setLogo} />
                  </Box>
                  {errors.logo !== undefined && <Text textColor={"red"}>{errors.logo.message}</Text>}
                </Box>
                <Box w={"full"}>
                  <FormLabel fontSize={"xl"} fontWeight={"semibold"} color={"#11D22"}>
                    Deskripsi
                  </FormLabel>
                  <Textarea {...register("deskripsi", { required: "Deskripsi tidak boleh kosong" })} placeholder={"Deskripsi"} />
                  {errors.deskripsi !== undefined && <Text textColor={"red"}>{errors.deskripsi.message}</Text>}
                </Box>
              </form>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Kembali
            </Button>
            <Button bgColor={"#185C99"} color={"white"} _hover={{ bgColor: "#295278" }}>
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
