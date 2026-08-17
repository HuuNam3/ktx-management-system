import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { LucideIconComponent } from '../../components/lucide-icon/lucide-icon.component';

type TicketMode = 'buy' | 'qr';
type TicketKind = 'meal' | 'vehicle';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  standalone: true,
  imports: [FormsModule, PageHeaderComponent, LucideIconComponent],
})
export class TicketPage {
  message = '';
  modalMode: TicketMode | null = null;
  monthRevenue = 45000000;
  ticketForm = {
    kind: 'meal' as TicketKind,
    name: 'Nguyễn Văn A',
    packageName: 'Vé tháng 30 suất',
    meal: 'Bữa trưa',
    amount: 750000,
  };

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

  openBuy() {
    this.modalMode = 'buy';
    this.ticketForm = {
      kind: 'meal',
      name: 'Nguyễn Văn A',
      packageName: 'Vé tháng 30 suất',
      meal: 'Bữa trưa',
      amount: 750000,
    };
  }

  openQr() {
    this.modalMode = 'qr';
    this.ticketForm = {
      kind: 'meal',
      name: 'Trần Thị B',
      packageName: 'Quét QR sử dụng vé ăn',
      meal: 'Bữa trưa',
      amount: 0,
    };
  }

  closeModal() {
    this.modalMode = null;
  }

  confirmTicket() {
    const mode = this.modalMode;
    const time = this.currentTime();
    if (this.ticketForm.kind === 'meal') {
      this.mealTransactions = [
        {
          name: this.ticketForm.name,
          detail: this.ticketForm.packageName,
          amount: this.ticketForm.amount ? this.formatMoney(this.ticketForm.amount) : 'Đã sử dụng',
          time,
        },
        ...this.mealTransactions,
      ].slice(0, 5);
      this.incrementStat('Vé ăn đang dùng', this.modalMode === 'buy' ? 1 : 0);
      this.incrementMeal(this.ticketForm.meal, 1);
    } else {
      this.vehicleTransactions = [
        {
          name: this.ticketForm.name,
          detail: this.ticketForm.packageName,
          amount: this.formatMoney(this.ticketForm.amount),
          time,
        },
        ...this.vehicleTransactions,
      ].slice(0, 5);
      this.incrementStat('Vé xe đang dùng', 1);
    }

    if (this.ticketForm.amount > 0) {
      this.monthRevenue += this.ticketForm.amount;
      this.stats[2].value = this.formatCompactMoney(this.monthRevenue);
    }

    this.closeModal();
    this.show(mode === 'qr' ? 'Đã ghi nhận quét QR.' : 'Đã tạo giao dịch vé mới.');
  }

  private incrementStat(label: string, amount: number) {
    if (!amount) return;
    const stat = this.stats.find(item => item.label === label);
    if (!stat) return;
    stat.value = String(Number(stat.value.replace(/\D/g, '')) + amount);
  }

  private incrementMeal(label: string, amount: number) {
    const meal = this.meals.find(item => item.label === label);
    if (!meal) return;
    const value = Number(meal.value.replace(/\D/g, '')) + amount;
    meal.value = `${value} suất`;
    this.stats[3].value = String(this.meals.reduce((sum, item) => sum + Number(item.value.replace(/\D/g, '')), 0));
  }

  private currentTime() {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  }

  private formatMoney(value: number) {
    return `${value.toLocaleString('vi-VN')}đ`;
  }

  private formatCompactMoney(value: number) {
    return `${Number((value / 1000000).toFixed(1))}M`;
  }

  show(text: string) {
    this.message = text;
    window.setTimeout(() => this.message = '', 1800);
  }
}
