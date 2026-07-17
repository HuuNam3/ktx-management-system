import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TicketStats, TicketTransaction } from '../models/ticket.model';

@Injectable({ providedIn: 'root' })
export class TicketService {
  getStats(): Observable<TicketStats> {
    return of({ mealTickets: 45, vehicleTickets: 32, revenue: 12_500_000, mealsServed: 120 });
  }

  getTransactions(): Observable<TicketTransaction[]> {
    return of([
      { id: 1, type: 'meal', name: 'Nguyễn Văn A', description: 'Suất ăn trưa', amount: 35000, time: '11:30 17/07' },
      { id: 2, type: 'vehicle', name: 'Trần Thị B', description: 'Vé xe tháng 7', amount: 150000, time: '08:15 17/07' },
      { id: 3, type: 'meal', name: 'Lê Văn C', description: 'Suất ăn sáng', amount: 20000, time: '06:45 17/07' },
      { id: 4, type: 'meal', name: 'Phạm Thị D', description: 'Suất ăn tối', amount: 35000, time: '17:30 17/07' },
      { id: 5, type: 'vehicle', name: 'Hoàng Văn E', description: 'Vé xe ngày', amount: 10000, time: '07:00 17/07' },
      { id: 6, type: 'meal', name: 'Nguyễn Văn F', description: 'Suất ăn trưa', amount: 35000, time: '11:45 17/07' },
      { id: 7, type: 'vehicle', name: 'Trần Thị G', description: 'Vé xe tháng', amount: 150000, time: '09:30 17/07' },
      { id: 8, type: 'meal', name: 'Lê Văn H', description: 'Suất ăn sáng', amount: 20000, time: '06:30 17/07' },
    ]);
  }
}
