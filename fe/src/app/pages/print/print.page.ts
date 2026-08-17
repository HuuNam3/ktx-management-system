import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { LucideIconComponent } from '../../components/lucide-icon/lucide-icon.component';

@Component({
  selector: 'app-print',
  templateUrl: './print.page.html',
  standalone: true,
  imports: [PageHeaderComponent, LucideIconComponent],
})
export class PrintPage {
  message = '';

  documents = [
    { title: 'Giấy xác nhận sinh viên KTX', icon: 'file-text', color: '#2563EB', bg: '#DBEAFE' },
    { title: 'Giấy xác nhận tạm trú', icon: 'file-text', color: '#059669', bg: '#DCFCE7' },
    { title: 'Giấy xác nhận miễn giảm 238', icon: 'file-text', color: '#9333EA', bg: '#F3E8FF' },
    { title: 'Hóa đơn tiền phòng', icon: 'file-text', color: '#D97706', bg: '#FEF3C7' },
    { title: 'Biên lai thu tiền', icon: 'file-text', color: '#EA580C', bg: '#FFEDD5' },
    { title: 'Hợp đồng lưu trú', icon: 'file-text', color: '#DC2626', bg: '#FEE2E2' },
  ];

  open(title: string) {
    this.message = `Đã mở mẫu ${title}`;
    window.setTimeout(() => this.message = '', 1800);
  }
}
