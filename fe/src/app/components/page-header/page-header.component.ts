import { Component, input, output } from '@angular/core';
import { LucideIconComponent } from '../lucide-icon/lucide-icon.component';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  standalone: true,
  imports: [LucideIconComponent],
})
export class PageHeaderComponent {
  title = input.required<string>();
  description = input<string>('');
  showCheckin = input(true);
  showCheckout = input(true);
  showQR = input(true);

  checkinClick = output<void>();
  checkoutClick = output<void>();
  qrClick = output<void>();
}
