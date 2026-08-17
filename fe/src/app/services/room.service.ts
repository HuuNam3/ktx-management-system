import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RoomStats, Room, BuildingBlock } from '../models/room.model';

@Injectable({ providedIn: 'root' })
export class RoomService {
  getStats(): Observable<RoomStats> {
    return of({ total: 15, empty: 2, partial: 8, full: 4, maintenance: 1 });
  }

  getRooms(block: BuildingBlock = 'all'): Observable<Room[]> {
    const all: Room[] = [
      { id: 'A201', code: 'A201', type: 'Phòng 4', block: 'A', floor: 2, current: 2, max: 4, status: 'partial' },
      { id: 'A202', code: 'A202', type: 'Phòng 4', block: 'A', floor: 2, current: 4, max: 4, status: 'full' },
      { id: 'A203', code: 'A203', type: 'Phòng 4', block: 'A', floor: 2, current: 0, max: 4, status: 'empty' },
      { id: 'A204', code: 'A204', type: 'Phòng 4', block: 'A', floor: 2, current: 3, max: 4, status: 'partial' },
      { id: 'A205', code: 'A205', type: 'Phòng 4', block: 'A', floor: 2, current: 0, max: 4, status: 'maintenance' },
      { id: 'A301', code: 'A301', type: 'Phòng 6', block: 'A', floor: 3, current: 4, max: 6, status: 'partial' },
      { id: 'A302', code: 'A302', type: 'Phòng 6', block: 'A', floor: 3, current: 6, max: 6, status: 'full' },
      { id: 'A303', code: 'A303', type: 'Phòng 6', block: 'A', floor: 3, current: 2, max: 6, status: 'partial' },
      { id: 'B201', code: 'B201', type: 'Phòng 4', block: 'B', floor: 2, current: 4, max: 4, status: 'full' },
      { id: 'B202', code: 'B202', type: 'Phòng 4', block: 'B', floor: 2, current: 1, max: 4, status: 'partial' },
      { id: 'B203', code: 'B203', type: 'Phòng 6', block: 'B', floor: 2, current: 5, max: 6, status: 'partial' },
      { id: 'B204', code: 'B204', type: 'Phòng 6', block: 'B', floor: 2, current: 0, max: 6, status: 'empty' },
      { id: 'B205', code: 'B205', type: 'Phòng 6', block: 'B', floor: 2, current: 3, max: 6, status: 'partial' },
      { id: 'C108', code: 'C108', type: 'Phòng 6', block: 'C', floor: 1, current: 5, max: 6, status: 'partial' },
      { id: 'C102', code: 'C102', type: 'Phòng 4', block: 'C', floor: 1, current: 4, max: 4, status: 'full' },
    ];
    if (block === 'all') return of(all);
    return of(all.filter(r => r.block === block));
  }
}
