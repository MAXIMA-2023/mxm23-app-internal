"use client";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Flex,
  Text,
  Divider,
  HStack,
  Switch,
  Link,
  Select,
  Image,
  Button,
  Icon,
  Spacer,
} from "@chakra-ui/react";
import { createTheme } from "@mui/material/styles";
import Layout from "@/components/Layout";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import {
  MdSearch,
  MdViewColumn,
  MdPrint,
  MdCloudDownload,
  MdFilterList,
} from "react-icons/md";
import { MdDeleteForever, MdInfo, MdOutlineEdit } from "react-icons/md";

export default function Dashboard() {
  // data dummy
  const dataSTATE = [
    {
      namaSTATE: "MAPALA",
      kuotaCurr: "40",
      kuotaMax: "100",
    },
    {
      namaSTATE: "Mufomic",
      kuotaCurr: "50",
      kuotaMax: "100",
    },
    {
      namaSTATE: "Jcafe",
      kuotaCurr: "80",
      kuotaMax: "100",
    },
    {
      namaSTATE: "Ultima Sonora",
      kuotaCurr: "74",
      kuotaMax: "100",
    },
    {
      namaSTATE: "Fortius E-Sport",
      kuotaCurr: "68",
      kuotaMax: "100",
    },
    {
      namaSTATE: "HMIF",
      kuotaCurr: "37",
      kuotaMax: "50",
    },
    {
      namaSTATE: "Teater Katak",
      kuotaCurr: "113",
      kuotaMax: "200",
    },
    {
      namaSTATE: "MAPALA2",
      kuotaCurr: "40",
      kuotaMax: "100",
    },
    {
      namaSTATE: "MAPALA3",
      kuotaCurr: "40",
      kuotaMax: "100",
    },
    {
      namaSTATE: "MAPALA4",
      kuotaCurr: "40",
      kuotaMax: "100",
    },
    {
      namaSTATE: "MAPALA5",
      kuotaCurr: "40",
      kuotaMax: "100",
    },
  ];

  const columnState: MUIDataTableColumn[] = [
    {
      label: "Nama STATE",
      name: "namaSTATE",
      options: {
        filter: true,
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <Flex w={"12em"} alignItems={"center"}>
              <Text>{value}</Text>
            </Flex>
          );
        },
      },
    },
    {
      label: "Kuota",
      name: "kuotaCurr",
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          const rowData = dataSTATE[tableMeta.rowIndex];
          const kuotaMax = rowData.kuotaMax;
          return (
            <HStack>
              <Text>{`${value}/${kuotaMax}`}</Text>
            </HStack>
          );
        },
      },
    },
    {
      label: "Aksi",
      name: "aksi",
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <>
              {" "}
              <Flex justifyContent="center" gap={3}>
                {" "}
                <Button rounded="25px" colorScheme="teal" variant="solid">
                  <MdInfo />
                  <Spacer mx={1} />
                  Detail{" "}
                </Button>{" "}
                <Button rounded="25px" colorScheme="teal" variant="solid">
                  <MdOutlineEdit />
                  <Spacer mx={1} />
                  Sunting{" "}
                </Button>{" "}
                <Button rounded="25px" colorScheme="red" variant="solid">
                  <MdDeleteForever />{" "}
                </Button>{" "}
              </Flex>
            </>
          );
        },
      },
    },
  ];

  const options = {};

  return (
    <>
      <title>MAXIMA 2023 Internal - STATE</title>
      <Layout title="Daftar STATE" showDashboardButton disablePadding>
        <Box w={"full"} overflowY={"auto"} boxShadow={"xs"}>
          <Box w={"full"} mx={4} my={4}>
            <ThemeProvider theme={createTheme()}>
              <MUIDataTable
                title={""}
                data={dataSTATE}
                columns={columnState}
                options={{
                  rowsPerPage: 10,
                  selectableRows: "none",
                  elevation: 1,
                }}
              />
            </ThemeProvider>
          </Box>
        </Box>
      </Layout>
    </>
  );
}

