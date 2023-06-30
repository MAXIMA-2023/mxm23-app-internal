import { useState } from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  ModalFooter,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  HStack,
} from "@chakra-ui/react";

type CameraSettings = {
  fps: number;
  cameraFacing: "environment" | "user";
};

const QRScanner = ({
  onSuccess,
  onError,
}: {
  onSuccess: (result: string) => void;
  onError: (reason: string) => void;
}) => {
  // *state for camera
  const [cameraState, setCameraState] = useState<CameraSettings>({
    fps: 0,
    cameraFacing: "environment",
  });

  // *modal disclosure
  const { isOpen, onClose, onOpen } = useDisclosure();

  // *form handling
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CameraSettings>({ mode: "onSubmit" });

  return (
    <>
      <QrScanner
        // ? TESTING: apakah harus di kasih > 500ms (default) per scan?
        scanDelay={1000}
        containerStyle={{ height: "100%", aspectRatio: 9 / 16 }}
        videoStyle={{
          objectFit: "cover",
        }}
        constraints={{
          frameRate: cameraState.fps > 0 ? cameraState.fps : undefined,
          facingMode: { exact: cameraState.cameraFacing },
        }}
        onDecode={(result) => {
          if (!result.startsWith("MXM-")) {
            onError("Data QR bukan berformat MAXIMA");
            return;
          }

          const id = result.replace("MXM-", "");

          if (id.length !== 5) {
            onError("Data QR berformat MAXIMA, namun format id salah");
            return;
          }

          onSuccess(id);
        }}
        onError={(reason) => {
          if (reason.name === "OverconstrainedError") {
            onError(
              "Tidak dapat membuka Camera, coba ganti Arah Kamera di settings dan pastikan anda telah memberi akses Kamera di browser."
            );
            return;
          }

          if (reason.name === "TypeError") {
            onError(
              "Tidak dapat membuka Camera, pastikan anda telah memberi akses Kamera di browser."
            );
            return;
          }

          onError("Tidak dapat membaca QR.");
        }}
      />

      {/* floating setting */}
      <Button
        position="fixed"
        bottom={8}
        right={8}
        borderRadius="full"
        size="lg"
        zIndex={1}
        onClick={onOpen}
      >
        Settings
      </Button>

      {/* modal for menu */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Camera Settings</ModalHeader>
          <ModalCloseButton />

          <form
            onSubmit={handleSubmit((data) => {
              setCameraState(data);
              onClose();
            })}
          >
            <ModalBody>
              <FormControl isInvalid={!!errors.fps}>
                <FormLabel>FPS</FormLabel>
                <Input
                  // placeholder={cameraState.fps.toString()}
                  id="fps"
                  type="number"
                  {...register("fps", {
                    required: "FPS harus diisi dengan angka",
                    value: cameraState.fps,
                    max: {
                      value: 60,
                      message:
                        "Hanya support maksimum 60 FPS, set ke 0 untuk default",
                    },
                    min: {
                      value: 0,
                      message: "FPS tidak valid, set ke 0 untuk default",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.fps && errors.fps.message}
                </FormErrorMessage>
              </FormControl>

              <HStack>
                <FormControl isInvalid={!!errors.cameraFacing}>
                  <FormLabel>Arah Kamera</FormLabel>
                  <Controller
                    name="cameraFacing"
                    control={control}
                    defaultValue="environment"
                    rules={{
                      required: "Arah kamera harus dipilih",
                    }}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        // placeholder="Pilih arah kamera"
                        onChange={onChange}
                        value={value}
                      >
                        <option value="environment" key="environment">
                          Kamera Belakang
                        </option>
                        <option value="user" key="user">
                          Kamera Depan
                        </option>
                      </Select>
                    )}
                  />
                  <FormErrorMessage>
                    {errors.cameraFacing && errors.cameraFacing.message}
                  </FormErrorMessage>
                </FormControl>
              </HStack>
              <Text py={8} textAlign="justify">
                <Text fontWeight="bold">Note :</Text> FPS yang lebih rendah akan
                membuat baterai mu lebih irit. Namun, apabila FPS terlalu
                rendah, scanner akan menjadi delay. Set ke default (0) apabila
                kamu tidak mau ribet.
              </Text>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="green" mr={3}>
                Change
              </Button>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default QRScanner;
