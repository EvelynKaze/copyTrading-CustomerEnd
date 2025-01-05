export interface CryptoStats {
  total_investment: number;
  current_value: number;
  roi: number;
  // investmentChange: number;
  // valueChange: number;
  // roiChange: number;
}

export interface MarketTrend {
  token: string;
  icon: string;
  symbol: string;
  lastPrice: number;
  change24h: number;
  marketCap: string;
}

export interface QuickTransferUser {
  id: string;
  name: string;
  avatar: string;
}

export interface MonthlyStats {
  month: string;
  value: number;
}
