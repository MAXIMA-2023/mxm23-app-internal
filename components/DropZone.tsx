import { useState, useEffect } from "react";
import { Box, Text, Image, Center } from "@chakra-ui/react";
import { useController } from "react-hook-form";
import { useDropzone } from "react-dropzone";

const DropZone = ({
  control,
  name,
  rules,
}: {
  control: any;
  name: string;
  rules: any;
}) => {
  // yep ini buat nge hook ke react-hook-form
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ control, name, rules });

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
        onChange(acceptedFiles[0]);
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
