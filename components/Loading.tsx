import { Box, Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Box position="fixed" top="0" left="0" right="0" bottom="0" zIndex="9999" bg="rgba(0,0,0,0.5)" display="flex" justifyContent="center" alignItems="center">
      <Spinner size={"xl"} color={"#185C99"} />
    </Box>
  );
}
