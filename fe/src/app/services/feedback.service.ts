import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FeedbackStats, Feedback } from '../models/feedback.model';

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  getStats(): Observable<FeedbackStats> {
    return of({ pending: 8, resolved: 15, highPriority: 3, total: 23 });
  }

  getFeedbacks(): Observable<Feedback[]> {
    return of([
      { id: 1, student: 'Nguyễn Văn An', room: 'A101', type: 'Khiếu nại', content: 'Tiếng ồn từ phòng bên cạnh về đêm', date: '19/07/2026', priority: 'cao', status: 'cho-xu-ly' },
      { id: 2, student: 'Trần Thị Bình', room: 'A102', type: 'Góp ý', content: 'Cần thêm thùng rác khu vực chung', date: '18/07/2026', priority: 'thap', status: 'da-xu-ly' },
      { id: 3, student: 'Lê Văn Cường', room: 'B201', type: 'Khiếu nại', content: 'Mất điện thang máy thường xuyên', date: '18/07/2026', priority: 'cao', status: 'cho-xu-ly' },
      { id: 4, student: 'Phạm Thị Dung', room: 'B202', type: 'Phản hồi', content: 'Nhân viên vệ sinh làm việc tốt', date: '17/07/2026', priority: 'thap', status: 'da-xu-ly' },
      { id: 5, student: 'Hoàng Văn Em', room: 'C301', type: 'Góp ý', content: 'Đề xuất thêm giờ mở cửa', date: '16/07/2026', priority: 'trung-binh', status: 'cho-xu-ly' },
      { id: 6, student: 'Nguyễn Thị Phương', room: 'C302', type: 'Khiếu nại', content: 'Mất nước từ 20h-22h nhiều ngày', date: '15/07/2026', priority: 'cao', status: 'dang-xu-ly' },
      { id: 7, student: 'Trần Văn Giàu', room: 'A201', type: 'Phản hồi', content: 'Cảm ơn đã sửa điều hòa nhanh chóng', date: '14/07/2026', priority: 'thap', status: 'da-xu-ly' },
      { id: 8, student: 'Lê Thị Hạnh', room: 'B301', type: 'Góp ý', content: 'WiFi yếu về tối', date: '13/07/2026', priority: 'trung-binh', status: 'cho-xu-ly' },
    ]);
  }
}
