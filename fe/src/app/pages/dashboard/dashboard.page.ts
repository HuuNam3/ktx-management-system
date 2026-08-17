import { Component } from '@angular/core';
import { LucideIconComponent } from '../../components/lucide-icon/lucide-icon.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  standalone: true,
  imports: [LucideIconComponent],
})
export class DashboardPage {
  activities = [
    { time: '09:15', type: 'Check-in', tone: 'green', text: 'Nguyễn Văn B • Phòng A301' },
    { time: '09:02', type: 'Thanh toán', tone: 'blue', text: 'Trần Thị C • 850K' },
    { time: '08:45', type: 'Check-out', tone: 'red', text: 'Lê Văn D • Phòng B205' },
    { time: '08:30', type: 'Duyệt 238', tone: 'purple', text: 'Phạm Thị E • Approved' },
    { time: '08:15', type: 'Mua vé ăn', tone: 'yellow', text: 'Hoàng Văn F • 500K' },
    { time: '08:00', type: 'Báo sự cố', tone: 'orange', text: 'Võ Thị G • Phòng C108' },
  ];

  alerts = [
    { title: 'Phòng A201 chưa thanh toán tiền tháng 3', time: '2 giờ trước', className: 'border-red-200 bg-red-50 text-red-600' },
    { title: 'Phòng B305 sắp hết hạn hợp đồng', time: '5 giờ trước', className: 'border-yellow-200 bg-yellow-50 text-yellow-600' },
    { title: 'Điện nước phòng C102 vượt mức', time: '1 ngày trước', className: 'border-red-200 bg-red-50 text-red-600' },
    { title: 'Bảo trì thang máy vào 26/03', time: '1 ngày trước', className: 'border-blue-200 bg-blue-50 text-blue-600' },
  ];

  message = '';

  exportReport() {
    this.message = 'Đã xuất báo cáo tổng quan.';
    window.setTimeout(() => {
      if (this.message) this.message = '';
    }, 3000);
  }
}
