import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GuestStats, Guest } from '../models/guest.model';

@Injectable({ providedIn: 'root' })
export class GuestService {
  getStats(): Observable<GuestStats> {
    return of({ total: 156, students: 98, guests: 38, trainees: 20 });
  }

  getGuests(): Observable<Guest[]> {
    return of([
      { id: 1, name: 'Nguyễn Văn An', cccd: '079201000123', phone: '0901234567', room: 'A101', bed: 'B1', type: 'sinh-vien', checkinDate: '01/07/2026', debt: 0, status: 'dang-o' },
      { id: 2, name: 'Trần Thị Bình', cccd: '079201000456', phone: '0901234568', room: 'A102', bed: 'B2', type: 'khach-vang-lai', checkinDate: '15/07/2026', debt: 350000, status: 'dang-o' },
      { id: 3, name: 'Lê Văn Cường', cccd: '079201000789', phone: '0901234569', room: 'B201', bed: 'B3', type: 'hoc-vien-lai-xe', checkinDate: '10/07/2026', debt: 0, status: 'dang-o' },
      { id: 4, name: 'Phạm Thị Dung', cccd: '079201000321', phone: '0901234570', room: 'B202', bed: 'B1', type: 'sinh-vien', checkinDate: '01/06/2026', debt: 1200000, status: 'dang-o' },
      { id: 5, name: 'Hoàng Văn Em', cccd: '079201000654', phone: '0901234571', room: 'C301', bed: 'B2', type: 'sinh-vien', checkinDate: '01/07/2026', debt: 0, status: 'dang-o' },
      { id: 6, name: 'Nguyễn Thị Phương', cccd: '079201000111', phone: '0901234572', room: 'C302', bed: 'B3', type: 'khach-vang-lai', checkinDate: '20/07/2026', debt: 500000, status: 'dang-o' },
      { id: 7, name: 'Trần Văn Giàu', cccd: '079201000222', phone: '0901234573', room: 'A201', bed: 'B1', type: 'sinh-vien', checkinDate: '01/06/2026', debt: 0, status: 'da-tra' },
      { id: 8, name: 'Lê Thị Hạnh', cccd: '079201000333', phone: '0901234574', room: 'B301', bed: 'B2', type: 'hoc-vien-lai-xe', checkinDate: '05/07/2026', debt: 200000, status: 'dang-o' },
    ]);
  }
}
