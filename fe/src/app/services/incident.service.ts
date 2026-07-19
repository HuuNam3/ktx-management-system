import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IncidentStats, Incident } from '../models/incident.model';

@Injectable({ providedIn: 'root' })
export class IncidentService {
  getStats(): Observable<IncidentStats> {
    return of({ unresolved: 3, resolved: 7, totalCost: 8500000, totalIncidents: 10 });
  }

  getIncidents(): Observable<Incident[]> {
    return of([
      { id: 1, room: 'A101', type: 'Hỏng cửa', description: 'Cửa phòng bị kẹt không đóng được', reporter: 'Nguyễn Văn An', date: '18/07/2026', cost: 0, status: 'chua-xu-ly' },
      { id: 2, room: 'B202', type: 'Rò rỉ nước', description: 'Vòi nước phòng tắm bị rò rỉ', reporter: 'Phạm Thị Dung', date: '17/07/2026', cost: 250000, status: 'da-xu-ly' },
      { id: 3, room: 'C301', type: 'Hỏng đèn', description: 'Đèn bàn không sáng', reporter: 'Hoàng Văn Em', date: '17/07/2026', cost: 0, status: 'chua-xu-ly' },
      { id: 4, room: 'A201', type: 'Điều hòa hỏng', description: 'Điều hòa không mát', reporter: 'Trần Văn Giàu', date: '15/07/2026', cost: 1500000, status: 'da-xu-ly' },
      { id: 5, room: 'B301', type: 'Khóa hỏng', description: 'Khóa tủ bị gãy', reporter: 'Lê Thị Hạnh', date: '14/07/2026', cost: 0, status: 'chua-xu-ly' },
      { id: 6, room: 'A102', type: 'Hỏng quạt', description: 'Quạt trần kêu to', reporter: 'Trần Thị Bình', date: '12/07/2026', cost: 450000, status: 'da-xu-ly' },
      { id: 7, room: 'C302', type: 'Nứt tường', description: 'Tường phòng bị nứt', reporter: 'Nguyễn Thị Phương', date: '10/07/2026', cost: 3500000, status: 'da-xu-ly' },
    ]);
  }
}
