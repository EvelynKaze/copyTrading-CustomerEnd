import { ArrowUpRight } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MarketTrend } from "@/types/dashboard";
import { Icon } from "@iconify/react/dist/iconify.js";

interface MarketTrendsProps {
  trends: MarketTrend[];
}

export function MarketTrends({ trends }: MarketTrendsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Trending Market</h2>
        <button className="text-sm text-primary hover:underline">
          View more markets
        </button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Token</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Last Price</TableHead>
            <TableHead>24H Change</TableHead>
            <TableHead className="text-right">Market Cap</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trends.map((trend) => (
            <TableRow key={trend.symbol}>
              <TableCell className="flex items-center gap-2 font-medium">
                <Icon className="text-2xl" icon={trend.icon} />
                {trend.token}
              </TableCell>
              <TableCell>{trend.symbol}</TableCell>
              <TableCell>${trend.lastPrice.toLocaleString()}</TableCell>
              <TableCell className="text-green-500">
                <span className="flex items-center gap-1">
                  <ArrowUpRight className="h-4 w-4" />
                  {trend.change24h}%
                </span>
              </TableCell>
              <TableCell className="text-right">{trend.marketCap}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
