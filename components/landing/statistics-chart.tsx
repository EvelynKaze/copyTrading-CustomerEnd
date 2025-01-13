"use client";

import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const data = [
  { month: "Jan", amount: 4000 },
  { month: "Feb", amount: 3000 },
  { month: "Mar", amount: 2000 },
  { month: "Apr", amount: 2800 },
  { month: "May", amount: 1800 },
  { month: "Jun", amount: 2400 },
  { month: "Jul", amount: 3400 },
  { month: "Aug", amount: 3000 },
  { month: "Sep", amount: 2000 },
  { month: "Oct", amount: 2600 },
  { month: "Nov", amount: 1800 },
  { month: "Dec", amount: 2200 },
];

export function StatisticsChart() {
  const maxAmount = Math.max(...data.map((d) => d.amount));

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-8">
        <CardTitle className="text-2xl font-bold">Statistics</CardTitle>
        <div className="flex gap-2">
          <Select defaultValue="spending">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="spending">Spending</SelectItem>
              <SelectItem value="earnings">Earnings</SelectItem>
              <SelectItem value="profit">Profit</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="2022">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="h-[200px] w-full">
          <div className="flex h-full items-end gap-2">
            {data.map((item, index) => (
              <motion.div
                key={item.month}
                className="group relative flex h-full flex-1 items-end"
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className="relative w-full bg-primary/15 hover:bg-primary/25 transition-colors"
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.amount / maxAmount) * 100}%` }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    ${item.amount}
                  </div>
                </motion.div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-sm text-muted-foreground">
                  {item.month}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Intelligent Automation</h2>
          <p className="text-muted-foreground mb-4">
            Let the system work while you focus on what matters: Reliable
            results optimized for maximum gains and hands-free management that
            handles the complexity for you.
          </p>
          <Button variant="secondary">Learn More</Button>
        </div>
      </CardContent>
    </Card>
  );
}
