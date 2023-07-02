"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Text, Flex, Center, Stack, InputGroup, InputLeftElement, InputRightElement, Input, Icon, Button, Select, textDecoration, FormControl, FormLabel, Image } from "@chakra-ui/react";
// import Container from "@/components/Container";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoKey } from "react-icons/io5";
import { BiShow, BiHide } from "react-icons/bi";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
// import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";
import { isExpired } from "react-jwt";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

interface IUserInfo {
  nim: string;
  password: string;
}

export default function Login() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const router = useRouter();

  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [error, setError] = useState(undefined);

  // const [, setLocalStorage] = useLocalStorage("token", "");
  // const jwt = useReadLocalStorage("token");
  // const isMyTokenExpired = isExpired(jwt as string);

  // useEffect(() => {
  //   if (jwt && !isMyTokenExpired) {
  //     router.push("/dashboard");
  //   }
  // }, []);
  
  const onSubmit: SubmitHandler<IUserInfo> = async (data: IUserInfo) => {
    try {
      setIsButtonLoading(true);
      const formData = new FormData();
      formData.append("nim", data.nim);
      formData.append("password", data.password);
      // const response = await axios.post(`${process.env.API_URL}/api/`, formData);
      Swal.fire("Selamat!", "Anda berhasil masuk!", "success");
      // setLocalStorage(response?.data?.token);
      setIsButtonLoading(false);
      router.push("/dashboard");
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: `${err.response.data.message}`,
      });
      console.log(err.response.data.message);
      setError(err.response.data.message);
      setIsButtonLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserInfo>();

  return (
    <Flex minH={["105vh", "105vh", "105vh", "100vh", "100vh"]} bgColor={"#F8FAFC"}>
      <Flex p={["1em", "0"]} position={"absolute"} minH={"100vh"} justifyContent={"center"} alignItems={"center"} right={"0"} left={"0"} top={"0 "} bottom={"0"}>
        <Flex w={"auto"} maxW={"35em"} h={"auto"} padding={"2em 2.5em"} borderRadius={"2em"} boxShadow={"lg"} bgColor={"#fff"} justifyContent={"center"} alignItems={"center"}>
          <Box>
            <Flex mb={"1em"} alignItems={"center"}>
              <Box>
                <Image src={"/assets/LogoMaxima.png"} alt={"logo"} boxSize={["2em", "2em", "2em", "2em", "2em"]} />
              </Box>
              <Box ml={"0.5em"}>
                <Text align={"left"} color={"black"} fontSize={"md"} fontWeight={"bold"}>
                  MAXIMA 2023
                </Text>
              </Box>
            </Flex>
            <Center mb={"1em"}>
              <Text align={"center"} color={"black"} fontSize={["2xl", "2xl", "2xl", "3xl", "4xl"]} fontWeight={"bold"}>
                Log In to Dashboard
              </Text>
            </Center>
            <Center mb={"2.5em"}>
              <Text w={["auto", "auto", "auto", "25em", "25em"]} align={"center"} color={"black"} fontSize={"md"} fontWeight={"medium"}>
                Masukkan details kamu untuk masuk ke dashboard!
              </Text>
            </Center>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl onSubmit={handleSubmit(onSubmit)}>
                <Center mb={"1em"}>
                  <Stack w={"100%"} direction={"column"} spacing={"1em"}>
                    <Box>
                      <FormLabel>
                        <Text align={"left"} color={"black"} fontSize={"md"} fontWeight={"medium"}>
                          Nomor Induk Mahasiswa
                        </Text>
                      </FormLabel>
                      <InputGroup>
                        <Input
                          {...register("nim", {
                            required: "NIM harap diisi",
                          })}
                          py={"1.25em"}
                          type="number"
                          placeholder="12345"
                          size={"md"}
                          borderRadius={"lg"}
                        />
                      </InputGroup>
                      {errors.nim !== undefined && <Text textColor={"red"}>{errors.nim.message}</Text>}
                    </Box>
                    <Box>
                      <FormLabel>
                        <Text align={"left"} color={"black"} fontSize={"md"} fontWeight={"medium"}>
                          Password
                        </Text>
                      </FormLabel>
                      <InputGroup>
                        <Input
                          {...register("password", {
                            required: "Password harap diisi",
                          })}
                          py={"1.25em"}
                          type={show ? "text" : "password"}
                          placeholder="Enter password"
                          size={"md"}
                          borderRadius={"lg"}
                        />
                        <InputRightElement py={"1.25em"} width="4.5rem">
                          <Button variant={"none"} onClick={handleClick}>
                            {show ? <Icon as={BiHide} boxSize={5} /> : <Icon as={BiShow} boxSize={5} />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      {errors.password !== undefined && <Text textColor={"red"}>{errors.password.message}</Text>}
                    </Box>
                  </Stack>
                </Center>
              </FormControl>
              <Box mb={"2em"}>
                <Text align={"left"} color={"black"} fontSize={"sm"} fontWeight={"medium"}>
                  Lupa Password? Klik{" "}
                  <Text as={"span"} color={"#185C99"} fontWeight={"bold"} _hover={{ cursor: "not-allowed" }}>
                    disini
                  </Text>
                </Text>
              </Box>
              <Center mb={"1.5em"}>
                {isButtonLoading ? (
                  <Button type="submit" w={"100%"} size={"md"} bgColor={"#185C99"} color={"white"} variant={"solid"} _hover={{ bgColor: "#185CDC" }} isLoading>
                    Sign in
                  </Button>
                ) : (
                  <Button type="submit" w={"100%"} size={"md"} bgColor={"#185C99"} color={"white"} variant={"solid"} _hover={{ bgColor: "#185CDC"}}>
                    Sign in
                  </Button>
                )}
              </Center>
            </form>
            <Box mb={"2em"}>
              <Text align={"center"} color={"black"} fontSize={"sm"} fontWeight={"medium"}>
                Belum punya akun?{" "}
                <Link href={"/signup/panitia"}>
                  <Text as={"span"} color={"#185C99"} fontWeight={"bold"} _hover={{ textDecoration: "underline" }}>
                    Bikin sekarang
                  </Text>
                </Link>
              </Text>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}