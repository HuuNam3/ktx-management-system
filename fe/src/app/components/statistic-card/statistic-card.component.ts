import { Component, input } from '@angular/core';
import { LucideIconComponent } from '../lucide-icon/lucide-icon.component';

@Component({
  selector: 'app-statistic-card',
  templateUrl: './statistic-card.component.html',
  standalone: true,
  imports: [LucideIconComponent],
})
export class StatisticCardComponent {
  label = input.required<string>();
  value = input.required<string | null>();
  icon = input<string>('');
  lucideIcon = input<string>('');
  subtitle = input<string>('');
  subtitleIcon = input<string>('');
  subtitleIconColor = input<string>('currentColor');
  color = input<string>('var(--primary)');
  bgColor = input<string>('var(--primary-light)');
}
