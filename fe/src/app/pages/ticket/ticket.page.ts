import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { LucideIconComponent } from '../../components/lucide-icon/lucide-icon.component';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  standalone: true,
  imports: [PageHeaderComponent, LucideIconComponent],
})
export class TicketPage {
  message = '';

  stats = [
    { label: 'Vé ăn đang dùng', value: '285', icon: 'utensils', color: '#EA580C', bg: '#FFF7ED', border: '#FDBA74' },
    { label: 'Vé xe đang dùng', value: '198', icon: 'car', color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE' },
    { label: 'Doanh thu tháng này', value: '45M', icon: 'bar-chart-3', color: '#059669', bg: '#F0FDF4', border: '#BBF7D0' },
    { label: 'Suất ăn hôm nay', value: '456', icon: 'ticket', color: '#9333EA', bg: '#FAF5FF', border: '#E9D5FF' },
  ];

  mealTransactions = [
    { name: 'Nguyễn Văn A', detail: 'Vé tháng 30 suất', amount: '750,000đ', time: '09:15' },
    { name: 'Trần Thị B', detail: 'Vé tháng 30 suất', amount: '750,000đ', time: '08:45' },
    { name: 'Lê Văn C', detail: 'Vé 2 tháng 60 suất', amount: '1,500,000đ', time: '08:20' },
  ];

  vehicleTransactions = [
    { name: 'Phạm Thị D', detail: 'Vé xe máy 1 tháng', amount: '50,000đ', time: '10:20' },
    { name: 'Hoàng Văn E', detail: 'Vé xe máy 3 tháng', amount: '140,000đ', time: '09:30' },
    { name: 'Võ Thị F', detail: 'Vé xe đạp 1 tháng', amount: '30,000đ', time: '08:50' },
  ];

  meals = [
    { label: 'Bữa sáng', value: '142 suất', color: 'text-yellow-700', box: 'border-yellow-300 bg-yellow-50' },
    { label: 'Bữa trưa', value: '215 suất', color: 'text-orange-700', box: 'border-orange-300 bg-orange-50' },
    { label: 'Bữa tối', value: '99 suất', color: 'text-purple-700', box: 'border-purple-300 bg-purple-50' },
  ];

  show(text: string) {
    this.message = text;
    window.setTimeout(() => this.message = '', 1800);
  }
}
