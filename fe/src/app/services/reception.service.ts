import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ReceptionStats, CheckinRecord } from '../models/reception.model';

@Injectable({ providedIn: 'root' })
export class ReceptionService {
  getStats(): Observable<ReceptionStats> {
    return of({ checkinsToday: 24, checkoutsToday: 12, currentOccupants: 156 });
  }

  getRecentCheckins(): Observable<CheckinRecord[]> {
    return of([
      { name: 'Nguyễn Văn A', cccd: '079201000123', room: 'A101', bed: 'B1', type: 'sinh-vien', time: '07:30 - 17/07' },
      { name: 'Trần Thị B', cccd: '079201000456', room: 'A102', bed: 'B2', type: 'khach', time: '08:15 - 17/07' },
      { name: 'Lê Văn C', cccd: '079201000789', room: 'B201', bed: 'B3', type: 'hoc-vien', time: '09:00 - 17/07' },
      { name: 'Phạm Thị D', cccd: '079201000321', room: 'B202', bed: 'B1', type: 'sinh-vien', time: '09:45 - 17/07' },
      { name: 'Hoàng Văn E', cccd: '079201000654', room: 'C301', bed: 'B2', type: 'sinh-vien', time: '10:30 - 17/07' },
    ]);
  }
}
