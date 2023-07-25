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
import QRScanner from "@/components/qrscan/QRScanner";
import Swal from "sweetalert2";

import api, { HandleAxiosError, ResponseModel } from "@/services/api";

type StateReg = {
  nim: number;
  token: string;
  name: string;
  created_at: string;
  attendanceTime: string;
  isFirstAttended: boolean;
  isLastAttended: boolean;
  stateID: number;
  stateName: string;
  day: string;
};

type DayManagement = {
  day: string;
  hari: number;
  date: string;
};

// format sekarang ikutin backend
// harusnya ISOstring aja dari awal
const parseDate = (date: string) => {
  return new Date(Date.parse(date.replace(" WIB", "")));
};

export default function QRScanSTATE() {
  // modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentUser, setCurrentUser] = useState<StateReg | null>(null);

  // fetch dayManagement
  const [day, setDay] = useState<string | null>(null);
  const [fetchLoading, setFetchLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDayManagement = async () => {
      try {
        const { data } = await api.get<DayManagement[]>("/dayManagement");

        // find day using today's date
        const today = new Date();
        const found = data.find((item) => {
          const parsed = parseDate(item.date);
          return (
            parsed.getDate() === today.getDate() &&
            parsed.getMonth() === today.getMonth() &&
            parsed.getFullYear() === today.getFullYear()
            //  && parsed <= today // uncomment kalo mau ini strict jam nya
          );
        });

        if (found) {
          return setDay(found.day);
        }
      } catch (err) {
        console.log(err);
        HandleAxiosError(err);
      }
    };

    fetchDayManagement().finally(() => {
      setFetchLoading(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <title>MAXIMA 2023 Internal - QR Scan State</title>
      <Layout title="QR Scan STATE" showDashboardButton disablePadding>
        <Box
          w="full"
          h="80vh"
          position="relative"
          borderRadius="2xl"
          overflow="hidden"
        >
          <Skeleton isLoaded={!fetchLoading}>
            <QRScanner
              onSuccess={(id) => {
                // handle empty day
                if (!day) {
                  Swal.fire(
                    "Error!",
                    "Tidak ada STATE yang aktif hari ini",
                    "error"
                  );
                  return;
                }

                // *debouncing, biar ga open berkali kali
                if (isOpen) {
                  return;
                }

                // get user state reg
                api
                  .get<ResponseModel<StateReg[]>>(`/state/data/${id}`)
                  .then(({ data }) => {
                    const stateReg = data.data?.find(
                      (item) => item.day === day
                    );

                    if (!stateReg) {
                      Swal.fire(
                        "Error!",
                        "Peserta tidak terdaftar di STATE manapun hari ini",
                        "error"
                      );
                      return;
                    }

                    setCurrentUser(stateReg);
                    onOpen();
                  })
                  .catch((err) => {
                    console.log(err);
                    HandleAxiosError(err);
                  });
              }}
              onError={(reason) => {
                Swal.fire("Error!", reason, "error");
              }}
            />
          </Skeleton>

          {/* !TODO: Buat modal alert */}
          {/* ?TESTING: useState bikin re render gak ya?, sayang performance camera */}
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader textColor="#1e1d22" fontWeight="bold">
                Presensi STATE {currentUser?.stateName}
              </ModalHeader>
              <ModalCloseButton />

              <ModalBody textColor="#1e1d22">
                <Box>
                  <Text>
                    <Text fontWeight={"bold"}>NIM</Text>
                    {currentUser?.nim}
                  </Text>
                  <Text>
                    <Text fontWeight={"bold"}>Nama</Text>
                    {currentUser?.name}
                  </Text>
                  <Text>
                    <Text fontWeight={"bold"}>STATE</Text>
                    {currentUser?.stateName}
                  </Text>
                  <Text>
                    <Text fontWeight={"bold"}>Waktu Presensi</Text>
                    {currentUser?.attendanceTime
                      ? new Date(currentUser?.attendanceTime!).toLocaleString()
                      : "-"}
                  </Text>
                </Box>
              </ModalBody>

              <ModalFooter>
                <Button
                  color="#185C99"
                  mr={3}
                  onClick={() =>
                    api
                      .post("/state/attendance/first", {
                        token: currentUser?.token,
                        stateID: currentUser?.stateID,
                      })
                      .then(() => {
                        onClose();
                        Swal.fire(
                          "Berhasil!",
                          `Presensi awal NIM ${currentUser?.nim} di STATE ${currentUser?.stateName} Berhasil!`,
                          "success"
                        );
                      })
                      .catch((err) => {
                        onClose();
                        console.log(err);
                        HandleAxiosError(err);
                      })
                  }
                  isDisabled={currentUser?.isFirstAttended}
                >
                  Masuk
                </Button>
                <Button
                  color="#185C99"
                  mr={3}
                  onClick={() =>
                    api
                      .post("/state/attendance/last", {
                        token: currentUser?.token,
                        stateID: currentUser?.stateID,
                      })
                      .then(() => {
                        onClose();
                        Swal.fire(
                          "Berhasil!",
                          `Presensi akhir NIM ${currentUser?.nim} di STATE ${currentUser?.stateName} Berhasil!`,
                          "success"
                        );
                      })
                      .catch((err) => {
                        onClose();
                        console.log(err);
                        HandleAxiosError(err);
                      })
                  }
                  isDisabled={currentUser?.isLastAttended}
                >
                  Keluar
                </Button>
                <Spacer />
                <Button color="#185C99" variant="outline" onClick={onClose}>
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
