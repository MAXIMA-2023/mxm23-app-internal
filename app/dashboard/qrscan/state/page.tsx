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
} from "@chakra-ui/react";
import QRScanner from "@/components/qrscan/QRScanner";
import Swal from "sweetalert2";

// !CHANGEME: Ini cuma dummy data, nanti diganti schema dengan POST requests
import { DummyPresensiData } from "../data";

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
      <title>MAXIMA 2023 Internal - QR Scan State</title>
      <Center w={"100%"} h={"100vh"}>
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
            <ModalHeader
              textColor={modalState.isSuccess ? "green.400" : "red.400"}
            >
              {modalState.isSuccess ? "Sukses!" : "Error!"}
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              {modalState.isSuccess ? (
                <Box>
                  <Text>
                    <Text fontWeight={"bold"}>NIM</Text> {DummyPresensiData.nim}
                  </Text>
                  <Text>
                    <Text fontWeight={"bold"}>Nama</Text>{" "}
                    {DummyPresensiData.name}
                  </Text>
                  <Text>
                    <Text fontWeight={"bold"}>State</Text>
                    {DummyPresensiData.state.pilihan}
                  </Text>
                  {DummyPresensiData.state.masuk.isHadir && (
                    <Text>
                      <Text fontWeight={"bold"}>Presensi Masuk</Text>
                      {DummyPresensiData.state.masuk.presensiAt}
                    </Text>
                  )}
                </Box>
              ) : (
                <Text>{modalState.errorReason}</Text>
              )}
            </ModalBody>

            <ModalFooter>
              {modalState.isSuccess && (
                <>
                  <Button
                    colorScheme="green"
                    mr={3}
                    onClick={() => {
                      // !CHANGEME: POST Requests absen masuk dan schema buat disable button
                      console.log("ABSEN MASUK");
                      onClose();
                    }}
                    isDisabled={DummyPresensiData.state.masuk.isHadir}
                  >
                    Masuk
                  </Button>
                  <Button
                    colorScheme="green"
                    mr={3}
                    onClick={() => {
                      if (!DummyPresensiData.state.masuk.isHadir) {
                        Swal.fire(
                          "Error!",
                          "Mahasiswa belum absen masuk",
                          "warning"
                        );
                      }
                      // !CHANGEME: POST Requests absen keluar dan schema buat disable button
                      console.log("ABSEN KELUAR");
                      onClose();
                    }}
                    isDisabled={DummyPresensiData.state.keluar.isHadir}
                  >
                    Keluar
                  </Button>
                </>
              )}
              <Spacer />
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Center>
    </>
  );
}
