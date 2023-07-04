"use client";
import { useState } from "react";
import {
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
import Layout from "@/components/Layout";
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
      <title>MAXIMA 2023 Internal - QR Scan Malpun</title>
      <Layout title="QR Scan MALPUN" showDashboardButton disablePadding>
        <Box
          w="full"
          h="100vh"
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

              // !TODO: Handling buat akun yang gak eligible atau belum bayar.
              if (!DummyPresensiData.malpun.isEligible) {
                Swal.fire(
                  "Error!",
                  DummyPresensiData.isInternal
                    ? "Mahasiswa tidak eligible untuk mengikuti MALPUN"
                    : "Peserta tidak berhak untuk mengikuti MALPUN karena belum bayar",
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
        </Box>
      </Layout>
    </>
  );
}
