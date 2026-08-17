import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { LogEntry, LogStats, LogType } from '../models/log.model';

export type CreateLogEntry = Omit<LogEntry, 'id' | 'time'> & { time?: string };

@Injectable({ providedIn: 'root' })
export class LogService {
  private nextId = 7;

  private readonly entriesSubject = new BehaviorSubject<LogEntry[]>([
    { id: 1, time: '09:15:32', type: 'checkin', fullName: 'Nguyễn Văn A', cccd: '079123456789', room: 'A301', method: 'Thủ công', staff: 'Lễ tân 1' },
    { id: 2, time: '09:02:15', type: 'checkout', fullName: 'Trần Thị B', cccd: '079987654321', room: 'B205', method: 'Thủ công', staff: 'Lễ tân 1' },
    { id: 3, time: '08:45:22', type: 'checkin', fullName: 'Lê Văn C', cccd: '079555666777', room: 'C108', method: 'QR Code', staff: 'Auto' },
    { id: 4, time: '08:30:45', type: 'checkout', fullName: 'Phạm Thị D', cccd: '079111222333', room: 'A201', method: 'Thủ công', staff: 'Lễ tân 2' },
    { id: 5, time: '08:15:10', type: 'checkin', fullName: 'Hoàng Văn E', cccd: '079444555666', room: 'B305', method: 'QR Code', staff: 'Auto' },
    { id: 6, time: '08:00:33', type: 'checkin', fullName: 'Võ Thị F', cccd: '079777888999', room: 'C102', method: 'Thủ công', staff: 'Lễ tân 1' },
  ]);

  getStats(): Observable<LogStats> {
    return this.entriesSubject.asObservable().pipe(
      map(entries => ({
        todayCheckins: entries.filter(entry => entry.type === 'checkin' || entry.type === 'qr').length,
        todayCheckouts: entries.filter(entry => entry.type === 'checkout').length,
        totalEntries: entries.length,
        totalExits: entries.filter(entry => entry.method === 'QR Code' || entry.type === 'qr').length,
      }))
    );
  }

  getEntries(type: LogType = 'all', search = ''): Observable<LogEntry[]> {
    return this.entriesSubject.asObservable().pipe(
      map(entries => this.filter(entries, type, search))
    );
  }

  addEntry(entry: CreateLogEntry) {
    const item: LogEntry = {
      ...entry,
      id: this.nextId++,
      time: entry.time || this.currentTime(),
    };
    this.entriesSubject.next([item, ...this.entriesSubject.value]);
    return item;
  }

  exportCsv(type: LogType = 'all', search = '') {
    const rows = this.filter(this.entriesSubject.value, type, search);
    const headers = ['Thời gian', 'Loại', 'Họ tên', 'CCCD', 'Phòng', 'Phương thức', 'Nhân viên'];
    const body = rows.map(entry => [
      entry.time,
      entry.type,
      entry.fullName,
      entry.cccd,
      entry.room,
      entry.method,
      entry.staff,
    ]);
    const csv = [headers, ...body]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nhat-ky-ra-vao-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  private filter(entries: LogEntry[], type: LogType, search: string) {
    const q = search.trim().toLowerCase();
    return entries.filter(entry => {
      const matchesType = type === 'all' || entry.type === type;
      const matchesSearch = !q || [entry.fullName, entry.cccd, entry.room].some(value => value.toLowerCase().includes(q));
      return matchesType && matchesSearch;
    });
  }

  private currentTime() {
    const now = new Date();
    return [now.getHours(), now.getMinutes(), now.getSeconds()]
      .map(value => value.toString().padStart(2, '0'))
      .join(':');
  }
}
