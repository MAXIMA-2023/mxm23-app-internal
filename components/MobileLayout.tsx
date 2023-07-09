import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Box,
  Flex,
  Stack,
  Image,
  Text,
  Icon,
  Spacer,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  Center,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";

// icons
import {
  MdAccountCircle,
  MdLogout,
  MdAdminPanelSettings,
  MdSpaceDashboard,
  MdGroups,
  MdWorkspacesFilled,
  MdQrCodeScanner,
  MdAirplanemodeActive,
  MdSchool,
  MdShield,
  MdToggleOff,
  MdPeople,
  MdViewList,
  MdEdit,
} from "react-icons/md";
import { HiSparkles, HiOfficeBuilding } from "react-icons/hi";
import { BsCheckCircleFill } from "react-icons/bs";

// import all above icons outline variant
import {
  MdOutlineAccountCircle,
  MdOutlineLogout,
  MdOutlineAdminPanelSettings,
  MdOutlineSpaceDashboard,
  MdOutlineGroups,
  MdOutlineWorkspaces,
  MdOutlineQrCodeScanner,
  MdOutlineAirplanemodeActive,
  MdOutlineSchool,
  MdOutlineShield,
  MdOutlineToggleOff,
  MdOutlinePeople,
  MdOutlineViewList,
  MdOutlineEdit,
} from "react-icons/md";

import { HiOutlineSparkles, HiOutlineOfficeBuilding } from "react-icons/hi";
import { BsCheckCircle } from "react-icons/bs";

// types
import { ReactNode } from "react";
import { As, PlacementWithLogical } from "@chakra-ui/react";

// const
const activeColor = "#185C99";
// const inactiveColor = "#9CA3AF";
const inactiveColor = undefined;

export const AppBar = () => {
  return (
    <>
      <Box
        display={["block", "block", "block", "none"]}
        position={"fixed"}
        // position={"sticky"}
        top={0}
        zIndex={5}
      >
        <Flex
          // py={"1.5em"}
          alignItems="center"
          justifyContent={"space-between"}
          h={"4em"}
          w={"100vw"}
          p={"1em"}
          bgColor={"white"} // white
          // overflowY={"auto"}
          boxShadow={"md"}
          color={"gray.700"}
        >
          <Stack direction={"row"} alignItems={"center"}>
            <Image
              src={"/assets/LogoMaxima.png"}
              alt={"logo"}
              boxSize={"2.5em"}
            />
            <Text
              align={"left"}
              color={"#1E1D22"}
              fontSize={"2xl"}
              fontWeight={"semibold"}
              px={"0.5em"}
            >
              MAXIMA 2023
            </Text>
          </Stack>
          <Menu autoSelect={false}>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <Avatar
                size={"sm"}
                icon={<Icon as={MdAccountCircle} boxSize={"2.5em"} />}
              />
            </MenuButton>
            <MenuList>
              <Text px={"1em"} fontWeight={"medium"}>
                Windah Barusadar
              </Text>
              <MenuDivider />
              <MenuItem color={"red.500"}>
                <Icon as={MdLogout} />
                <Text px={"1em"}>Log Out</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Box>
    </>
  );
};

const BottomBarButton = ({
  activeIcon,
  inactiveIcon,
  text,
  isActive,
}: {
  activeIcon: As;
  inactiveIcon: As;
  text: string;
  isActive: boolean;
}) => {
  return (
    <Stack
      direction={"column"}
      alignItems={"center"}
      px={"1em"}
      maxW={"2.5em"}
      color={isActive ? activeColor : inactiveColor}
    >
      <Icon
        as={isActive ? activeIcon : inactiveIcon}
        boxSize={["2em", "2.5em"]}
        mb={"-0.5em"}
      />
      <Text fontSize={"sm"} fontWeight={"medium"}>
        {text}
      </Text>
    </Stack>
  );
};

const BottomBarMenu = ({
  title,
  activeIcon,
  inactiveIcon,
  isActive,
  placement,
  children,
}: {
  title: string;
  activeIcon: As;
  inactiveIcon: As;
  isActive: boolean;
  placement: PlacementWithLogical;
  children: ReactNode;
}) => {
  return (
    <Menu autoSelect={false} offset={[0, 16]} placement={placement}>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"ghost"}
        cursor={"pointer"}
        h={"4em"}
      >
        <BottomBarButton
          text={title}
          activeIcon={activeIcon}
          inactiveIcon={inactiveIcon}
          isActive={isActive}
        />
      </MenuButton>
      <MenuList minWidth="fit-content" rounded={"2xl"} py={"1em"}>
        {children}
      </MenuList>
    </Menu>
  );
};

const BottomBarMenuItem = ({
  activeIcon,
  inactiveIcon,
  isActive,
  href,
  children,
}: {
  activeIcon: As;
  inactiveIcon: As;
  isActive: boolean;
  href: string;
  children: ReactNode;
}) => {
  return (
    <MenuItem
      as={Link}
      href={href}
      py={"0.5em"}
      px={"0.5em"}
      color={isActive ? activeColor : inactiveColor}
    >
      <Icon as={isActive ? activeIcon : inactiveIcon} boxSize={"1.5em"} />
      <Text px={"1em"}>{children}</Text>
    </MenuItem>
  );
};

