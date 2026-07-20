import { Component, input } from '@angular/core';
import { LucideIconComponent } from '../lucide-icon/lucide-icon.component';

export interface TicketItemData {
  id: number;
  type: 'meal' | 'vehicle';
  name: string;
  description: string;
  amount: number;
  time: string;
}

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  standalone: true,
  imports: [LucideIconComponent],
})
export class TicketItemComponent {
  item = input.required<TicketItemData>();
  title = input('Giao dịch vé');

  get formattedAmount(): string {
    return this.item().amount.toLocaleString('vi-VN') + 'đ';
  }

  get icon(): string {
    return this.item().type === 'meal' ? 'utensils-crossed' : 'car';
  }

  get iconBg(): string {
    return this.item().type === 'meal' ? '#F0FDF4' : '#EFF6FF';
  }
}
