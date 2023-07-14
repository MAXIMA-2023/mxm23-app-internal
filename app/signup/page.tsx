"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Text,
  Flex,
  Center,
  Stack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  Icon,
  Button,
  Select,
  textDecoration,
  FormControl,
  FormLabel,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Radio,
  RadioGroup,
  useRadio,
  useRadioGroup,
  HStack,
} from "@chakra-ui/react";
// import Container from "@/components/Container";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoKey } from "react-icons/io5";
import { BiShow, BiHide } from "react-icons/bi";
import Link from "next/link";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
// import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";
import { isExpired } from "react-jwt";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IUserInfo {
  nim: string;
  name: string;
  email: string;
  password: string;
  role: string;
  divisiID: string;
  stateID: string;
}

export default function SignUpPanitia() {
  const [show, setShow] = React.useState(false);
  const [role, setRole] = React.useState(0);
  const handleClick = () => setShow(!show);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<IUserInfo>();

  // const [isButtonLoading, setIsButtonLoading] = useState(false);
  // const [error, setError] = useState(undefined);

  // const [, setLocalStorage] = useLocalStorage("token", "");
  // const jwt = useReadLocalStorage("token");
  // const isMyTokenExpired = isExpired(jwt as string);

  // useEffect(() => {
  //   if (jwt && !isMyTokenExpired) {
  //     router.push("/");
  //   }
  // }, []);

  // const onSubmit: SubmitHandler<IUserInfo> = async (data: IUserInfo) => {
  //   try {
  //     setIsButtonLoading(true);
  //     const formData = new FormData();
  //     formData.append("nim", data.nim);
  //     formData.append("password", data.password);
  //     formData.append("name", data.name);
  //     formData.append("email", data.email);
  //     formData.append("divisiID", data.divisiID);
  //     formData.append("stateID", data.stateID);
  //     // formData.append("role", data.role);
  //     // await axios.post(`${process.env.API_URL}/api/`, formData);
  //     console.log(data);
  //     console.log("clicked");
  //     toast.success("Berhasil Terdaftar! harap menunggu verifikasi dari BPH atau Facio", {
  //       position: "bottom-left",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //     setIsButtonLoading(false);
  //     setTimeout(() => {
  //       router.push("/signin");
  //     }, 2000);
  //   } catch (err: any) {
  //     toast.error(err.response.data.message);
  //     console.log(err.response.data.message);
  //     setError(err.response.data.message);
  //     setIsButtonLoading(false);
  //   }
  // };

  //testing console log
  const onSubmit: SubmitHandler<IUserInfo> = async (data: IUserInfo) => {
    console.log("clicked");
    alert(JSON.stringify(data));
  };

  return (
    <>
      <title>MAXIMA 2023 Internal - Signup</title>
      <Flex h={"auto"} minH={["100vh", "100vh", "100vh", "100vh", "100vh"]} bgColor={"#F8FAFC"}>
        <Box w={"full"} py={["1em", "1em", "1.5em", "3em", "3em"]} px={["1em", "1em", "1.5em", "2em", "2em"]}>
          <Flex p={["1em", "0"]} position={"absolute"} minH={"100vh"} justifyContent={"center"} alignItems={"center"} right={"0"} left={"0"} top={"0 "} bottom={"0"}>
            <Flex w={"auto"} maxW={"35em"} h={"auto"} padding={"2em 2.5em"} borderRadius={"2em"} boxShadow={"lg"} bgColor={"#fff"} justifyContent={"center"} alignItems={"center"}>
              <Box>
                <Box mb={"1em"}>
                  <Text align={"left"} color={"black"} fontSize={"md"} fontWeight={"bold"}>
                    MAXIMA 2023
                  </Text>
                </Box>
                <Center mb={"1em"}>
                  <Text align={"center"} color={"black"} fontSize={["2xl", "2xl", "2xl", "3xl", "3xl"]} fontWeight={"bold"}>
                    Let's Create Your Account!
                  </Text>
                </Center>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormControl>
                    <Center mb={"1em"}>
                      <Stack w={"100%"} direction={"column"} spacing={"1em"}>
                        <Box>
                          <FormLabel>
                            <Text align={"left"} color={"black"} fontSize={"md"} fontWeight={"medium"}>
                              Nomor Induk Mahasiswa
                            </Text>
                          </FormLabel>
                          <InputGroup>
                            <Input {...register("nim", { required: "NIM harus diisi" })} py={"1.25em"} type="number" placeholder="12345" size={"md"} borderRadius={"lg"} />
                          </InputGroup>
                          {errors.nim !== undefined && <Text textColor={"red"}>{errors.nim.message}</Text>}
                        </Box>
                        <Box>
                          <FormLabel>
                            <Text align={"left"} color={"black"} fontSize={"md"} fontWeight={"medium"}>
                              Nama Lengkap
                            </Text>
                          </FormLabel>
                          <InputGroup>
                            <Input
                              {...register("name", {
                                required: "Nama lengkap harus diisi",
                              })}
                              py={"1.25em"}
                              type="text"
                              placeholder="John Thor"
                              size={"md"}
                              borderRadius={"lg"}
                            />
                          </InputGroup>
                          {errors.name !== undefined && <Text textColor={"red"}>{errors.name.message}</Text>}
                        </Box>
                        <Box>
                          <FormLabel>
                            <Text align={"left"} color={"black"} fontSize={"md"} fontWeight={"medium"}>
                              Email Student
                            </Text>
                          </FormLabel>
                          <InputGroup>
                            <Input {...register("email", { required: "Email harus diisi" })} py={"1.25em"} type="email" placeholder="abc@student.umn.ac.id" size={"md"} borderRadius={"lg"} />
                          </InputGroup>
                          {errors.email !== undefined && <Text textColor={"red"}>{errors.email.message}</Text>}
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
                                required: "Password harus diisi",
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
                        <Box>
                          <FormLabel>
                            <Text align={"left"} color={"black"} fontSize={"md"} fontWeight={"medium"}>
                              Role
                            </Text>
                          </FormLabel>
                          <Controller
                            control={control}
                            {...register("role", { required: "Role harus dipilih" })}
                            render={({ field: { onChange, value } }) => (
                              <>
                                <RadioGroup onChange={onChange} value={value}>
                                  <Stack direction="row">
                                    <Box onClick={() => setRole(1)}>
                                      <Radio value="1">Panitia</Radio>
                                    </Box>
                                    <Box onClick={() => setRole(2)}>
                                      <Radio value="2">Organisator</Radio>
                                    </Box>
                                  </Stack>
                                </RadioGroup>
                                {errors.role !== undefined && <Text textColor={"red"}>{errors.role.message}</Text>}
                              </>
                            )}
                          />
                        </Box>
                        {role === 0 ? (
                          <></>
                        ) : role === 1 ? (
                          <>
                            <Box>
                              <FormLabel>
                                <Text align={"left"} color={"black"} fontSize={"md"} fontWeight={"medium"}>
                                  Pilh Divisi
                                </Text>
                              </FormLabel>
                              <Select {...register("divisiID")} w={"full"} placeholder={"Pilih Divisi"} size={"md"}>
                                <option value="1">Eventus - Acara</option>
                                <option value="2">Novus - Publication</option>
                                <option value="3">Effigia - Dokumentasi</option>
                                <option value="4">Ornatus - Dekorasi</option>
                                <option value="5">Facio - Website</option>
                                <option value="6">Servanda - Sponsor</option>
                                <option value="7">Mercatura - Merchandise</option>
                                <option value="8">Nuntium - Media Relation</option>
                                <option value="9">Lammina - Fresh Money</option>
                                <option value="10">Fiducia - Perlengkapan</option>
                                <option value="11">Emporium - Bazaar</option>
                                <option value="12">Videre - Visual</option>
                                <option value="13">Inspice - Registrasi</option>
                                <option value="14">Armatura - Keamanan</option>
                              </Select>
                            </Box>
                          </>
                        ) : role === 2 ? (
                          <>
                            <Box>
                              <FormLabel>
                                <Text align={"left"} color={"black"} fontSize={"md"} fontWeight={"medium"}>
                                  Pilh STATE
                                </Text>
                              </FormLabel>
                              <Select {...register("stateID")} w={"full"} placeholder={"Pilih STATE"} size={"md"}>
                                <option value="1">Eventus - Acara</option>
                                <option value="2">Novus - Publication</option>
                                <option value="3">Effigia - Dokumentasi</option>
                                <option value="4">Ornatus - Dekorasi</option>
                                <option value="5">Facio - Website</option>
                                <option value="6">Servanda - Sponsor</option>
                                <option value="7">Mercatura - Merchandise</option>
                                <option value="8">Nuntium - Media Relation</option>
                                <option value="9">Lammina - Fresh Money</option>
                                <option value="10">Fiducia - Perlengkapan</option>
                                <option value="11">Emporium - Bazaar</option>
                                <option value="12">Videre - Visual</option>
                                <option value="13">Inspice - Registrasi</option>
                                <option value="14">Armatura - Keamanan</option>
                              </Select>
                            </Box>
                          </>
                        ) : (
                          <></>
                        )}
                      </Stack>
                    </Center>
                  </FormControl>
                  <Center mb={"1.5em"}>
                    <Button type={"submit"} w={"100%"} size={"md"} bgColor={"#185C99"} color={"white"} variant={"solid"} _hover={{ bgColor: "#185CDC" }} isLoading={isSubmitting}>
                      Sign up
                    </Button>
                  </Center>
                </form>
                <Box mb={"2em"}>
                  <Text align={"center"} color={"black"} fontSize={"sm"} fontWeight={"medium"}>
                    Sudah punya akun?{" "}
                    <Link href={"/signin"}>
                      <Text as={"span"} color={"#185C99"} fontWeight={"bold"} _hover={{ textDecoration: "underline" }}>
                        Kembali
                      </Text>
                    </Link>
                  </Text>
                </Box>
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Flex>
      <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
}
