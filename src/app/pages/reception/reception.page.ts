import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { SearchCardComponent } from '../../components/search-card/search-card.component';
import { StatCardComponent } from '../../components/stat-card/stat-card.component';
import { RecentCheckinListComponent } from '../../components/recent-checkin-list/recent-checkin-list.component';
import { ReceptionService } from '../../services/reception.service';
import { ReceptionStats, CheckinRecord } from '../../models/reception.model';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.page.html',
  styleUrls: ['./reception.page.scss'],
  standalone: true,
  imports: [
    DecimalPipe,
    PageHeaderComponent,
    SearchCardComponent,
    StatCardComponent,
    RecentCheckinListComponent,
  ],
})
export class ReceptionPage implements OnInit {
  stats!: ReceptionStats;
  checkins: CheckinRecord[] = [];

  constructor(private receptionService: ReceptionService) {}

  ngOnInit() {
    this.receptionService.getStats().subscribe(s => this.stats = s);
    this.receptionService.getRecentCheckins().subscribe(c => this.checkins = c);
  }

  onCheckin() { console.log('Check-in clicked'); }
  onCheckout() { console.log('Check-out clicked'); }
  onQr() { console.log('QR clicked'); }
}
