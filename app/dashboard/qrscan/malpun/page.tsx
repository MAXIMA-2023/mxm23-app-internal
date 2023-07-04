"use client";
import { useState } from "react";
import {
  Center,
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Spacer,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { BsArrowLeftShort } from "react-icons/bs";
import QRScanner from "@/components/qrscan/QRScanner";
import Swal from "sweetalert2";

// !CHANGEME: Ini cuma dummy data, nanti diganti schema dengan POST requests
import { DummyPresensiData } from "../data";
import Layout from "@/components/Layout";
import Link from "next/link";

type Modal = {
  isSuccess: boolean;
  id?: string;
  errorReason?: string;
};

export default function QRScanSTATE() {
  // modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalState, setModalState] = useState<Modal>({ isSuccess: false });

  return (
    <>
      <title>MAXIMA 2023 Internal - QR Scan Malpun</title>
      <Layout>
        <Box
          w={"full"}
          py={["1em", "1em", "1.5em", "3em", "3em"]}
          px={["1em", "1em", "1.5em", "2em", "2em"]}
        >
          <Box w={"full"} pl={["0", "0", "0", "18em", "20em"]}>
            <Box my={"2em"}>
              <Link href={"/dashboard"}>
                <Flex
                  alignItems={"center"}
                  textColor="#9CA3AF"
                  _hover={{ textColor: "#185C99" }}
                  cursor={"pointer"}
                  transition={"0.1s ease-in-out"}
                >
                  <Icon as={BsArrowLeftShort} boxSize={6} />
                  <Text ml={"0.7em"} fontSize={"md"}>
                    Back to Dashboard
                  </Text>
                </Flex>
              </Link>
              <Text
                fontSize={"4xl"}
                fontWeight={"medium"}
                textColor={"#1E1D22"}
              >
                QR Scan MALPUN
              </Text>
            </Box>
            <Flex
              w={"full"}
              minH={["95vh", "95vh", "auto", "86vh", "86vh"]}
              bgColor={"white"}
              borderRadius={"2xl"}
              boxShadow={"lg"}
            >
              <Box
                w="full"
                position="relative"
                borderRadius="2xl"
                overflow="hidden"
              >
                <QRScanner
                  onSuccess={(id) => {
                    // !CHANGEME: ganti dummy data dengan get init data dari get requests

                    // *debouncing, biar ga open berkali kali
                    if (isOpen) {
                      return;
                    }

                    if (!DummyPresensiData.state.isEligible) {
                      Swal.fire(
                        "Error!",
                        "Mahasiswa tidak Eligible untuk mengikuti STATE",
                        "error"
                      );
                      return;
                    }

                    setModalState({
                      isSuccess: true,
                      id: id,
                    });
                    onOpen();
                  }}
                  onError={(reason) => {
                    setModalState({
                      isSuccess: false,
                      errorReason: reason,
                    });
                    onOpen();
                  }}
                />

                {/* !TODO: Buat modal alert */}
                {/* ?TESTING: useState bikin re render gak ya?, sayang performance camera */}
                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader textColor="#1e1d22">
                      {modalState.isSuccess ? "Sukses!" : "Error!"}
                    </ModalHeader>
                    <ModalCloseButton />

                    <ModalBody textColor="#1e1d22">
                      {modalState.isSuccess ? (
                        <Box>
                          {DummyPresensiData.isInternal ? (
                            <Text>
                              <Text fontWeight={"bold"}>NIM</Text>{" "}
                              {DummyPresensiData.nim}
                            </Text>
                          ) : (
                            <Text>
                              <Text fontWeight={"bold"}>KTP</Text>{" "}
                              {DummyPresensiData.ktp}
                            </Text>
                          )}
                          <Text>
                            <Text fontWeight={"bold"}>Nama</Text>{" "}
                            {DummyPresensiData.name}
                          </Text>
                          <Text>
                            <Text fontWeight={"bold"}>Status</Text>
                            {DummyPresensiData.isInternal
                              ? "Internal"
                              : "External"}
                          </Text>
                        </Box>
                      ) : (
                        <Text>{modalState.errorReason}</Text>
                      )}
                    </ModalBody>

                    <ModalFooter>
                      {modalState.isSuccess && (
                        <Button
                          color="#185C99"
                          mr={3}
                          onClick={() => {
                            // !CHANGEME: POST Requests absen masuk dan schema buat disable button
                            console.log("ABSEN MASUK MALPUN");
                            onClose();
                          }}
                          isDisabled={DummyPresensiData.malpun.isHadir}
                        >
                          Masuk
                        </Button>
                      )}
                      <Spacer />
                      <Button
                        color="#185C99"
                        variant={"outline"}
                        mr={3}
                        onClick={onClose}
                      >
                        Cancel
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
                <Box
                  maxH={["88.5%", "60vh", "75vh", "70vh", "70vh"]}
                  overflowY={"auto"}
                ></Box>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Layout>
    </>
  );
}