export const BottomBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      <Box
        display={["block", "block", "block", "none"]}
        position={"fixed"}
        // position={"sticky"}
        bottom={0}
        zIndex={5}
      >
        <Flex
          // py={"1.5em"}
          alignItems="center"
          justifyContent={"space-evenly"}
          h={"4em"}
          w={"100vw"}
          p={"1em"}
          bgColor={"white"} // white
          // overflowY={"auto"}
          // boxShadow={"md"}
          boxShadow="0px -4px 6px -1px rgba(0, 0, 0, 0.25)"
          color={"gray.700"}
        >
          <BottomBarMenu
            title={"Admin"}
            activeIcon={MdAdminPanelSettings}
            inactiveIcon={MdOutlineAdminPanelSettings}
            isActive={
              pathname === "/dashboard/verifikasi" ||
              pathname === "/dashboard/toggles"
            }
            placement="top-start"
          >
            <BottomBarMenuItem
              href={"/dashboard/verifikasi"}
              activeIcon={BsCheckCircleFill}
              inactiveIcon={BsCheckCircle}
              isActive={pathname === "/dashboard/verifikasi"}
            >
              Verifikasi
            </BottomBarMenuItem>
            <BottomBarMenuItem
              href={"/dashboard/toggles"}
              activeIcon={MdToggleOff}
              inactiveIcon={MdOutlineToggleOff}
              isActive={pathname === "/dashboard/toggles"}
            >
              Toggles
            </BottomBarMenuItem>
          </BottomBarMenu>
          <Button
            as={Link}
            href={"/dashboard"}
            rounded={"full"}
            variant={"ghost"}
            cursor={"pointer"}
            h={"4em"}
          >
            <BottomBarButton
              text={"Dashboard"}
              activeIcon={MdSpaceDashboard}
              inactiveIcon={MdOutlineSpaceDashboard}
              isActive={pathname === "/dashboard"}
            />
          </Button>

          <Menu autoSelect={false} offset={[0, 32]} placement="top">
            {({ isOpen }) => (
              <>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  h={"4em"}
                >
                  <Box
                    w={"4em"}
                    h={"4em"}
                    px={["0.5em", "1em"]}
                    mb={"2.5em"}
                    rounded={"full"}
                    bgColor={isOpen ? activeColor : "white"}
                    outline={"0.25em solid #185C99"}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Icon
                      as={MdQrCodeScanner}
                      color={isOpen ? "white" : activeColor}
                      boxSize={"2.5em"}
                    />
                  </Box>
                </MenuButton>
                <MenuList minWidth="fit-content" rounded={"2xl"} py={"1em"}>
                  <MenuItem
                    as={Link}
                    href={"/dashboard/qrscan/state"}
                    py={"0.5em"}
                    px={"0.5em"}
                    color={
                      pathname === "/dashboard/qrscan/state"
                        ? activeColor
                        : inactiveColor
                    }
                  >
                    <Icon
                      as={
                        pathname === "/dashboard/qrscan/state"
                          ? MdQrCodeScanner
                          : MdOutlineQrCodeScanner
                      }
                      boxSize={"1.5em"}
                    />
                    <Text px={"1em"}>STATE</Text>
                  </MenuItem>
                  <MenuItem
                    as={Link}
                    href={"/dashboard/qrscan/malpun"}
                    py={"0.5em"}
                    px={"0.5em"}
                    color={
                      pathname === "/dashboard/qrscan/malpun"
                        ? activeColor
                        : inactiveColor
                    }
                  >
                    <Icon
                      as={
                        pathname === "/dashboard/qrscan/malpun"
                          ? MdQrCodeScanner
                          : MdOutlineQrCodeScanner
                      }
                      boxSize={"1.5em"}
                    />
                    <Text px={"1em"}>MALPUN</Text>
                  </MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
          <BottomBarMenu
            title={"Props"}
            activeIcon={MdGroups}
            inactiveIcon={MdOutlineGroups}
            isActive={
              pathname.includes("/dashboard/panitia") ||
              pathname.includes("/dashboard/organisator") ||
              pathname.includes("/dashboard/mahasiswa")
            }
            placement="top-start"
          >
            <Accordion allowToggle>
              <AccordionItem
                border={"none"}
                cursor={"pointer"}
                transition={"0.1s ease-in-out"}
              >
                <AccordionButton
                  px={"0.5em"}
                  color={
                    pathname.includes("/panitia") ? activeColor : inactiveColor
                  }
                >
                  <Stack direction={"row"}>
                    <Icon
                      as={
                        pathname.includes("/panitia")
                          ? MdShield
                          : MdOutlineShield
                      }
                      boxSize={"1.5em"}
                    />
                    <Text px={"0.5em"}>Panitia</Text>
                  </Stack>
                  <Spacer />
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel ml={"1.5em"} p={0}>
                  <Stack
                    as={Link}
                    href={"/dashboard/panitia/daftarpanitia"}
                    direction={"row"}
                    align={"center"}
                    my={"0.5em"}
                    color={
                      pathname === "/dashboard/panitia/daftarpanitia"
                        ? activeColor
                        : inactiveColor
                    }
                  >
                    <Icon
                      as={
                        pathname === "/dashboard/panitia/daftarpanitia"
                          ? MdPeople
                          : MdOutlinePeople
                      }
                    />
                    <Text fontSize={"sm"}>Daftar Panitia</Text>
                  </Stack>
                  <Stack
                    as={Link}
                    href={"/dashboard/panitia/panitiadivisi"}
                    direction={"row"}
                    align={"center"}
                    my={"0.5em"}
                    color={
                      pathname === "/dashboard/panitia/panitiadivisi"
                        ? activeColor
                        : inactiveColor
                    }
                  >
                    <Icon
                      as={
                        pathname === "/dashboard/panitia/panitiadivisi"
                          ? MdPeople
                          : MdOutlinePeople
                      }
                    />
                    <Text fontSize={"sm"}>Panitia Divisi</Text>
                  </Stack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <BottomBarMenuItem
              href="/dashboard/organisator"
              activeIcon={HiOfficeBuilding}
              inactiveIcon={HiOutlineOfficeBuilding}
              isActive={pathname === "/dashboard/organisator"}
            >
              Organisator
            </BottomBarMenuItem>
            <BottomBarMenuItem
              href="/dashboard/mahasiswa"
              activeIcon={MdSchool}
              inactiveIcon={MdOutlineSchool}
              isActive={pathname === "/dashboard/mahasiswa"}
            >
              Mahasiswa
            </BottomBarMenuItem>
          </BottomBarMenu>
          <BottomBarMenu
            title={"Events"}
            activeIcon={MdWorkspacesFilled}
            inactiveIcon={MdOutlineWorkspaces}
            isActive={
              pathname.includes("/dashboard/state") ||
              pathname.includes("/malpun/")
            }
            placement="top-end"
          >
            <Accordion allowToggle>
              <AccordionItem
                border={"none"}
                cursor={"pointer"}
                transition={"0.1s ease-in-out"}
              >
                <AccordionButton
                  px={"0.5em"}
                  color={
                    pathname.includes("/dashboard/state")
                      ? activeColor
                      : inactiveColor
                  }
                >
                  <Stack direction={"row"}>
                    <Icon
                      as={
                        pathname.includes("/dashboard/state")
                          ? MdAirplanemodeActive
                          : MdOutlineAirplanemodeActive
                      }
                      boxSize={"1.5em"}
                    />
                    <Text px={"0.5em"}>STATE</Text>
                  </Stack>
                  <Spacer />
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel ml={"1.5em"} p={0}>
                  <Stack
                    as={Link}
                    href={"/dashboard/state/daftarstate"}
                    direction={"row"}
                    align={"center"}
                    my={"0.5em"}
                    color={
                      pathname === "/dashboard/state/daftarstate"
                        ? activeColor
                        : inactiveColor
                    }
                  >
                    <Icon
                      as={
                        pathname === "/dashboard/state/daftarstate"
                          ? MdViewList
                          : MdOutlineViewList
                      }
                    />
                    <Text fontSize={"sm"}>Daftar</Text>
                  </Stack>
                  <Stack
                    as={Link}
                    href={"/dashboard/state/sunting"}
                    direction={"row"}
                    align={"center"}
                    my={"0.5em"}
                    color={
                      pathname === "/dashboard/state/sunting"
                        ? activeColor
                        : inactiveColor
                    }
                  >
                    <Icon
                      as={
                        pathname === "/dashboard/state/sunting"
                          ? MdEdit
                          : MdOutlineEdit
                      }
                    />
                    <Text fontSize={"sm"}>Sunting</Text>
                  </Stack>
                  <Stack
                    as={Link}
                    href={"/dashboard/state/details"}
                    direction={"row"}
                    align={"center"}
                    my={"0.5em"}
                    color={
                      pathname === "/dashboard/state/details"
                        ? activeColor
                        : inactiveColor
                    }
                  >
                    <Icon
                      as={
                        pathname === "/dashboard/state/details"
                          ? MdPeople
                          : MdOutlinePeople
                      }
                    />
                    <Text fontSize={"sm"}>Details</Text>
                  </Stack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <BottomBarMenuItem
              href={"/dashboard/malpun/peserta"}
              activeIcon={HiSparkles}
              inactiveIcon={HiOutlineSparkles}
              isActive={pathname === "/dashboard/malpun/peserta"}
            >
              MALPUN
            </BottomBarMenuItem>
          </BottomBarMenu>
        </Flex>
      </Box>
    </>
  );
};
