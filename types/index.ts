export interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface Stock {
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