import { useState, useEffect } from "react";
import { Box, Text, Image, Center } from "@chakra-ui/react";
import { useController } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";
import Swal from "sweetalert2";

const DropZone = ({
  control,
  name,
  rules,
  defaultValue,
}: {
  control: any;
  name: string;
  rules: any;
  defaultValue?: any;
}) => {
  // yep ini buat nge hook ke react-hook-form
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ control, name, rules, defaultValue });

  useEffect(() => {
    return () => {
      if (value && value.preview) {
        URL.revokeObjectURL(value.preview);
      }
    };
  }, [value]);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: { "image/jpeg": [], "image/jpg": [], "image/png": [] },
    onDrop: (acceptedFiles: File[]) => {
      if (acceptedFiles.length) {
        imageCompression(acceptedFiles[0], {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 512,
          useWebWorker: true,
        })
          .then((file) => onChange(file))
          .catch((err) => {
            console.error(err);
            Swal.fire(
              "Error",
              "Terjadi kesalahan saat mengompres gambar",
              "error"
            );
          });
      }
    },
  });

  const thumb = value && (
    <Box
      display={"inline-flex"}
      borderRadius={4}
      border={"2px solid #eaeaea"}
      mt={"16px"}
      mx={1}
      w={"auto"}
      h={"auto"}
      p={1}
      boxSizing={"border-box"}
    >
      <Box display={"flex"} w={"auto"} h={"100%"}>
        <Image
          src={URL.createObjectURL(value)}
          style={{ display: "block", width: "auto", height: "100%" }}
          onLoad={() => {
            URL.revokeObjectURL(value);
          }}
          alt={value.name}
        />
      </Box>
    </Box>
  );

  return (
    <>
      <Center
        p={"0.8em"}
        border={"dashed #e2e8f0"}
        width={"100%"}
        height={"5em"}
        borderRadius={10}
        {...getRootProps({ className: "dropzone" })}
        transition={"0.1s ease-in-out"}
        _hover={{ border: "dashed #CBD5E0", cursor: "pointer" }}
      >
        <input {...getInputProps()} />
        <Text color={"#A6A8AC"} userSelect={"none"} align={"center"}>
          Seret dan taruh file di sini, atau klik untuk memilih file
        </Text>
      </Center>
      <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"}>
        {thumb}
      </Box>
    </>
  );
};
export default DropZone;
