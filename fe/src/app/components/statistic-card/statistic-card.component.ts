import { Component, input } from '@angular/core';
import { LucideIconComponent } from '../lucide-icon/lucide-icon.component';

@Component({
  selector: 'app-statistic-card',
  templateUrl: './statistic-card.component.html',
  styleUrls: ['./statistic-card.component.scss'],
  standalone: true,
  imports: [LucideIconComponent],
})
export class StatisticCardComponent {
  label = input.required<string>();
  value = input.required<string | null>();
  icon = input<string>('');
  lucideIcon = input<string>('');
  subtitle = input<string>('');
  color = input<string>('var(--primary)');
  bgColor = input<string>('var(--primary-light)');
}
