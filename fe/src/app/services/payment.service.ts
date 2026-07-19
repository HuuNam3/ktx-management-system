import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PaymentStats, PaymentRecord } from '../models/payment.model';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  getStats(): Observable<PaymentStats> {
    return of({ totalDebt: 28500000, totalPaid: 89000000, totalTransactions: 156, pendingCount: 23 });
  }

  getRecords(): Observable<PaymentRecord[]> {
    return of([
      { id: 1, customer: 'Trần Thị Bình', room: 'A102', feeType: 'Tiền phòng', amount: 1500000, dueDate: '05/08/2026', status: 'chua-dong' },
      { id: 2, customer: 'Phạm Thị Dung', room: 'B202', feeType: 'Tiền phòng', amount: 1500000, dueDate: '05/08/2026', status: 'chua-dong' },
      { id: 3, customer: 'Nguyễn Thị Phương', room: 'C302', feeType: 'Điện nước', amount: 350000, dueDate: '10/08/2026', status: 'chua-dong' },
      { id: 4, customer: 'Lê Thị Hạnh', room: 'B301', feeType: 'Tiền phòng', amount: 1200000, dueDate: '05/08/2026', status: 'chua-dong' },
      { id: 5, customer: 'Nguyễn Văn An', room: 'A101', feeType: 'Tiền phòng', amount: 1500000, dueDate: '05/07/2026', status: 'da-dong' },
      { id: 6, customer: 'Lê Văn Cường', room: 'B201', feeType: 'Điện nước', amount: 280000, dueDate: '10/07/2026', status: 'da-dong' },
      { id: 7, customer: 'Hoàng Văn Em', room: 'C301', feeType: 'Tiền phòng', amount: 1500000, dueDate: '05/07/2026', status: 'da-dong' },
      { id: 8, customer: 'Trần Văn Giàu', room: 'A201', feeType: 'Tiền phòng', amount: 1500000, dueDate: '05/06/2026', status: 'da-dong' },
      { id: 9, customer: 'Phạm Thị Dung', room: 'B202', feeType: 'Điện nước', amount: 320000, dueDate: '10/06/2026', status: 'qua-han' },
      { id: 10, customer: 'Trần Thị Bình', room: 'A102', feeType: 'Dịch vụ', amount: 200000, dueDate: '15/07/2026', status: 'da-dong' },
    ]);
  }
}
