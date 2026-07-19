export type PaymentStatus = 'chua-dong' | 'da-dong' | 'qua-han';
export type PaymentTab = 'cong-no' | 'da-thanh-toan' | 'lich-su' | 'doi-soat-ca';

export interface PaymentStats {
  totalDebt: number;
  totalPaid: number;
  totalTransactions: number;
  pendingCount: number;
}

export interface PaymentRecord {
  id: number;
  customer: string;
  room: string;
  feeType: string;
  amount: number;
  dueDate: string;
  status: PaymentStatus;
}
