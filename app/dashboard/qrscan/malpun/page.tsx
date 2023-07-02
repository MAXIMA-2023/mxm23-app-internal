"use client";
import { useState } from "react";
import { Center, Box, Text, HStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure, Spacer } from "@chakra-ui/react";
import QRScanner from "@/components/qrscan/QRScanner";

// !CHANGEME: Ini cuma dummy data, nanti diganti schema dengan POST requests
import { DummyPresensiData } from "../data";
import Swal from "sweetalert2";

type Modal = {
  isSuccess: boolean;
  id?: string;
  errorReason?: string;
};
export default function QRScanMALPUN() {
  // modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalState, setModalState] = useState<Modal>({ isSuccess: false });

  return (
    <>
      <title>MAXIMA 2023 Internal - QR Scan Malpun</title>
      <Center w={"100%"} h={"100vh"}>
        <QRScanner
          onSuccess={(id) => {
            // !CHANGEME: ganti dummy data dengan get init data dari get requests

            // *debouncing, biar ga open berkali kali
            if (isOpen) {
              return;
            }

            // !TODO: Handling buat akun yang gak eligible atau belum bayar.
            if (!DummyPresensiData.malpun.isEligible) {
              Swal.fire("Error!", DummyPresensiData.isInternal ? "Mahasiswa tidak eligible untuk mengikuti MALPUN" : "Peserta tidak berhak untuk mengikuti MALPUN karena belum bayar", "error");
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
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textColor={modalState.isSuccess ? "green.400" : "red.400"}>{modalState.isSuccess ? "Sukses!" : "Error!"}</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              {modalState.isSuccess ? (
                <Box>
                  {DummyPresensiData.isInternal ? (
                    <Text>
                      <Text fontWeight={"bold"}>NIM</Text> {DummyPresensiData.nim}
                    </Text>
                  ) : (
                    <Text>
                      <Text fontWeight={"bold"}>KTP</Text> {DummyPresensiData.ktp}
                    </Text>
                  )}
                  <Text>
                    <Text fontWeight={"bold"}>Nama</Text> {DummyPresensiData.name}
                  </Text>
                  <Text>
                    <Text fontWeight={"bold"}>Status</Text>
                    {DummyPresensiData.isInternal ? "Internal" : "External"}
                  </Text>
                </Box>
              ) : (
                <Text>{modalState.errorReason}</Text>
              )}
            </ModalBody>

            <ModalFooter>
              {modalState.isSuccess && (
                <Button
                  colorScheme="green"
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
