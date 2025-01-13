"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Home, Upload, Download, Clock } from "lucide-react";
import Logo from "../logo";

const data = [
  { month: "Jan", amount: 4000 },
  { month: "Feb", amount: 3000 },
  { month: "Mar", amount: 2000 },
  { month: "Apr", amount: 2700 },
  { month: "May", amount: 1800 },
  { month: "Jun", amount: 2300 },
  { month: "Jul", amount: 3800 },
  { month: "Aug", amount: 3000 },
  { month: "Sep", amount: 2000 },
  { month: "Oct", amount: 2800 },
  { month: "Nov", amount: 1800 },
  { month: "Dec", amount: 2300 },
];

export function DashboardLayout() {
  return (
    <div className="flex h-full bg-background rounded-lg border shadow-sm">
      {/* Mini Sidebar */}
      <div className="hidden sm:flex w-14 flex-col border-r px-2 py-2">
        <div className="mb-2">
          <Logo />
        </div>
        <div className="flex flex-col gap-2">
          <button className="p-2 rounded-md bg-secondary">
            <Home className="h-4 w-4" />
          </button>
          <button className="p-2 rounded-md hover:bg-secondary/80">
            <Upload className="h-4 w-4" />
          </button>
          <button className="p-2 rounded-md hover:bg-secondary/80">
            <Download className="h-4 w-4" />
          </button>
          <button className="p-2 rounded-md hover:bg-secondary/80">
            <Clock className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-3 space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold">Welcome Nona_J!</h2>
            <p className="text-xs text-muted-foreground">
              Account Copy Trader: Unassigned
            </p>
          </div>
          <button className="text-xs px-2 py-1 rounded-md bg-secondary">
            Connect Wallet
          </button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2">
          {["Total Investment", "Current Value", "ROI"].map((title) => (
            <Card key={title} className="shadow-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 p-2">
                <CardTitle className="text-xs font-medium">{title}</CardTitle>
                <Copy className="h-3 w-3" />
              </CardHeader>
              <CardContent className="p-2 pt-0">
                <div className="text-sm font-bold">$0</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart and Copy Trading */}
        <div className="grid gap-2 sm:grid-cols-7">
          <Card className="sm:col-span-5 shadow-none">
            <CardHeader className="p-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs">Statistics</CardTitle>
                <div className="flex gap-1">
                  <select className="text-xs px-1 py-0.5 rounded border bg-background">
                    <option>Spending</option>
                  </select>
                  <select className="text-xs px-1 py-0.5 rounded border bg-background">
                    <option>2022</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-2">
              <div className="h-[100px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <XAxis dataKey="month" stroke="#888888" fontSize={8} />
                    <YAxis stroke="#888888" fontSize={8} />
                    <Bar
                      dataKey="amount"
                      fill="#E4C389"
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="sm:col-span-2 shadow-none">
            <CardHeader className="p-2">
              <CardTitle className="text-xs flex items-center gap-1">
                <Copy className="h-3 w-3" />
                CopyTrading Options
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 space-y-2">
              {[
                { name: "Dominika V.", rate: "92%", growth: "+65%" },
                { name: "Nate N.", rate: "65%", growth: "+59%" },
              ].map((trader) => (
                <div key={trader.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium">{trader.name}</span>
                    <span className="text-muted-foreground">{trader.rate}</span>
                  </div>
                  <div className="text-[10px] text-green-500">
                    {trader.growth} Monthly
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
