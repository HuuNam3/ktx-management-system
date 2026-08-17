import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CheckinRecord, ReceptionStats } from '../models/reception.model';

export interface ReceptionGuest {
  id: number;
  name: string;
  cccd: string;
  room: string;
  bed: string;
  type: 'sinh-vien' | 'khach' | 'hoc-vien';
  status: 'inside' | 'outside';
}

@Injectable({ providedIn: 'root' })
export class ReceptionService {
  private readonly guestsSubject = new BehaviorSubject<ReceptionGuest[]>([
    { id: 1, name: 'Nguyễn Văn A', cccd: '079123456789', room: 'A301', bed: 'G3', type: 'sinh-vien', status: 'inside' },
    { id: 2, name: 'Trần Thị B', cccd: '079987654321', room: 'B205', bed: 'G1', type: 'khach', status: 'inside' },
    { id: 3, name: 'Lê Văn C', cccd: '079555666777', room: 'C108', bed: 'G5', type: 'hoc-vien', status: 'inside' },
    { id: 4, name: 'Phạm Thị D', cccd: '079111222333', room: 'A201', bed: 'G2', type: 'sinh-vien', status: 'outside' },
    { id: 5, name: 'Hoàng Văn E', cccd: '079444555666', room: 'B305', bed: 'G4', type: 'sinh-vien', status: 'outside' },
    { id: 6, name: 'Võ Thị F', cccd: '079777888999', room: 'C102', bed: 'G1', type: 'sinh-vien', status: 'outside' },
  ]);

  private readonly statsSubject = new BehaviorSubject<ReceptionStats>({
    checkinsToday: 12,
    checkoutsToday: 5,
    currentOccupants: 342,
  });

  private readonly recentSubject = new BehaviorSubject<CheckinRecord[]>([
    { name: 'Nguyễn Văn A', cccd: '079123456789', room: 'A301', bed: 'G3', type: 'sinh-vien', time: '09:15' },
    { name: 'Trần Thị B', cccd: '079987654321', room: 'B205', bed: 'G1', type: 'khach', time: '08:45' },
    { name: 'Lê Văn C', cccd: '079555666777', room: 'C108', bed: 'G5', type: 'hoc-vien', time: '08:20' },
  ]);

  getStats(): Observable<ReceptionStats> {
    return this.statsSubject.asObservable();
  }

  getGuests(): Observable<ReceptionGuest[]> {
    return this.guestsSubject.asObservable();
  }

  getRecentCheckins(): Observable<CheckinRecord[]> {
    return this.recentSubject.asObservable();
  }

  findGuests(keyword: string): ReceptionGuest[] {
    const q = keyword.trim().toLowerCase();
    if (!q) return this.guestsSubject.value;
    return this.guestsSubject.value.filter(guest =>
      [guest.name, guest.cccd, guest.room, guest.bed].some(value => value.toLowerCase().includes(q))
    );
  }

  checkIn(guest: ReceptionGuest): CheckinRecord {
    const time = this.currentTime(false);
    this.updateGuestStatus(guest.id, 'inside');
    this.statsSubject.next({
      ...this.statsSubject.value,
      checkinsToday: this.statsSubject.value.checkinsToday + 1,
      currentOccupants: this.statsSubject.value.currentOccupants + (guest.status === 'inside' ? 0 : 1),
    });

    const record: CheckinRecord = {
      name: guest.name,
      cccd: guest.cccd,
      room: guest.room,
      bed: guest.bed,
      type: guest.type,
      time,
    };
    this.recentSubject.next([record, ...this.recentSubject.value].slice(0, 8));
    return record;
  }

  checkOut(guest: ReceptionGuest) {
    this.updateGuestStatus(guest.id, 'outside');
    this.statsSubject.next({
      ...this.statsSubject.value,
      checkoutsToday: this.statsSubject.value.checkoutsToday + 1,
      currentOccupants: Math.max(0, this.statsSubject.value.currentOccupants - (guest.status === 'outside' ? 0 : 1)),
    });
  }

  currentTime(withSeconds = true) {
    const now = new Date();
    const hh = now.getHours().toString().padStart(2, '0');
    const mm = now.getMinutes().toString().padStart(2, '0');
    const ss = now.getSeconds().toString().padStart(2, '0');
    return withSeconds ? `${hh}:${mm}:${ss}` : `${hh}:${mm}`;
  }

  private updateGuestStatus(id: number, status: ReceptionGuest['status']) {
    this.guestsSubject.next(this.guestsSubject.value.map(guest => guest.id === id ? { ...guest, status } : guest));
  }
}
