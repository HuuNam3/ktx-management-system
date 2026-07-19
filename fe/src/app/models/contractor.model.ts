export interface ContractorStats {
  working: number;
  completedToday: number;
  totalToday: number;
}

export interface ContractorRecord {
  id: number;
  name: string;
  unit: string;
  job: string;
  location: string;
  checkin: string;
  checkout: string;
  status: 'dang-lam' | 'hoan-thanh';
}
