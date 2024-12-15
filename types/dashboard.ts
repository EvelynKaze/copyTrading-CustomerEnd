export interface CryptoStats {
  balance: number;
  spending: number;
  saved: number;
  balanceChange: number;
  spendingChange: number;
  savedChange: number;
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
