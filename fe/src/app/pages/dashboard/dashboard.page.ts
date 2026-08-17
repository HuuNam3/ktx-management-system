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
    const rows = [
      ['Nhóm', 'Nội dung', 'Giá trị'],
      ['Thống kê', 'Tổng số khách', '342'],
      ['Thống kê', 'Số phòng trống', '28/120'],
      ['Thống kê', 'Doanh thu hôm nay', '12.5M'],
      ['Thống kê', 'Cảnh báo', '8'],
      ...this.activities.map(item => ['Hoạt động', item.type, `${item.time} - ${item.text}`]),
      ...this.alerts.map(item => ['Cảnh báo', item.title, item.time]),
    ];
    const csv = rows.map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `bao-cao-tong-quan-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
    this.message = 'Đã xuất báo cáo tổng quan.';
    window.setTimeout(() => {
      if (this.message) this.message = '';
    }, 3000);
  }
}
