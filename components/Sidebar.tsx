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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";

//importing react icons
import {
  HiOfficeBuilding,
  HiOutlineOfficeBuilding,
  HiOutlineSparkles,
  HiSparkles,
} from "react-icons/hi";
import {
  MdOutlineSpaceDashboard,
  MdOutlineShield,
  MdOutlineSchool,
  MdOutlineToggleOff,
  MdOutlineAirplanemodeActive,
  MdPeopleOutline,
  MdOutlineViewList,
  MdOutlineEdit,
  MdQrCodeScanner,
  MdAccountCircle,
  MdLogout,
  MdAdminPanelSettings,
  MdSpaceDashboard,
  MdGroups,
  MdWorkspacesFilled,
  MdAirplanemodeActive,
  MdSchool,
  MdShield,
  MdToggleOff,
  MdPeople,
  MdViewList,
  MdEdit,
} from "react-icons/md";
import { BsCheckCircle, BsCheckCircleFill } from "react-icons/bs";
import Link from "next/link";

//
import React, { useEffect } from "react";
import { useAuth } from "@/contexts/Auth";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const auth = useAuth()!;
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!auth.loading && !auth?.isLoggedIn) {
      router.push("/signin");
      return;
    }
  }, [auth?.isLoggedIn, auth.loading, router]);

  const iconBoxSize = 5;

  return (
    <>
      <Box
        display={["none", "none", "none", "block"]}
        w={["17.5em", "17.5em", "17.5em", "15.5em", "20em"]}
        position={"fixed"}
      >
        <Flex
          py={"1.5em"}
          justifyContent={"left"}
          h={"100vh"}
          bgColor={"white"}
          overflowY={"auto"}
          overflowX={"hidden"}
          boxShadow={"md"}
        >
          <Box w={"full"}>
            <Flex px={"2.5em"} alignItems={"center"} mb={"2em"}>
              <Box>
                <Image
                  src={"/assets/LogoMaxima.png"}
                  alt={"logo"}
                  boxSize={["2em", "2em", "2em", "2em", "3em"]}
                />
              </Box>
              <Box ml={"1em"}>
                <Text
                  align={"left"}
                  color={"#1E1D22"}
                  fontSize={"2xl"}
                  fontWeight={"semibold"}
                >
                  MAXIMA 2023
                </Text>
              </Box>
            </Flex>
            <Stack px={"2em"} direction={"column"}>
              <Box>
                <Link href={"/dashboard/verifikasi"}>
                  <Flex
                    alignItems={"center"}
                    py={"0.75em"}
                    px={"1.25em"}
                    bgColor={
                      pathname === "/dashboard/verifikasi"
                        ? "#FAFAFA"
                        : "transparent"
                    }
                    color={
                      pathname === "/dashboard/verifikasi"
                        ? "#185C99"
                        : "#1E1D22"
                    }
                    _hover={{ bgColor: "#FAFAFA", color: "#185C99" }}
                    cursor={"pointer"}
                    borderRadius={"md"}
                    transition={"0.1s ease-in-out"}
                  >
                    <Icon
                      as={
                        pathname === "/dashboard/verifikasi"
                          ? BsCheckCircleFill
                          : BsCheckCircle
                      }
                      boxSize={iconBoxSize}
                    />
                    <Text ml={"0.7em"} fontSize={"md"} fontWeight={"medium"}>
                      Verifikasi
                    </Text>
                  </Flex>
                </Link>
              </Box>
              <Box>
                <Link href={"/dashboard/toggles"}>
                  <Flex
                    alignItems={"center"}
                    py={"0.75em"}
                    px={"1.25em"}
                    bgColor={
                      pathname === "/dashboard/toggles"
                        ? "#FAFAFA"
                        : "transparent"
                    }
                    color={
                      pathname === "/dashboard/toggles" ? "#185C99" : "#1E1D22"
                    }
                    _hover={{ bgColor: "#FAFAFA", color: "#185C99" }}
                    cursor={"pointer"}
                    borderRadius={"md"}
                    transition={"0.1s ease-in-out"}
                  >
                    <Icon
                      as={
                        pathname === "/dashboard/toggles"
                          ? MdToggleOff
                          : MdOutlineToggleOff
                      }
                      boxSize={iconBoxSize}
                    />
                    <Text ml={"0.7em"} fontSize={"md"} fontWeight={"medium"}>
                      Toggles
                    </Text>
                  </Flex>
                </Link>
              </Box>
            </Stack>
            <Divider
              w={"full"}
              my={"1em"}
              borderWidth={2}
              borderColor={"#EFEFEF"}
            />
            <Stack
              w={"full"}
              h={"auto"}
              px={"2em"}
              direction={"column"}
              maxH={"50vh"}
              overflowY={"auto"}
            >
              <Box>
                <Link href={"/dashboard"}>
                  <Flex
                    alignItems={"center"}
                    py={"0.75em"}
                    px={"1.25em"}
                    bgColor={
                      pathname === "/dashboard" ? "#FAFAFA" : "transparent"
                    }
                    color={pathname === "/dashboard" ? "#185C99" : "#1E1D22"}
                    _hover={{ bgColor: "#FAFAFA", color: "#185C99" }}
                    cursor={"pointer"}
                    borderRadius={"md"}
                    transition={"0.1s ease-in-out"}
                  >
                    <Icon
                      as={
                        pathname === "/dashboard"
                          ? MdSpaceDashboard
                          : MdOutlineSpaceDashboard
                      }
                      boxSize={iconBoxSize}
                    />
                    <Text ml={"0.7em"} fontSize={"md"} fontWeight={"medium"}>
                      Dashboard
                    </Text>
                  </Flex>
                </Link>
              </Box>
              {/* <Box mb={"2em"}>
                <Link href={"/dashboard/oprec"}>
                  <Flex alignItems={"center"} textColor={pathname === "/dashboard/oprec" ? "#EF7903" : "#1E1D22"} _hover={{ textColor: "#EF7903" }} cursor={"pointer"} transition={"0.1s ease-in-out"}>
                    <Icon as={IoRocketSharp} boxSize={6} />
                    <Text ml={"0.7em"} fontSize={"md"}>
                      OPREC
                    </Text>
                  </Flex>
                </Link>
              </Box> */}
              <Flex
                justifyContent={"start"}
                textColor={
                  pathname.includes("/dashboard/panitia")
                    ? "#185C99"
                    : "#1E1D22"
                }
                py={"0.75em"}
                px={"1.25em"}
                bgColor={
                  pathname.includes("/dashboard/panitia")
                    ? "#FAFAFA"
                    : "transparent"
                }
                borderRadius={"md"}
                _hover={{ bgColor: "#FAFAFA", color: "#185C99" }}
                transition={"0.1s ease-in-out"}
              >
                <Accordion
                  w={"full"}
                  allowToggle
                  defaultIndex={
                    pathname.includes("/dashboard/panitia") ? [0] : undefined
                  }
                >
                  <AccordionItem border={"none"}>
                    <AccordionButton
                      p={0}
                      _hover={{ color: "#185C99" }}
                      cursor={"pointer"}
                      transition={"0.1s ease-in-out"}
                    >
                      <Box flex="1" textAlign="left">
                        <Flex alignItems={"center"}>
                          <Icon
                            as={
                              pathname.includes("/dashboard/panitia")
                                ? MdShield
                                : MdOutlineShield
                            }
                            boxSize={iconBoxSize}
                          />
                          <Text
                            ml={"0.7em"}
                            fontSize={"md"}
                            fontWeight={"medium"}
                          >
                            Panitia
                          </Text>
                        </Flex>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel p={0}>
                      <Stack
                        ml={"0.35em"}
                        mt={"0.5em"}
                        direction={"column"}
                        spacing={"1em"}
                      >
                        <Box>
                          <Link href={"/dashboard/panitia/daftarpanitia"}>
                            <Flex
                              alignItems={"center"}
                              _hover={{ color: "#185C99" }}
                              color={
                                pathname === "/dashboard/panitia/daftarpanitia"
                                  ? "#185C99"
                                  : "#1E1D22"
                              }
                              cursor={"pointer"}
                              transition={"0.1s ease-in-out"}
                            >
                              <Icon
                                ml={"1.75em"}
                                as={
                                  pathname ===
                                  "/dashboard/panitia/daftarpanitia"
                                    ? MdPeople
                                    : MdPeopleOutline
                                }
                                boxSize={iconBoxSize}
                              />
                              <Text
                                ml={"0.5em"}
                                fontSize={"md"}
                                fontWeight={"medium"}
                              >
                                Daftar Panitia
                              </Text>
                            </Flex>
                          </Link>
                        </Box>
                        <Box>
                          <Link href={"/dashboard/panitia/panitiadivisi"}>
                            <Flex
                              alignItems={"center"}
                              color={
                                pathname === "/dashboard/panitia/panitiadivisi"
                                  ? "#185C99"
                                  : "#1E1D22"
                              }
                              _hover={{ color: "#185C99" }}
                              cursor={"pointer"}
                              transition={"0.1s ease-in-out"}
                            >
                              <Icon
                                ml={"1.75em"}
                                as={
                                  pathname ===
                                  "/dashboard/panitia/panitiadivisi"
                                    ? MdPeople
                                    : MdPeopleOutline
                                }
                                boxSize={iconBoxSize}
                              />
                              <Text
                                ml={"0.5em"}
                                fontSize={"md"}
                                fontWeight={"medium"}
                              >
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
                <Link href={"/dashboard/organisator"}>
                  <Flex
                    alignItems={"center"}
                    borderRadius={"md"}
                    py={"0.75em"}
                    px={"1.25em"}
                    bgColor={
                      pathname === "/dashboard/organisator"
                        ? "#FAFAFA"
                        : "transparent"
                    }
                    color={
                      pathname === "/dashboard/organisator"
                        ? "#185C99"
                        : "#1E1D22"
                    }
                    _hover={{ bgColor: "#FAFAFA", color: "#185C99" }}
                    cursor={"pointer"}
                    transition={"0.1s ease-in-out"}
                  >
                    <Icon
                      as={
                        pathname === "/dashboard/organisator"
                          ? HiOfficeBuilding
                          : HiOutlineOfficeBuilding
                      }
                      boxSize={iconBoxSize}
                    />
                    <Text ml={"0.7em"} fontSize={"md"} fontWeight={"medium"}>
                      Organisator
                    </Text>
                  </Flex>
                </Link>
              </Box>
              <Box>
                <Link href={"/dashboard/mahasiswa"}>
                  <Flex
                    alignItems={"center"}
                    borderRadius={"md"}
                    py={"0.75em"}
                    px={"1.25em"}
                    bgColor={
                      pathname === "/dashboard/mahasiswa"
                        ? "#FAFAFA"
                        : "transparent"
                    }
                    color={
                      pathname === "/dashboard/mahasiswa"
                        ? "#185C99"
                        : "#1E1D22"
                    }
                    _hover={{ bgColor: "#FAFAFA", color: "#185C99" }}
                    cursor={"pointer"}
                    transition={"0.1s ease-in-out"}
                  >
                    <Icon
                      as={
                        pathname === "/dashboard/mahasiswa"
                          ? MdSchool
                          : MdOutlineSchool
                      }
                      boxSize={iconBoxSize}
                    />
                    <Text ml={"0.7em"} fontSize={"md"} fontWeight={"medium"}>
                      Mahasiswa
                    </Text>
                  </Flex>
                </Link>
              </Box>
              <Flex
                justifyContent={"start"}
                textColor={
                  pathname.includes("/dashboard/state") ? "#185C99" : "#1E1D22"
                }
                py={"0.75em"}
                px={"1.25em"}
                _hover={{ bgColor: "#FAFAFA", color: "#185C99" }}
                cursor={"pointer"}
                transition={"0.1s ease-in-out"}
              >
                <Accordion
                  w={"full"}
                  allowToggle
                  defaultIndex={
                    pathname.includes("/dashboard/state") ? [0] : undefined
                  }
                  borderRadius={"md"}
                >
                  <AccordionItem border={"none"}>
                    <AccordionButton
                      p={0}
                      _hover={{ color: "#185C99" }}
                      cursor={"pointer"}
                      transition={"0.1s ease-in-out"}
                    >
                      <Box flex="1" textAlign="left">
                        <Flex alignItems={"center"}>
                          <Icon
                            as={
                              pathname.includes("/dashboard/state")
                                ? MdAirplanemodeActive
                                : MdOutlineAirplanemodeActive
                            }
                            boxSize={iconBoxSize}
                          />
                          <Text
                            ml={"0.7em"}
                            fontSize={"md"}
                            fontWeight={"medium"}
                          >
                            STATE
                          </Text>
                        </Flex>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel p={0}>
                      <Stack
                        ml={"0.35em"}
                        mt={"0.5em"}
                        direction={"column"}
                        spacing={"0.5em"}
                      >
                        <Box>
                          <Link href={"/dashboard/state/daftarstate"}>
                            <Flex
                              alignItems={"center"}
                              _hover={{ color: "#185C99" }}
                              color={
                                pathname === "/dashboard/state/daftarstate"
                                  ? "#185C99"
                                  : "#1E1D22"
                              }
                              cursor={"pointer"}
                              transition={"0.1s ease-in-out"}
                            >
                              <Icon
                                ml={"1.75em"}
                                as={
                                  pathname === "/dashboard/state/daftarstate"
                                    ? MdViewList
                                    : MdOutlineViewList
                                }
                                boxSize={iconBoxSize}
                              />
                              <Text
                                ml={"0.5em"}
                                fontSize={"md"}
                                fontWeight={"medium"}
                              >
                                Daftar State
                              </Text>
                            </Flex>
                          </Link>
                        </Box>
                        <Box>
                          <Link href={"/dashboard/state/sunting"}>
                            <Flex
                              alignItems={"center"}
                              color={
                                pathname === "/dashboard/state/sunting"
                                  ? "#185C99"
                                  : "#1E1D22"
                              }
                              _hover={{ color: "#185C99" }}
                              cursor={"pointer"}
                              transition={"0.1s ease-in-out"}
                            >
                              <Icon
                                ml={"1.75em"}
                                as={
                                  pathname === "/dashboard/state/sunting"
                                    ? MdEdit
                                    : MdOutlineEdit
                                }
                                boxSize={iconBoxSize}
                              />
                              <Text
                                ml={"0.5em"}
                                fontSize={"md"}
                                fontWeight={"medium"}
                              >
                                Sunting
                              </Text>
                            </Flex>
                          </Link>
                        </Box>
                        <Box>
                          <Link href={"/dashboard/state/details"}>
                            <Flex
                              alignItems={"center"}
                              color={
                                pathname === "/dashboard/state/details"
                                  ? "#185C99"
                                  : "#1E1D22"
                              }
                              _hover={{ color: "#185C99" }}
                              cursor={"pointer"}
                              transition={"0.1s ease-in-out"}
                            >
                              <Icon
                                ml={"1.75em"}
                                as={
                                  pathname === "/dashboard/state/details"
                                    ? MdPeople
                                    : MdPeopleOutline
                                }
                                boxSize={iconBoxSize}
                              />
                              <Text
                                ml={"0.5em"}
                                fontSize={"md"}
                                fontWeight={"medium"}
                              >
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
                <Link href={"/dashboard/malpun/peserta"}>
                  <Flex
                    alignItems={"center"}
                    py={"0.75em"}
                    px={"1.25em"}
                    bgColor={
                      pathname === "/dashboard/malpun/peserta"
                        ? "#FAFAFA"
                        : "transparent"
                    }
                    color={
                      pathname === "/dashboard/malpun/peserta"
                        ? "#185C99"
                        : "#1E1D22"
                    }
                    _hover={{ bgColor: "#FAFAFA", color: "#185C99" }}
                    cursor={"pointer"}
                    borderRadius={"md"}
                    transition={"0.1s ease-in-out"}
                  >
                    <Icon
                      as={
                        pathname === "/dashboard/malpun/peserta"
                          ? HiSparkles
                          : HiOutlineSparkles
                      }
                      boxSize={iconBoxSize}
                    />
                    <Text ml={"0.7em"} fontSize={"md"} fontWeight={"medium"}>
                      MALPUN
                    </Text>
                  </Flex>
                </Link>
              </Box>
              <Flex
                justifyContent={"start"}
                textColor={
                  pathname.includes("/dashboard/qrscan")
                    ? "#185C99"
                    : pathname === "/"
                    ? "#185C99"
                    : "#1E1D22"
                }
                py={"0.75em"}
                px={"1.25em"}
                _hover={{ bgColor: "#FAFAFA", color: "#185C99" }}
                cursor={"pointer"}
                transition={"0.1s ease-in-out"}
              >
                <Accordion
                  w={"full"}
                  allowToggle
                  defaultIndex={
                    pathname.includes("/dashboard/qrscan") ? [0] : undefined
                  }
                >
                  <AccordionItem border={"none"}>
                    <AccordionButton
                      p={0}
                      _hover={{ color: "#185C99" }}
                      cursor={"pointer"}
                      transition={"0.1s ease-in-out"}
                    >
                      <Box flex="1" textAlign="left">
                        <Flex alignItems={"center"}>
                          <Icon as={MdQrCodeScanner} boxSize={iconBoxSize} />
                          <Text
                            ml={"0.7em"}
                            fontSize={"md"}
                            fontWeight={"medium"}
                          >
                            QR Scan
                          </Text>
                        </Flex>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel p={0}>
                      <Stack
                        ml={"0.35em"}
                        mt={"0.5em"}
                        direction={"column"}
                        spacing={"0.5em"}
                      >
                        <Box>
                          <Link href={"/dashboard/qrscan/state"}>
                            <Flex
                              alignItems={"center"}
                              _hover={{ color: "#185C99" }}
                              color={
                                pathname === "/dashboard/qrscan/state"
                                  ? "#185C99"
                                  : "#1E1D22"
                              }
                              cursor={"pointer"}
                              transition={"0.1s ease-in-out"}
                            >
                              <Icon
                                ml={"1.75em"}
                                as={
                                  pathname === "/dashboard/qrscan/state"
                                    ? MdQrCodeScanner
                                    : MdQrCodeScanner
                                }
                                boxSize={iconBoxSize}
                              />
                              <Text
                                ml={"0.5em"}
                                fontSize={"md"}
                                fontWeight={"medium"}
                              >
                                STATE
                              </Text>
                            </Flex>
                          </Link>
                        </Box>
                        <Box>
                          <Link href={"/dashboard/qrscan/malpun"}>
                            <Flex
                              alignItems={"center"}
                              color={
                                pathname === "/dashboard/qrscan/malpun"
                                  ? "#185C99"
                                  : "#1E1D22"
                              }
                              _hover={{ color: "#185C99" }}
                              cursor={"pointer"}
                              transition={"0.1s ease-in-out"}
                            >
                              <Icon
                                ml={"1.75em"}
                                as={
                                  pathname === "/dashboard/qrscan/malpun"
                                    ? MdQrCodeScanner
                                    : MdQrCodeScanner
                                }
                                boxSize={iconBoxSize}
                              />
                              <Text
                                ml={"0.5em"}
                                fontSize={"md"}
                                fontWeight={"medium"}
                              >
                                MALPUN
                              </Text>
                            </Flex>
                          </Link>
                        </Box>
                      </Stack>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Flex>
            </Stack>
            <Box w={"full"} h={"7.5em"} position={"absolute"} bottom={0}>
              <Divider
                w={"full"}
                my={"1em"}
                borderWidth={2}
                borderColor={"#EFEFEF"}
              />
              <Box w={"full"} h={"100%"} px={"2em"}>
                <Menu>
                  <MenuButton
                    w={"full"}
                    py={"0.75em"}
                    px={"1.25em"}
                    _hover={{ bgColor: "#FAFAFA" }}
                    _expanded={{ bg: "gray.200" }}
                    _focus={{ boxShadow: "outline" }}
                    cursor={"pointer"}
                    borderRadius={"md"}
                    transition={"0.1s ease-in-out"}
                  >
                    <Flex alignItems={"center"}>
                      <Avatar
                        boxSize={[
                          "2.25em",
                          "2.25em",
                          "1em",
                          "1.25em",
                          "2.25em",
                        ]}
                        src="https://bit.ly/broken-link"
                      />
                      <Box ml={["0.2em", "0.2em", "0.2em", "0.7em"]}>
                        <Text
                          fontSize={["xs", "sm"]}
                          fontWeight={"medium"}
                          align={"left"}
                        >
                          {auth.user?.name}
                        </Text>
                        <Text
                          mt={"-0.25em"}
                          fontSize={"xs"}
                          fontWeight={"medium"}
                          align={"left"}
                          color={"#6B6773"}
                        >
                          {auth.user?.divisi
                            ? auth.user?.divisi
                            : auth.user?.Statenameisi}
                        </Text>
                      </Box>
                    </Flex>
                  </MenuButton>
                  <MenuList>
                    <MenuGroup title="Profile">
                      {/* <MenuItem>My Account</MenuItem> */}
                      <MenuItem onClick={onOpen}>Logout </MenuItem>
                    </MenuGroup>
                    <MenuDivider />
                  </MenuList>
                </Menu>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Apakah kamu yakin ingin keluar?</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Kembali
            </Button>
            <Button
              bgColor={"#185C99"}
              color={"white"}
              _hover={{ bgColor: "#4A647B" }}
              onClick={auth.logout}
            >
              Ya
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
