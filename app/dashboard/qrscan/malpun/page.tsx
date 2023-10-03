"use client";
import { useEffect, useState } from "react";
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
  Skeleton,
} from "@chakra-ui/react";
import Layout from "@/components/Layout";

import dynamic from "next/dynamic";
// import QRScanner from "@/components/qrscan/QRScanner";

// dynamic import, biar ga ssr
const QRScanner = dynamic(
  () =>
    import("@/components/qrscan/QRScanner").then((module) => module.default),
  {
    ssr: false,
  }
);

import Swal from "sweetalert2";

import api, { HandleAxiosError, ResponseModel } from "@/services/api";
import { useAuth } from "@/contexts/Auth";
import LoadingSpinner from "@/components/LoadingSpinner";

type UserMalpun = {
  name: string;
  nim: number | null; // kalo external, nimnya null
  ticketClaimed: boolean;
  isAttendedMalpun: boolean;
  tokenMalpun: string;
  isInternal: boolean;
};

export default function QRScanMalpun() {
  const { loading } = useAuth();

  // modal
  const [currentUser, setCurrentUser] = useState<UserMalpun | null>(null);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <title>MAXIMA 2023 Internal - QR Scan Malpun</title>
      <Layout title="QR Scan Malpun" showDashboardButton disablePadding>
        <Box
          w="full"
          h="80vh"
          position="relative"
          borderRadius="2xl"
          overflow="hidden"
        >
          <QRScanner
            validation={(id) => {
              if (!id.startsWith("MXM23-")) {
                return "Data QR bukan berformat MAXIMA";
              }

              if (id.length != 38) {
                return "Data QR tidak valid";
              }
            }}
            onSuccess={async (id) => {
              // *debouncing, biar ga open berkali kali
              if (currentUser) {
                console.log("debounced");
                return;
              }

              try {
                const { data } = await api.get<ResponseModel<UserMalpun>>(
                  `/malpun/data/${id}` // tunggu endpoint dari backend
                );

                setCurrentUser(data.data!);
              } catch (err) {
                console.log(err);
                HandleAxiosError(err);
              }
            }}
            onError={(reason) => {
              Swal.fire("Error!", reason, "error");
            }}
          />
          <Modal
            isOpen={!!currentUser}
            onClose={() => setCurrentUser(null)}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader textColor="#1e1d22" fontWeight="bold">
                Presensi Malpun
              </ModalHeader>
              <ModalCloseButton />

              <ModalBody textColor="#1e1d22">
                <Box>
                  <Text>
                    <Text fontWeight={"bold"}>Nama</Text>
                    {currentUser?.name}
                  </Text>
                  {currentUser?.nim && (
                    <Text>
                      <Text fontWeight={"bold"}>NIM</Text>
                      {currentUser?.nim}
                    </Text>
                  )}
                  <Text>
                    <Text fontWeight={"bold"}>Status</Text>
                    {currentUser?.isInternal ? "Internal" : "External"}
                  </Text>
                </Box>
              </ModalBody>

              <ModalFooter>
                <Button
                  color="#185C99"
                  // mr={3}
                  onClick={() =>
                    api
                      .post("/malpun/absen/", {
                        token: currentUser?.tokenMalpun,
                      })
                      .then(({ data }) => {
                        Swal.fire(
                          "Berhasil!",
                          `Berhasil presensi masuk ${currentUser?.name}`,
                          "success"
                        );
                      })
                      .catch(HandleAxiosError)
                      .finally(() => setCurrentUser(null))
                  }
                  isDisabled={currentUser?.isAttendedMalpun}
                >
                  Masuk
                </Button>
                <Spacer />
                <Button
                  color="#185C99"
                  variant="outline"
                  onClick={() => setCurrentUser(null)}
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
