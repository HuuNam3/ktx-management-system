import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ChecklistStats, ChecklistItem } from '../models/checklist.model';

@Injectable({ providedIn: 'root' })
export class ChecklistService {
  getStats(): Observable<ChecklistStats> {
    return of({ currentShift: 5, completed: 3, remaining: 2 });
  }

  getItems(): Observable<ChecklistItem[]> {
    return of([
      { id: 1, task: 'Kiểm tra an ninh các tầng', time: '07:00', status: 'done' },
      { id: 2, task: 'Vệ sinh hành lang khu A', time: '07:30', status: 'done' },
      { id: 3, task: 'Kiểm tra hệ thống PCCC', time: '08:00', status: 'done' },
      { id: 4, task: 'Bàn giao ca trực', time: '14:00', status: 'pending' },
      { id: 5, task: 'Ghi chỉ số điện nước', time: '15:30', status: 'pending' },
    ]);
  }
}
