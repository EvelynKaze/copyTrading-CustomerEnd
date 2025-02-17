export interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface Stocks {
  $id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  isMinus: boolean;
}

export interface User {
  id: string;
  user_name: string;
  user_id: string;
  isAdmin: boolean;
  full_name: string;
  email_address: string;
  status: boolean;
  lastSeen: string;
  registeredDate: string;
  roi: number;
  current_value: number;
  total_investment: number;
  transactions?: {
    id: string;
    type: string;
    amount: number;
    currency: string;
    status: string;
    date: string;
  }[];
}

export interface Transaction {
  id: string;
  type: string;
  amount: number;
  currency: string;
  status: string;
  date: string;
}

export interface Cryptocurrency {
  $id: string;
  token_name: string;
  token_symbol: string;
  token_address: string;
  user_id: string;
  user_name: string;
}

export interface DepositCryptocurrency {
  id: string;
  name: string;
  value: string;
  address: string;
}

export interface Profile {
  id: null;
  full_name: string;
  phone_number: string;
  user_name: string;
  avatar_url: string;
  copy_trader: null;
  account_status: null;
  total_investment: null;
  current_value: null;
  roi: null;
  kyc_status: boolean;
  isAdmin: boolean;
  user_id: string;
}

export interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  isMinus: boolean;
}