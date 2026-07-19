import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ContractorStats, ContractorRecord } from '../models/contractor.model';

@Injectable({ providedIn: 'root' })
export class ContractorService {
  getStats(): Observable<ContractorStats> {
    return of({ working: 2, completedToday: 4, totalToday: 6 });
  }

  getRecords(): Observable<ContractorRecord[]> {
    return of([
      { id: 1, name: 'Nguyễn Văn Sửa', unit: 'Công ty Xây dựng ABC', job: 'Sửa ống nước', location: 'A101', checkin: '07:30', checkout: '', status: 'dang-lam' },
      { id: 2, name: 'Trần Văn Điện', unit: 'Điện lạnh XYZ', job: 'Sửa điều hòa', location: 'A201', checkin: '08:00', checkout: '10:30', status: 'hoan-thanh' },
      { id: 3, name: 'Lê Văn Mộc', unit: 'Nội thất Home', job: 'Sửa cửa', location: 'B202', checkin: '08:15', checkout: '', status: 'dang-lam' },
      { id: 4, name: 'Phạm Văn Vệ', unit: 'Vệ sinh sạch', job: 'Vệ sinh mái', location: 'Khu B', checkin: '07:00', checkout: '09:00', status: 'hoan-thanh' },
      { id: 5, name: 'Hoàng Văn Bảo', unit: 'PCCC An toàn', job: 'Kiểm tra PCCC', location: 'Cả khu', checkin: '06:30', checkout: '08:30', status: 'hoan-thanh' },
      { id: 6, name: 'Đặng Văn Sơn', unit: 'Sơn sửa Đẹp', job: 'Sơn tường phòng', location: 'C302', checkin: '08:30', checkout: '11:00', status: 'hoan-thanh' },
    ]);
  }
}
