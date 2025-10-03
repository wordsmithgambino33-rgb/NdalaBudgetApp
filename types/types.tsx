export interface Transaction {
  id: string;
  amount: number;
  source: 'salary' | 'business' | 'ganyu' | 'farming' | 'other';
  category: string;
  date: string;
  note?: string;
}

export interface Budget {
  id: string;
  category: string;
  amount: number;
  period: 'weekly' | 'monthly';
  spent: number;
}