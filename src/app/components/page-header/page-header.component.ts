import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  standalone: true,
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
