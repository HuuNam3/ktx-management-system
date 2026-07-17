import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LogEntry, LogStats, LogType } from '../models/log.model';

@Injectable({ providedIn: 'root' })
export class LogService {
  getStats(): Observable<LogStats> {
    return of({ todayCheckins: 24, todayCheckouts: 12, totalEntries: 1250, totalExits: 980 });
  }

  getEntries(type: LogType = 'all'): Observable<LogEntry[]> {
    const all: LogEntry[] = [
      { id: 1, time: '07:30 17/07', type: 'checkin', fullName: 'Nguyễn Văn A', cccd: '079201000123', room: 'A101', method: 'Thẻ', staff: 'Admin' },
      { id: 2, time: '08:15 17/07', type: 'checkout', fullName: 'Trần Thị B', cccd: '079201000456', room: 'A102', method: 'Thẻ', staff: 'Admin' },
      { id: 3, time: '09:00 17/07', type: 'qr', fullName: 'Lê Văn C', cccd: '079201000789', room: 'B201', method: 'QR', staff: 'Admin' },
      { id: 4, time: '09:45 17/07', type: 'checkin', fullName: 'Phạm Thị D', cccd: '079201000321', room: 'B202', method: 'Thẻ', staff: 'Admin' },
      { id: 5, time: '10:30 17/07', type: 'checkin', fullName: 'Hoàng Văn E', cccd: '079201000654', room: 'C301', method: 'QR', staff: 'Admin' },
      { id: 6, time: '11:00 17/07', type: 'checkout', fullName: 'Nguyễn Văn F', cccd: '079201000111', room: 'A101', method: 'Thẻ', staff: 'Admin' },
      { id: 7, time: '13:15 17/07', type: 'qr', fullName: 'Trần Thị G', cccd: '079201000222', room: 'C302', method: 'QR', staff: 'Admin' },
      { id: 8, time: '14:00 17/07', type: 'checkin', fullName: 'Lê Văn H', cccd: '079201000333', room: 'B301', method: 'Thẻ', staff: 'Admin' },
    ];
    if (type === 'all') return of(all);
    return of(all.filter(e => e.type === type));
  }
}
