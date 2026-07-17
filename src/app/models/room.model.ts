export type RoomStatus = 'empty' | 'partial' | 'full' | 'maintenance';
export type BuildingBlock = 'all' | 'A' | 'B' | 'C';

export interface RoomStats {
  total: number;
  empty: number;
  partial: number;
  full: number;
  maintenance: number;
}

export interface Room {
  id: string;
  code: string;
  type: string;
  block: string;
  floor: number;
  current: number;
  max: number;
  status: RoomStatus;
}
