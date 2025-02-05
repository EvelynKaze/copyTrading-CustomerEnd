"use client";

import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { Card } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Mock data for the chart
const chartData = {
  spending: [
    { month: "Jan", amount: 4000 },
    { month: "Feb", amount: 3000 },
    { month: "Mar", amount: 2000 },
    { month: "Apr", amount: 2780 },
    { month: "May", amount: 1890 },
    { month: "Jun", amount: 2390 },
    { month: "Jul", amount: 3490 },
    { month: "Aug", amount: 3000 },
    { month: "Sept", amount: 2000 },
    { month: "Oct", amount: 2780 },
    { month: "Nov", amount: 1890 },
    { month: "Dec", amount: 2390 },
  ],
  earnings: [
    { month: "Jan", amount: 5000 },
    { month: "Feb", amount: 4500 },
    { month: "Mar", amount: 3500 },
    { month: "Apr", amount: 4200 },
    { month: "May", amount: 3800 },
    { month: "Jun", amount: 4100 },
    { month: "Jul", amount: 5200 },
    { month: "Aug", amount: 3000 },
    { month: "Sept", amount: 2000 },
    { month: "Oct", amount: 2780 },
    { month: "Nov", amount: 1890 },
    { month: "Dec", amount: 2390 },
  ],
};

export function StatisticsChart() {
  type ChartType = "spending" | "earnings";
  const [ chartType ] = useState<ChartType>("spending");

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-start md:items-center justify-between">
        <h2 className="text-lg font-semibold">Statistics</h2>
        <div className="flex flex-col items-end md:flex-row md:items-center gap-2">
          {/* <Select
            defaultValue="spending"
            onValueChange={(value) => setChartType(value as ChartType)}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="spending">Spending</SelectItem>
              <SelectItem value="earnings">Earnings</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="2022">
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select> */} 
        </div>
      </div>
      <div className="h-[300px] overflow-x-scroll">
        <ChartContainer
          className="h-full md:w-full"
          config={{
            amount: {
              label: chartType === "spending" ? "Spending" : "Earnings",
              color: "hsla(40, 80%, 76%, 1)",
            },
          }}
        >
          <ResponsiveContainer className={"h-full"}>
            <BarChart data={chartData[chartType]}>
              <XAxis
                dataKey="month"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Bar
                dataKey="amount"
                fill="var(--color-amount)"
                radius={[4, 4, 0, 0]}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </Card>
  );
}
