import { Component, input } from '@angular/core';

export interface TimelineEntry {
  id: number;
  type: string;
  title: string;
  description: string;
  time: string;
}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  standalone: true,
})
export class TimelineComponent {
  items = input.required<TimelineEntry[]>();
  title = input('Hoạt động gần đây');

  getTypeClass(type: string): string {
    const map: Record<string, string> = {
      checkin: 'type-checkin',
      checkout: 'type-checkout',
      payment: 'type-payment',
      register: 'type-register',
    };
    return map[type] || '';
  }

  getTypeLabel(type: string): string {
    const map: Record<string, string> = {
      checkin: 'Check-in',
      checkout: 'Check-out',
      payment: 'Thanh toán',
      register: 'Đăng ký',
    };
    return map[type] || type;
  }
}
