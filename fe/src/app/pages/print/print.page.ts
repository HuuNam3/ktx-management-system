import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { LucideIconComponent } from '../../components/lucide-icon/lucide-icon.component';
import { PrintDocument } from '../../models/print.model';

@Component({
  selector: 'app-print',
  templateUrl: './print.page.html',
  styleUrls: ['./print.page.scss'],
  standalone: true,
  imports: [PageHeaderComponent, LucideIconComponent],
})
export class PrintPage {
  documents: PrintDocument[] = [
    { id: '1', title: 'Giấy xác nhận sinh viên', description: 'Xác nhận đang ở KTX', icon: 'graduation-cap', color: '#2563EB', bgColor: '#EFF6FF' },
    { id: '2', title: 'Giấy xác nhận tạm trú', description: 'Xác nhận tạm trú KTX', icon: 'home', color: '#16A34A', bgColor: '#F0FDF4' },
    { id: '3', title: 'Giấy miễn giảm 238', description: 'Mẫu đơn miễn giảm', icon: 'file-text', color: '#7C3AED', bgColor: '#F3E8FF' },
    { id: '4', title: 'Hóa đơn tiền phòng', description: 'Hóa đơn hàng tháng', icon: 'dollar-sign', color: '#F59E0B', bgColor: '#FFFBEB' },
    { id: '5', title: 'Biên lai thu tiền', description: 'Biên lai thanh toán', icon: 'receipt', color: '#EA580C', bgColor: '#FFF7ED' },
    { id: '6', title: 'Hợp đồng lưu trú', description: 'Hợp đồng ở KTX', icon: 'file-edit', color: '#DC2626', bgColor: '#FEF2F2' },
  ];

  onClick(doc: PrintDocument) {
    console.log('Open form:', doc.title);
  }
}