// "use client";
// import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
// import React, { useState, useEffect } from "react";
// import { ThemeProvider } from "@mui/material/styles";
// import {
//   Box,
//   Flex,
//   Text,
//   Divider,
//   HStack,
//   Switch,
//   Link,
//   Select,
//   Image,
//   Button,
//   ButtonGroup,
//   Icon,
//   Spacer,
// } from "@chakra-ui/react";
// import { createTheme } from "@mui/material/styles";
// import Layout from "@/components/Layout";
// import { SubmitHandler, useForm } from "react-hook-form";
// import axios from "axios";
// import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
// import {
//   MdSearch,
//   MdViewColumn,
//   MdPrint,
//   MdCloudDownload,
//   MdFilterList,
// } from "react-icons/md";
// import {
//   Table,
//   Thead,
//   Tbody,
//   Tfoot,
//   Tr,
//   Th,
//   Td,
//   TableCaption,
//   TableContainer,
// } from "@chakra-ui/react";
// import { MdDeleteForever, MdInfo, MdOutlineEdit } from "react-icons/md";
// import { extendTheme } from "@chakra-ui/react";

// export default function Dashboard() {
//   // data dummy
//   const dataSTATE = [
//     {
//       namaState: "MAPALA",
//       kuotaCurr: 40,
//       kuotaMax: 100,
//     },
//     {
//       namaState: "Mufomic",
//       kuotaCurr: 50,
//       kuotaMax: 100,
//     },
//     {
//       namaState: "JCafe",
//       kuotaCurr: 80,
//       kuotaMax: 100,
//     },
//     {
//       namaState: "Ultima Sonora",
//       kuotaCurr: 74,
//       kuotaMax: 100,
//     },
//     {
//       namaState: "Fortius E-Sport",
//       kuotaCurr: 68,
//       kuotaMax: 100,
//     },
//     {
//       namaState: "HMIF",
//       kuotaCurr: 37,
//       kuotaMax: 50,
//     },
//     {
//       namaState: "Teater Katak",
//       kuotaCurr: 113,
//       kuotaMax: 200,
//     },
//   ];

//   return (
//     <>
//       <title>MAXIMA 2023 Internal - STATE</title>
//       <Layout title="Daftar STATE" showDashboardButton disablePadding>
//         <TableContainer w={"full"}>
//           <Box w="full" textAlign="end" px={10} pt={5} pb={10}>
//             <Flex justifyContent="end" gap={5} color="#757575">
//               <MdSearch size={30} />
//               <MdCloudDownload size={30} />
//               <MdPrint size={30} />
//               <MdViewColumn size={30} />
//               <MdFilterList size={30} />
//             </Flex>
//           </Box>
//           <Table w={"full"} variant="simple">
//             <Thead w={"full"}>
//               <Tr>
//                 <Th w={"1xl"}>Nama STATE</Th>
//                 <Th>Kuota</Th>
//                 <Th textAlign="center">Aksi</Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               {dataSTATE.map((state) => (
//                 <Tr key={state.namaState}>
//                   <Td>{state.namaState}</Td>
//                   <Td>
//                     {state.kuotaCurr} / {state.kuotaMax}
//                   </Td>
//                   <Td>
//                     <Flex justifyContent="center" gap={3}>
//                       <Button rounded="25px" colorScheme="teal" variant="solid">
//                         <MdInfo />
//                         <Spacer mx={1} />
//                         Detail
//                       </Button>
//                       <Button rounded="25px" colorScheme="teal" variant="solid">
//                         <MdOutlineEdit />
//                         <Spacer mx={1} />
//                         Sunting
//                       </Button>
//                       <Button rounded="25px" colorScheme="red" variant="solid">
//                         <MdDeleteForever />
//                       </Button>
//                     </Flex>
//                   </Td>
//                 </Tr>
//               ))}
//             </Tbody>
//           </Table>
//         </TableContainer>
//       </Layout>
//     </>
//   );
// }
