export interface ReceptionStats {
  checkinsToday: number;
  checkoutsToday: number;
  currentOccupants: number;
}

export interface CheckinRecord {
  name: string;
  cccd: string;
  room: string;
  bed: string;
  type: 'sinh-vien' | 'khach' | 'hoc-vien';
  time: string;
}
