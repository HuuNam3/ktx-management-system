import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { LucideIconComponent } from '../../components/lucide-icon/lucide-icon.component';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  standalone: true,
  imports: [PageHeaderComponent, LucideIconComponent],
})
export class FeedbackPage {
  message = '';
  stats = [
    { label: 'Chờ xử lý', value: '2', icon: 'clock', color: '#B45309', bg: '#FEFCE8', border: '#FDE047' },
    { label: 'Đã xử lý', value: '1', icon: 'circle-check', color: '#059669', bg: '#F0FDF4', border: '#BBF7D0' },
    { label: 'Ưu tiên cao', value: '2', icon: '', color: '#DC2626', bg: '#FEF2F2', border: '#FECACA' },
    { label: 'Tổng phản hồi', value: '3', icon: 'message-square', color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE' },
  ];
  rows = [
    { student: 'Nguyễn Văn A', room: 'A301', type: 'Góp ý', content: 'Nên có thêm máy giặt', date: '25/03/2026', level: 'Trung bình', status: 'Chờ xử lý' },
    { student: 'Trần Thị B', room: 'B205', type: 'Khiếu nại', content: 'Wifi chậm', date: '24/03/2026', level: 'Cao', status: 'Đã xử lý' },
    { student: 'Lê Văn C', room: 'C108', type: 'Yêu cầu', content: 'Sửa cửa phòng', date: '23/03/2026', level: 'Cao', status: 'Chờ xử lý' },
  ];

  resolve(row: { status: string }) {
    row.status = 'Đã xử lý';
    this.recalc();
    this.show('Đã xử lý phản hồi.');
  }

  private recalc() {
    const pending = this.rows.filter(row => row.status === 'Chờ xử lý').length;
    const resolved = this.rows.filter(row => row.status === 'Đã xử lý').length;
    this.stats[0].value = String(pending);
    this.stats[1].value = String(resolved);
  }

  typeClass(type: string) {
    return type === 'Góp ý' ? 'bg-green-100 text-green-700' : type === 'Khiếu nại' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700';
  }
  show(text: string) { this.message = text; window.setTimeout(() => this.message = '', 1800); }
}
