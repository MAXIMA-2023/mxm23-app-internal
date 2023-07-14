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
  Select,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { BiShow, BiHide } from "react-icons/bi";
import Link from "next/link";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";

import api, { HandleAxiosError } from "@/services/api";
import { useAuth } from "@/contexts/Auth";

type UserSignUp = {
  nim: number;
  name: string;
  email: string;
  password: string;
  role: string;
  divisiID: string;
  stateID: number;
};

type Divisi = {
  divisiID: string;
  name: string;
};

type State = {
  stateID: number;
  name: string;
};

export default function SignUpPanitia() {
  const [show, setShow] = useState(false);
  const [role, setRole] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [divisi, setDivisi] = useState<Divisi[]>([]);
  const [state, setState] = useState<State[]>([]);

  const auth = useAuth();
  const handleClick = () => setShow(!show);
  const router = useRouter();

  useEffect(() => {
    if (auth?.isLoggedIn) {
      router.push("/dashboard");
      return;
    }

    const getDivisi = async () => {
      try {
        const { data } = await api.get("/divisi");
        setDivisi(data);
      } catch (error) {
        HandleAxiosError(error);
      }
    };
    const getState = async () => {
      try {
        const { data } = await api.get("/state");
        setState(data);
      } catch (error) {
        HandleAxiosError(error);
      }
    };
    getDivisi();
    getState();
    setIsLoading(false);
  }, [auth?.isLoggedIn, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<UserSignUp>();

  //testing console log
  const onSubmit: SubmitHandler<UserSignUp> = async (data: UserSignUp) => {
    try {
      const { data: response } = await api.post<{ message: string }>(
        data.role === "1" ? "/panitia/register" : "/organisator/register",
        data
      );
      Swal.fire("Success", response.message, "success");
    } catch (error) {
      HandleAxiosError(error);
    }
  };

  return (
    <>
      <title>MAXIMA 2023 Internal - Signup</title>
      <Flex
        h={"auto"}
        minH={["100vh", "100vh", "100vh", "100vh", "100vh"]}
        bgColor={"#F8FAFC"}
      >
        <Box
          w={"full"}
          py={["1em", "1em", "1.5em", "3em", "3em"]}
          px={["1em", "1em", "1.5em", "2em", "2em"]}
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
                <Box mb={"1em"}>
                  <Text
                    align={"left"}
                    color={"black"}
                    fontSize={"md"}
                    fontWeight={"bold"}
                  >
                    MAXIMA 2023
                  </Text>
                </Box>
                <Center mb={"1em"}>
                  <Text
                    align={"center"}
                    color={"black"}
                    fontSize={["2xl", "2xl", "2xl", "3xl", "3xl"]}
                    fontWeight={"bold"}
                  >
                    Let&apos;s Create Your Account!
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
                                required: "NIM harus diisi",
                                min: {
                                  value: 10000,
                                  message: "NIM harus 5 digit",
                                },
                                maxLength: {
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
                              Nama Lengkap
                            </Text>
                          </FormLabel>
                          <InputGroup>
                            <Input
                              {...register("name", {
                                required: "Nama lengkap harus diisi",
                                maxLength: {
                                  value: 20,
                                  message: "Nama lengkap maximum 20 karakter",
                                },
                                pattern: {
                                  value: /^[A-Za-z .]*$/,
                                  message: "Nama lengkap tidak valid",
                                },
                              })}
                              py={"1.25em"}
                              type="text"
                              placeholder="John Thor"
                              size={"md"}
                              borderRadius={"lg"}
                            />
                          </InputGroup>
                          {errors.name !== undefined && (
                            <Text textColor={"red"}>{errors.name.message}</Text>
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
                              Email Student
                            </Text>
                          </FormLabel>
                          <InputGroup>
                            <Input
                              {...register("email", {
                                required: "Email harus diisi",
                                pattern: {
                                  value: /^(\w+(.\w+)*)(@student.umn.ac.id)$/gm,
                                  message: "Harus menggunakan email student",
                                },
                              })}
                              py={"1.25em"}
                              type="email"
                              placeholder="abc@student.umn.ac.id"
                              size={"md"}
                              borderRadius={"lg"}
                            />
                          </InputGroup>
                          {errors.email !== undefined && (
                            <Text textColor={"red"}>
                              {errors.email.message}
                            </Text>
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
                                required: "Password harus diisi",
                                min: {
                                  value: 8,
                                  message: "Password minimum 8 karakter",
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
                        <Box>
                          <FormLabel>
                            <Text
                              align={"left"}
                              color={"black"}
                              fontSize={"md"}
                              fontWeight={"medium"}
                            >
                              Role
                            </Text>
                          </FormLabel>
                          <Controller
                            control={control}
                            {...register("role", {
                              required: "Role harus dipilih",
                            })}
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
                                {errors.role !== undefined && (
                                  <Text textColor={"red"}>
                                    {errors.role.message}
                                  </Text>
                                )}
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
                                <Text
                                  align={"left"}
                                  color={"black"}
                                  fontSize={"md"}
                                  fontWeight={"medium"}
                                >
                                  Pilh Divisi
                                </Text>
                              </FormLabel>
                              <Select
                                {...register("divisiID", {
                                  required: "Divisi harus dipilih",
                                })}
                                w={"full"}
                                placeholder={"Pilih Divisi"}
                                size={"md"}
                              >
                                {divisi.map((v) => (
                                  <option value={v.divisiID} key={v.divisiID}>
                                    {v.name}
                                  </option>
                                ))}
                              </Select>
                              {errors.divisiID !== undefined && (
                                <Text textColor={"red"}>
                                  {errors.divisiID.message}
                                </Text>
                              )}
                            </Box>
                          </>
                        ) : role === 2 ? (
                          <>
                            <Box>
                              <FormLabel>
                                <Text
                                  align={"left"}
                                  color={"black"}
                                  fontSize={"md"}
                                  fontWeight={"medium"}
                                >
                                  Pilh STATE
                                </Text>
                              </FormLabel>
                              <Select
                                {...register("stateID", {
                                  required: "STATE harus dipilih",
                                  valueAsNumber: true,
                                })}
                                w={"full"}
                                placeholder={"Pilih STATE"}
                                size={"md"}
                              >
                                {state.map((v) => (
                                  <option value={v.stateID} key={v.stateID}>
                                    {v.name}
                                  </option>
                                ))}
                              </Select>
                              {errors.stateID !== undefined && (
                                <Text textColor={"red"}>
                                  {errors.stateID.message}
                                </Text>
                              )}
                            </Box>
                          </>
                        ) : (
                          <></>
                        )}
                      </Stack>
                    </Center>
                  </FormControl>
                  <Center mb={"1.5em"}>
                    <Button
                      type={"submit"}
                      w={"100%"}
                      size={"md"}
                      bgColor={"#185C99"}
                      color={"white"}
                      variant={"solid"}
                      _hover={{ bgColor: "#185CDC" }}
                      isLoading={isSubmitting || isLoading}
                    >
                      Sign up
                    </Button>
                  </Center>
                </form>
                <Box mb={"2em"}>
                  <Text
                    align={"center"}
                    color={"black"}
                    fontSize={"sm"}
                    fontWeight={"medium"}
                  >
                    Sudah punya akun?{" "}
                    <Link href={"/signin"}>
                      <Text
                        as={"span"}
                        color={"#185C99"}
                        fontWeight={"bold"}
                        _hover={{ textDecoration: "underline" }}
                      >
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
    </>
  );
}
