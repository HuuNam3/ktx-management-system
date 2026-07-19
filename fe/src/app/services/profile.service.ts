import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProfileStats, Profile238, ProfileFilter } from '../models/profile.model';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  getStats(): Observable<ProfileStats> {
    return of({ pending: 12, approved: 45, rejected: 5, total: 62 });
  }

  getProfiles(filter: ProfileFilter = 'all'): Observable<Profile238[]> {
    const all: Profile238[] = [
      { id: 1, studentCode: 'SV2024001', name: 'Nguyễn Văn An', room: 'A101', type: 'Miễn giảm KTX', submitDate: '15/07/2026', documents: '3 tài liệu', status: 'cho-duyet' },
      { id: 2, studentCode: 'SV2024002', name: 'Trần Thị Bình', room: 'A102', type: 'Miễn giảm học phí', submitDate: '14/07/2026', documents: '2 tài liệu', status: 'da-duyet' },
      { id: 3, studentCode: 'SV2024003', name: 'Lê Văn Cường', room: 'B201', type: 'Hỗ trợ khó khăn', submitDate: '13/07/2026', documents: '5 tài liệu', status: 'cho-duyet' },
      { id: 4, studentCode: 'SV2024004', name: 'Phạm Thị Dung', room: 'B202', type: 'Miễn giảm KTX', submitDate: '12/07/2026', documents: '3 tài liệu', status: 'tu-choi' },
      { id: 5, studentCode: 'SV2024005', name: 'Hoàng Văn Em', room: 'C301', type: 'Miễn giảm KTX', submitDate: '10/07/2026', documents: '4 tài liệu', status: 'da-duyet' },
      { id: 6, studentCode: 'SV2024006', name: 'Nguyễn Thị Phương', room: 'C302', type: 'Hỗ trợ khó khăn', submitDate: '08/07/2026', documents: '6 tài liệu', status: 'cho-duyet' },
      { id: 7, studentCode: 'SV2024007', name: 'Trần Văn Giàu', room: 'A201', type: 'Miễn giảm học phí', submitDate: '05/07/2026', documents: '2 tài liệu', status: 'da-duyet' },
      { id: 8, studentCode: 'SV2024008', name: 'Lê Thị Hạnh', room: 'B301', type: 'Miễn giảm KTX', submitDate: '01/07/2026', documents: '3 tài liệu', status: 'da-duyet' },
    ];
    if (filter === 'all') return of(all);
    return of(all.filter(p => p.status === filter));
  }
}
