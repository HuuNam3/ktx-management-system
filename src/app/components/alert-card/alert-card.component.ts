import { Component, input } from '@angular/core';

export interface AlertEntry {
  id: number;
  type: 'danger' | 'warning' | 'info';
  title: string;
  time: string;
}

@Component({
  selector: 'app-alert-card',
  templateUrl: './alert-card.component.html',
  styleUrls: ['./alert-card.component.scss'],
  standalone: true,
})
export class AlertCardComponent {
  alerts = input.required<AlertEntry[]>();
  title = input('Cảnh báo');

  getTypeIcon(type: string): string {
    const map: Record<string, string> = { danger: '⚡', warning: '⚠', info: 'ℹ' };
    return map[type] || '●';
  }
}
