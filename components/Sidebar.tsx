//importing next components
import { usePathname, useRouter } from "next/navigation";

//importing chakra ui components
import {
  Box,
  Flex,
  Text,
  Center,
  Image,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Stack,
  Icon,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

//importing react icons
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineOfficeBuilding, HiOutlineSparkles } from "react-icons/hi";
import { MdSpaceDashboard, MdPeople, MdToggleOn, MdShield, MdOutlineShield, MdOutlineSchool, MdOutlineToggleOff, MdOutlineAirplanemodeActive, MdPeopleOutline, MdOutlineViewList, MdOutlineEdit, MdQrCodeScanner} from "react-icons/md";
import { BsToggles, BsPersonFill, BsFillPersonLinesFill, BsFillPersonCheckFill, BsCheckCircle } from "react-icons/bs";
import { IoRocketSharp, IoPeopleSharp } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import Link from "next/link";

//
// import { useReadLocalStorage, useLocalStorage } from "usehooks-ts";
import { isExpired } from "react-jwt";
// import { useUserContext } from "../useContext/userContext";
import React, { useEffect } from "react";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  //   const jwt = useReadLocalStorage("token");
  //   const isMyTokenExpired = isExpired(jwt as string);
  //   const { nim, name, role, divisiID } = useUserContext();
  //   const [, deleteToken] = useLocalStorage("token", "");
  //   const { deleteUserData } = useUserContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  //   useEffect(() => {
  //     if (!jwt || isMyTokenExpired) {
  //       router.push("/signin");
  //     }
  //   });

  const iconBoxSize = 5;

  return (
    <>
      <Box display={["none", "none", "none", "block"]} w={["17.5em", "17.5em", "17.5em", "15.5em", "20em"]} position={"fixed"}>
        <Flex py={"1.5em"} justifyContent={"left"} h={"100vh"} bgColor={"white"} overflowY={"auto"} boxShadow={"md"}>
          <Box w={"full"}>
            <Flex px={"2.5em"} alignItems={"center"} mb={"4em"}>
              <Box>
                <Image src={"/assets/LogoMaxima.png"} alt={"logo"} boxSize={["2em", "2em", "2em", "2em", "3em"]} />
              </Box>
              <Box ml={"1em"}>
                <Text align={"left"} color={"#1E1D22"} fontSize={"2xl"} fontWeight={"semibold"}>
                  MAXIMA 2023
                </Text>
              </Box>
            </Flex>
            <Stack px={"3.25em"} direction={"column"} spacing={"1.35em"}>
              {/* {divisiID === "0" || divisiID === "5" ? ( */}
              <>
                <Box>
                  <Link href={"/dashboard/verifikasi"}>
                    <Flex alignItems={"center"} textColor={pathname === "/dashboard/verifikasi" ? "#185C99" : "#9CA3AF"} _hover={{ textColor: "#185C99" }} cursor={"pointer"} transition={"0.1s ease-in-out"}>
                      <Icon as={BsCheckCircle} boxSize={iconBoxSize} />
                      <Text ml={"0.7em"} fontSize={"md"}>
                        Verifikasi
                      </Text>
                    </Flex>
                  </Link>
                </Box>
                <Box>
                  <Link href={"/dashboard/toggles"}>
                    <Flex alignItems={"center"} textColor={pathname === "/dashboard/toggles" ? "#185C99" : "#9CA3AF"} _hover={{ textColor: "#185C99" }} cursor={"pointer"} transition={"0.1s ease-in-out"}>
                      <Icon as={MdOutlineToggleOff} boxSize={iconBoxSize} />
                      <Text ml={"0.7em"} fontSize={"md"}>
                        Toggles
                      </Text>
                    </Flex>
                  </Link>
                </Box>
                <Divider borderWidth={"0.05em"} borderColor={"blackAlpha.500"} />
              </>
              {/* ) : ( */}
              {/* <></> */}
              {/* )} */}
              <Box>
                <Link href={"/dashboard"}>
                  <Flex alignItems={"center"} textColor={pathname === "/dashboard" ? "#185C99" : "#9CA3AF"} _hover={{ textColor: "#185C99" }} cursor={"pointer"} transition={"0.1s ease-in-out"}>
                    <Icon as={MdSpaceDashboard} boxSize={iconBoxSize} />
                    <Text ml={"0.7em"} fontSize={"md"}>
                      Dashboard
                    </Text>
                  </Flex>
                </Link>
              </Box>
              {/* <Box mb={"2em"}>
                <Link href={"/dashboard/oprec"}>
                  <Flex alignItems={"center"} textColor={pathname === "/dashboard/oprec" ? "#EF7903" : "#9CA3AF"} _hover={{ textColor: "#EF7903" }} cursor={"pointer"} transition={"0.1s ease-in-out"}>
                    <Icon as={IoRocketSharp} boxSize={6} />
                    <Text ml={"0.7em"} fontSize={"md"}>
                      OPREC
                    </Text>
                  </Flex>
                </Link>
              </Box> */}
              <Flex justifyContent={"start"} textColor={pathname === "/dashboard/oprec/agents" ? "#185C99" : pathname === "/" ? "#185C99" : "#9CA3AF"}>
                <Accordion w={"full"} allowToggle>
                  <AccordionItem border={"none"}>
                    <AccordionButton p={0} _hover={{ textColor: "#185C99" }} cursor={"pointer"} transition={"0.1s ease-in-out"}>
                      <Box flex="1" textAlign="left">
                        <Flex alignItems={"center"}>
                          <Icon as={MdOutlineShield} boxSize={iconBoxSize} />
                          <Text ml={"0.7em"} fontSize={"md"}>
                            Panitia
                          </Text>
                        </Flex>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel p={0}>
                      <Stack ml={"0.35em"} mt={"0.5em"} direction={"column"} spacing={"0.5em"}>
                        <Box>
                          <Link href={"/dashboard/oprec/agents"}>
                            <Flex alignItems={"center"} _hover={{ textColor: "#185C99" }} textColor={pathname === "/" ? "#185C99" : "#9CA3AF"} cursor={"pointer"} transition={"0.1s ease-in-out"}>
                              <Icon ml={"1.75em"} as={MdPeopleOutline} boxSize={iconBoxSize} />
                              <Text ml={"0.5em"} fontSize={"md"}>
                                Daftar Panitia
                              </Text>
                            </Flex>
                          </Link>
                        </Box>
                        <Box>
                          <Link href={"/dashboard/oprec/admission"}>
                            <Flex alignItems={"center"} textColor={pathname === "/dashboard/oprec/admission" ? "#185C99" : "#9CA3AF"} _hover={{ textColor: "#185C99" }} cursor={"pointer"} transition={"0.1s ease-in-out"}>
                              <Icon ml={"1.75em"} as={MdPeopleOutline} boxSize={iconBoxSize} />
                              <Text ml={"0.5em"} fontSize={"md"}>
                                Panitia Divisi
                              </Text>
                            </Flex>
                          </Link>
                        </Box>
                      </Stack>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Flex>
              <Box>
                <Link href={"/organisator"}>
                  <Flex alignItems={"center"} textColor={pathname === "/organisator" ? "#185C99" : "#9CA3AF"} _hover={{ textColor: "#185C99" }} cursor={"pointer"} transition={"0.1s ease-in-out"}>
                    <Icon as={HiOutlineOfficeBuilding} boxSize={iconBoxSize} />
                    <Text ml={"0.7em"} fontSize={"md"}>
                      Organisator
                    </Text>
                  </Flex>
                </Link>
              </Box>
              <Box>
                <Link href={"/mahasiswa"}>
                  <Flex alignItems={"center"} textColor={pathname === "/mahasiswa" ? "#185C99" : "#9CA3AF"} _hover={{ textColor: "#185C99" }} cursor={"pointer"} transition={"0.1s ease-in-out"}>
                    <Icon as={MdOutlineSchool} boxSize={iconBoxSize} />
                    <Text ml={"0.7em"} fontSize={"md"}>
                      Mahasiswa
                    </Text>
                  </Flex>
                </Link>
              </Box>
              <Flex justifyContent={"start"} textColor={pathname === "/" ? "#185C99" : pathname === "/" ? "#185C99" : "#9CA3AF"}>
                <Accordion w={"full"} allowToggle>
                  <AccordionItem border={"none"}>
                    <AccordionButton p={0} _hover={{ textColor: "#185C99" }} cursor={"pointer"} transition={"0.1s ease-in-out"}>
                      <Box flex="1" textAlign="left">
                        <Flex alignItems={"center"}>
                          <Icon as={MdOutlineAirplanemodeActive} boxSize={iconBoxSize} />
                          <Text ml={"0.7em"} fontSize={"md"}>
                            STATE
                          </Text>
                        </Flex>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel p={0}>
                      <Stack ml={"0.35em"} mt={"0.5em"} direction={"column"} spacing={"0.5em"}>
                        <Box>
                          <Link href={"/"}>
                            <Flex alignItems={"center"} _hover={{ textColor: "#185C99" }} textColor={pathname === "/" ? "#185C99" : "#9CA3AF"} cursor={"pointer"} transition={"0.1s ease-in-out"}>
                              <Icon ml={"1.75em"} as={MdOutlineViewList} boxSize={iconBoxSize} />
                              <Text ml={"0.5em"} fontSize={"md"}>
                                Daftar State
                              </Text>
                            </Flex>
                          </Link>
                        </Box>
                        <Box>
                          <Link href={"/"}>
                            <Flex alignItems={"center"} textColor={pathname === "/" ? "#185C99" : "#9CA3AF"} _hover={{ textColor: "#185C99" }} cursor={"pointer"} transition={"0.1s ease-in-out"}>
                              <Icon ml={"1.75em"} as={MdOutlineEdit} boxSize={iconBoxSize} />
                              <Text ml={"0.5em"} fontSize={"md"}>
                                Sunting
                              </Text>
                            </Flex>
                          </Link>
                        </Box>
                        <Box>
                          <Link href={"/"}>
                            <Flex alignItems={"center"} textColor={pathname === "/" ? "#185C99" : "#9CA3AF"} _hover={{ textColor: "#185C99" }} cursor={"pointer"} transition={"0.1s ease-in-out"}>
                              <Icon ml={"1.75em"} as={MdPeopleOutline} boxSize={iconBoxSize} />
                              <Text ml={"0.5em"} fontSize={"md"}>
                                Detail dan Peserta
                              </Text>
                            </Flex>
                          </Link>
                        </Box>
                      </Stack>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Flex>
              <Box>
                <Link href={"/"}>
                  <Flex alignItems={"center"} textColor={pathname === "/" ? "#185C99" : "#9CA3AF"} _hover={{ textColor: "#185C99" }} cursor={"pointer"} transition={"0.1s ease-in-out"}>
                    <Icon as={HiOutlineSparkles} boxSize={iconBoxSize} />
                    <Text ml={"0.7em"} fontSize={"md"}>
                      MALPUN
                    </Text>
                  </Flex>
                </Link>
              </Box>
              <Box>
                <Link href={"/"}>
                  <Flex alignItems={"center"} textColor={pathname === "/" ? "#185C99" : "#9CA3AF"} _hover={{ textColor: "#185C99" }} cursor={"pointer"} transition={"0.1s ease-in-out"}>
                    <Icon as={MdQrCodeScanner} boxSize={iconBoxSize} />
                    <Text ml={"0.7em"} fontSize={"md"}>
                      QR Scan
                    </Text>
                  </Flex>
                </Link>
              </Box>
            </Stack>
          </Box>
        </Flex>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Apoakah kamu yakin ingin keluar?</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Kembali
            </Button>
            <Button
              bgColor={"#EF7903"}
              color={"white"}
              _hover={{ bgColor: "#BE6913" }}
              onClick={() => {
                // deleteToken("");
                // deleteUserData();
                router.push("/signin");
              }}
            >
              Ya
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
