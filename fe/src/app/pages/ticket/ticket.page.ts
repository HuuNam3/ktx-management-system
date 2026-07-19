import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { StatisticCardComponent } from '../../components/statistic-card/statistic-card.component';
import { TicketItemComponent, TicketItemData } from '../../components/ticket-item/ticket-item.component';
import { LucideIconComponent } from '../../components/lucide-icon/lucide-icon.component';
import { TicketService } from '../../services/ticket.service';
import { TicketStats, TicketTransaction } from '../../models/ticket.model';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
  standalone: true,
  imports: [DecimalPipe, PageHeaderComponent, StatisticCardComponent, TicketItemComponent, LucideIconComponent],
})
export class TicketPage implements OnInit {
  stats!: TicketStats;
  mealTransactions: TicketItemData[] = [];
  vehicleTransactions: TicketItemData[] = [];

  constructor(private ticketService: TicketService) {}

  onQr() { console.log('QR clicked'); }
  onBuy() { console.log('Mua vé clicked'); }

  ngOnInit() {
    this.ticketService.getStats().subscribe(s => this.stats = s);
    this.ticketService.getTransactions().subscribe(t => {
      this.mealTransactions = t.filter(x => x.type === 'meal');
      this.vehicleTransactions = t.filter(x => x.type === 'vehicle');
    });
  }

  formatCurrency(v: number): string {
    return v.toLocaleString('vi-VN') + 'đ';
  }
}
