import dynamic from "next/dynamic";

import React, { Component, useState } from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { Text, Box, Flex, Icon } from "@chakra-ui/react";

const Charts = ({ jmlPendaftar, dates }: { jmlPendaftar: number[]; dates: string[] }) => {
  return (
    <>
      <Box w={"full"}>
        <Chart
          options={{
            chart: {
              height: 350,
              type: "line",
            },
            stroke: {
              width: 5,
              curve: "smooth",
            },
            xaxis: {
              type: "datetime",
              categories: dates,
              tickAmount: 10,
              labels: {
                formatter: (value: any, timestamp: any, opts: any) => {
                  return opts.dateFormatter(new Date(timestamp), "dd MMM");
                },
              },
            },
            title: {
              align: "left",
              style: {
                fontSize: "16px",
                color: "#666",
              },
            },
            fill: {
              type: "gradient",
              gradient: {
                shade: "dark",
                gradientToColors: ["#DE1505"],
                shadeIntensity: 1,
                type: "horizontal",
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100, 100, 100],
              },
            },
            yaxis: {
              min: -10,
              max: 40,
            },
          }}
          series={[
            {
              data: jmlPendaftar,
            },
          ]}
          type="line"
          height={350}
        />
      </Box>
    </>
  );
};

export default Charts;
