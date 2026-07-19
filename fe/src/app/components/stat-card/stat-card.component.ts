import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss'],
  standalone: true,
})
export class StatCardComponent {
  label = input.required<string>();
  value = input.required<string | null>();
  icon = input.required<string>();
  color = input<string>('var(--primary)');
  bgColor = input<string>('var(--primary-light)');
}
