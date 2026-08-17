import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { LucideIconComponent } from '../../components/lucide-icon/lucide-icon.component';

@Component({
  selector: 'app-contractor',
  templateUrl: './contractor.page.html',
  standalone: true,
  imports: [PageHeaderComponent, LucideIconComponent],
})
export class ContractorPage {
  message = '';
  stats = [
    { label: 'Đang làm việc', value: '1', color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE', icon: 'wrench' },
    { label: 'Hoàn thành hôm nay', value: '1', color: '#059669', bg: '#F0FDF4', border: '#BBF7D0', icon: '' },
    { label: 'Tổng lượt hôm nay', value: '2', color: '#9333EA', bg: '#FAF5FF', border: '#E9D5FF', icon: '' },
  ];
  rows = [
    { name: 'Nguyễn Văn Thợ', unit: 'Điện lạnh ABC', job: 'Sửa điều hòa', location: 'Phòng A301', in: '09:00', out: '-', status: 'Đang làm' },
    { name: 'Trần Văn Sơn', unit: 'Thợ nước XYZ', job: 'Sửa ống nước', location: 'Phòng B205', in: '08:30', out: '11:30', status: 'Hoàn thành' },
  ];

  checkin() {
    this.rows = [
      { name: 'Lê Văn Minh', unit: 'Bảo trì MEP', job: 'Kiểm tra thang máy', location: 'Khu A', in: this.currentTime(), out: '-', status: 'Đang làm' },
      ...this.rows,
    ];
    this.recalc();
    this.show('Đã check-in thợ mới.');
  }

  checkout(row: { out: string; status: string }) {
    row.out = this.currentTime();
    row.status = 'Hoàn thành';
    this.recalc();
    this.show('Đã check-out thợ.');
  }

  private recalc() {
    this.stats[0].value = String(this.rows.filter(row => row.status === 'Đang làm').length);
    this.stats[1].value = String(this.rows.filter(row => row.status === 'Hoàn thành').length);
    this.stats[2].value = String(this.rows.length);
  }

  private currentTime() {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  }

  show(text: string) { this.message = text; window.setTimeout(() => this.message = '', 1800); }
}
