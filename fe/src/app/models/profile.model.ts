export type ProfileStatus = 'cho-duyet' | 'da-duyet' | 'tu-choi';
export type ProfileFilter = 'all' | 'cho-duyet' | 'da-duyet' | 'tu-choi';

export interface ProfileStats {
  pending: number;
  approved: number;
  rejected: number;
  total: number;
}

export interface Profile238 {
  id: number;
  studentCode: string;
  name: string;
  room: string;
  type: string;
  submitDate: string;
  documents: string;
  status: ProfileStatus;
}
