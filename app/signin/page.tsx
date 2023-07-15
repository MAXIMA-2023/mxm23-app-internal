"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Text,
  Flex,
  Center,
  Stack,
  InputGroup,
  InputRightElement,
  Input,
  Icon,
  Button,
  FormControl,
  FormLabel,
  Image,
} from "@chakra-ui/react";
import { BiShow, BiHide } from "react-icons/bi";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/contexts/Auth";
import { HandleAxiosError } from "@/services/api";

type UserLogin = {
  nim: number;
  password: string;
};

export default function Login() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (auth?.isLoggedIn) {
      router.push("/dashboard");
      return;
    }
  }, [auth?.isLoggedIn, router]);

  const onSubmit: SubmitHandler<UserLogin> = async (data: UserLogin) => {
    try {
      auth?.login(data.nim, data.password);
    } catch (error) {
      HandleAxiosError(error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>();

  return (
    <>
      <title>MAXIMA 2023 Internal - Signin</title>
      <Flex
        minH={["105vh", "105vh", "105vh", "100vh", "100vh"]}
        bgColor={"#F8FAFC"}
      >
        <Flex
          p={["1em", "0"]}
          position={"absolute"}
          minH={"100vh"}
          justifyContent={"center"}
          alignItems={"center"}
          right={"0"}
          left={"0"}
          top={"0 "}
          bottom={"0"}
        >
          <Flex
            w={"auto"}
            maxW={"35em"}
            h={"auto"}
            padding={"2em 2.5em"}
            borderRadius={"2em"}
            boxShadow={"lg"}
            bgColor={"#fff"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box>
              <Flex mb={"1em"} alignItems={"center"}>
                <Box>
                  <Image
                    src={"/assets/LogoMaxima.png"}
                    alt={"logo"}
                    boxSize={["2em", "2em", "2em", "2em", "2em"]}
                  />
                </Box>
                <Box ml={"0.5em"}>
                  <Text
                    align={"left"}
                    color={"black"}
                    fontSize={"md"}
                    fontWeight={"bold"}
                  >
                    MAXIMA 2023
                  </Text>
                </Box>
              </Flex>
              <Center mb={"1em"}>
                <Text
                  align={"center"}
                  color={"black"}
                  fontSize={["2xl", "2xl", "2xl", "3xl", "4xl"]}
                  fontWeight={"bold"}
                >
                  Log In to Dashboard
                </Text>
              </Center>
              <Center mb={"2.5em"}>
                <Text
                  w={["auto", "auto", "auto", "25em", "25em"]}
                  align={"center"}
                  color={"black"}
                  fontSize={"md"}
                  fontWeight={"medium"}
                >
                  Masukkan details kamu untuk masuk ke dashboard!
                </Text>
              </Center>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                  <Center mb={"1em"}>
                    <Stack w={"100%"} direction={"column"} spacing={"1em"}>
                      <Box>
                        <FormLabel>
                          <Text
                            align={"left"}
                            color={"black"}
                            fontSize={"md"}
                            fontWeight={"medium"}
                          >
                            Nomor Induk Mahasiswa
                          </Text>
                        </FormLabel>
                        <InputGroup>
                          <Input
                            {...register("nim", {
                              required: "NIM harap diisi",
                              min: {
                                value: 10000,
                                message: "NIM harus 5 digit",
                              },
                              max: {
                                value: 99999,
                                message: "NIM harus 5 digit",
                              },
                              valueAsNumber: true,
                            })}
                            py={"1.25em"}
                            type="number"
                            placeholder="12345"
                            size={"md"}
                            borderRadius={"lg"}
                          />
                        </InputGroup>
                        {errors.nim !== undefined && (
                          <Text textColor={"red"}>{errors.nim.message}</Text>
                        )}
                      </Box>
                      <Box>
                        <FormLabel>
                          <Text
                            align={"left"}
                            color={"black"}
                            fontSize={"md"}
                            fontWeight={"medium"}
                          >
                            Password
                          </Text>
                        </FormLabel>
                        <InputGroup>
                          <Input
                            {...register("password", {
                              required: "Password harap diisi",
                              minLength: {
                                value: 8,
                                message: "Password harus 8 karakter",
                              },
                            })}
                            py={"1.25em"}
                            type={show ? "text" : "password"}
                            placeholder="Enter password"
                            size={"md"}
                            borderRadius={"lg"}
                          />
                          <InputRightElement py={"1.25em"} width="4.5rem">
                            <Button variant={"none"} onClick={handleClick}>
                              {show ? (
                                <Icon as={BiHide} boxSize={5} />
                              ) : (
                                <Icon as={BiShow} boxSize={5} />
                              )}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        {errors.password !== undefined && (
                          <Text textColor={"red"}>
                            {errors.password.message}
                          </Text>
                        )}
                      </Box>
                    </Stack>
                  </Center>
                </FormControl>
                <Box mb={"2em"}>
                  <Text
                    align={"left"}
                    color={"black"}
                    fontSize={"sm"}
                    fontWeight={"medium"}
                  >
                    Lupa Password? Klik{" "}
                    <Text
                      as={"span"}
                      color={"#185C99"}
                      fontWeight={"bold"}
                      _hover={{ cursor: "not-allowed" }}
                    >
                      disini
                    </Text>
                  </Text>
                </Box>
                <Center mb={"1.5em"}>
                  {auth?.loading ? (
                    <Button
                      type="submit"
                      w={"100%"}
                      size={"md"}
                      bgColor={"#185C99"}
                      color={"white"}
                      variant={"solid"}
                      _hover={{ bgColor: "#185CDC" }}
                      isLoading
                    >
                      Sign in
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      w={"100%"}
                      size={"md"}
                      bgColor={"#185C99"}
                      color={"white"}
                      variant={"solid"}
                      _hover={{ bgColor: "#185CDC" }}
                    >
                      Sign in
                    </Button>
                  )}
                </Center>
              </form>
              <Box mb={"2em"}>
                <Text
                  align={"center"}
                  color={"black"}
                  fontSize={"sm"}
                  fontWeight={"medium"}
                >
                  Belum punya akun?{" "}
                  <Link href={"/signup/"}>
                    <Text
                      as={"span"}
                      color={"#185C99"}
                      fontWeight={"bold"}
                      _hover={{ textDecoration: "underline" }}
                    >
                      Bikin sekarang
                    </Text>
                  </Link>
                </Text>
              </Box>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
