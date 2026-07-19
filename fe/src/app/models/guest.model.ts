export type GuestType = 'sinh-vien' | 'khach-vang-lai' | 'hoc-vien-lai-xe';

export interface GuestStats {
  total: number;
  students: number;
  guests: number;
  trainees: number;
}

export interface Guest {
  id: number;
  name: string;
  cccd: string;
  phone: string;
  room: string;
  bed: string;
  type: GuestType;
  checkinDate: string;
  debt: number;
  status: 'dang-o' | 'da-tra';
}
