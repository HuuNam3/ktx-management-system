import { Component, input } from '@angular/core';

@Component({
  selector: 'app-statistic-card',
  templateUrl: './statistic-card.component.html',
  styleUrls: ['./statistic-card.component.scss'],
  standalone: true,
})
export class StatisticCardComponent {
  label = input.required<string>();
  value = input.required<string | null>();
  icon = input.required<string>();
  subtitle = input<string>('');
  color = input<string>('var(--primary)');
  bgColor = input<string>('var(--primary-light)');
}
