export interface DashboardStats {
  totalGuests: number;
  emptyRooms: number;
  revenue: number;
  alerts: number;
}

export interface RevenueEntry {
  date: string;
  value: number;
}

export interface RoomDistribution {
  type: string;
  count: number;
  color: string;
}

export interface TimelineActivity {
  id: number;
  type: 'checkin' | 'checkout' | 'payment' | 'register';
  title: string;
  description: string;
  time: string;
}

export interface Alert {
  id: number;
  type: 'danger' | 'warning' | 'info';
  title: string;
  time: string;
}
