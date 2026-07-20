import { Component, input } from '@angular/core';
import { LucideIconComponent } from '../lucide-icon/lucide-icon.component';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  standalone: true,
  imports: [LucideIconComponent],
})
export class StatCardComponent {
  label = input.required<string>();
  value = input.required<string | null>();
  icon = input<string>('');
  lucideIcon = input<string>('');
  color = input<string>('var(--primary)');
  bgColor = input<string>('var(--primary-light)');
}
