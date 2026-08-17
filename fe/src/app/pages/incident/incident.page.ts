import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { LucideIconComponent } from '../../components/lucide-icon/lucide-icon.component';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.page.html',
  standalone: true,
  imports: [PageHeaderComponent, LucideIconComponent],
})
export class IncidentPage {
  message = '';
  stats = [
    { label: 'Chưa xử lý', value: '2', icon: 'triangle-alert', color: '#DC2626', bg: '#FEF2F2', border: '#FECACA' },
    { label: 'Đã xử lý', value: '1', icon: '', color: '#059669', bg: '#F0FDF4', border: '#BBF7D0' },
    { label: 'Tổng chi phí', value: '1.500.000đ', icon: '', color: '#B45309', bg: '#FEFCE8', border: '#FDE047' },
    { label: 'Tổng sự cố', value: '3', icon: '', color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE' },
  ];
  rows = [
    { room: 'A301', type: 'Hư hỏng thiết bị', desc: 'Quạt trần hỏng', reporter: 'Nguyễn Văn A', date: '25/03/2026', cost: '500.000đ', status: 'Chưa xử lý' },
    { room: 'B205', type: 'Vi phạm nội quy', desc: 'Nấu ăn trong phòng', reporter: 'Bảo vệ', date: '24/03/2026', cost: '200.000đ', status: 'Đã xử lý' },
    { room: 'C108', type: 'Hư hỏng cơ sở', desc: 'Cửa sổ bị vỡ kính', reporter: 'Trần Thị B', date: '23/03/2026', cost: '800.000đ', status: 'Chưa xử lý' },
  ];

  report() {
    this.rows = [
      { room: 'A205', type: 'Bảo trì', desc: 'Kiểm tra thiết bị phòng', reporter: 'Lễ tân 1', date: new Date().toLocaleDateString('vi-VN'), cost: '0đ', status: 'Chưa xử lý' },
      ...this.rows,
    ];
    this.recalc();
    this.show('Đã tạo báo cáo sự cố mới.');
  }

  resolve(row: { status: string }) {
    row.status = 'Đã xử lý';
    this.recalc();
    this.show('Đã cập nhật trạng thái sự cố.');
  }

  private recalc() {
    const pending = this.rows.filter(row => row.status === 'Chưa xử lý').length;
    const resolved = this.rows.filter(row => row.status === 'Đã xử lý').length;
    this.stats[0].value = String(pending);
    this.stats[1].value = String(resolved);
    this.stats[3].value = String(this.rows.length);
  }

  show(text: string) { this.message = text; window.setTimeout(() => this.message = '', 1800); }
}
