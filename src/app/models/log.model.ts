export type LogType = 'checkin' | 'checkout' | 'qr' | 'all';

export interface LogEntry {
  id: number;
  time: string;
  type: LogType;
  fullName: string;
  cccd: string;
  room: string;
  method: string;
  staff: string;
}

export interface LogStats {
  todayCheckins: number;
  todayCheckouts: number;
  totalEntries: number;
  totalExits: number;
}
