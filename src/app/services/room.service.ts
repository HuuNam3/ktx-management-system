import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RoomStats, Room, BuildingBlock } from '../models/room.model';

@Injectable({ providedIn: 'root' })
export class RoomService {
  getStats(): Observable<RoomStats> {
    return of({ total: 120, empty: 23, partial: 45, full: 47, maintenance: 5 });
  }

  getRooms(block: BuildingBlock = 'all'): Observable<Room[]> {
    const all: Room[] = [
      { id: 'A101', code: 'A101', type: 'Phòng đôi', block: 'A', floor: 1, current: 2, max: 2, status: 'full' },
      { id: 'A102', code: 'A102', type: 'Phòng đôi', block: 'A', floor: 1, current: 1, max: 2, status: 'partial' },
      { id: 'A103', code: 'A103', type: 'Phòng đơn', block: 'A', floor: 1, current: 0, max: 1, status: 'empty' },
      { id: 'A201', code: 'A201', type: 'Phòng ba', block: 'A', floor: 2, current: 3, max: 3, status: 'full' },
      { id: 'A202', code: 'A202', type: 'Phòng ba', block: 'A', floor: 2, current: 2, max: 3, status: 'partial' },
      { id: 'B101', code: 'B101', type: 'Phòng đôi', block: 'B', floor: 1, current: 2, max: 2, status: 'full' },
      { id: 'B102', code: 'B102', type: 'Phòng đôi', block: 'B', floor: 1, current: 0, max: 2, status: 'empty' },
      { id: 'B201', code: 'B201', type: 'Phòng bốn', block: 'B', floor: 2, current: 3, max: 4, status: 'partial' },
      { id: 'B202', code: 'B202', type: 'Phòng bốn', block: 'B', floor: 2, current: 4, max: 4, status: 'full' },
      { id: 'B301', code: 'B301', type: 'Phòng đơn', block: 'B', floor: 3, current: 0, max: 1, status: 'maintenance' },
      { id: 'C101', code: 'C101', type: 'Phòng đôi', block: 'C', floor: 1, current: 0, max: 2, status: 'empty' },
      { id: 'C102', code: 'C102', type: 'Phòng đôi', block: 'C', floor: 1, current: 1, max: 2, status: 'partial' },
      { id: 'C201', code: 'C201', type: 'Phòng ba', block: 'C', floor: 2, current: 3, max: 3, status: 'full' },
      { id: 'C202', code: 'C202', type: 'Phòng ba', block: 'C', floor: 2, current: 2, max: 3, status: 'partial' },
      { id: 'C301', code: 'C301', type: 'Phòng bốn', block: 'C', floor: 3, current: 0, max: 4, status: 'empty' },
      { id: 'C302', code: 'C302', type: 'Phòng bốn', block: 'C', floor: 3, current: 4, max: 4, status: 'full' },
      { id: 'A301', code: 'A301', type: 'Phòng đơn', block: 'A', floor: 3, current: 1, max: 1, status: 'full' },
      { id: 'A302', code: 'A302', type: 'Phòng đơn', block: 'A', floor: 3, current: 0, max: 1, status: 'maintenance' },
      { id: 'B302', code: 'B302', type: 'Phòng bốn', block: 'B', floor: 3, current: 0, max: 4, status: 'empty' },
      { id: 'C303', code: 'C303', type: 'Phòng ba', block: 'C', floor: 3, current: 0, max: 3, status: 'empty' },
    ];
    if (block === 'all') return of(all);
    return of(all.filter(r => r.block === block));
  }
}
