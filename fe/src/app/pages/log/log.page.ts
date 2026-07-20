import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { StatisticCardComponent } from '../../components/statistic-card/statistic-card.component';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { LogService } from '../../services/log.service';
import { LogEntry, LogStats, LogType } from '../../models/log.model';
import { DecimalPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-log',
  templateUrl: './log.page.html',
  standalone: true,
  imports: [DecimalPipe, NgClass, PageHeaderComponent, StatisticCardComponent, SearchInputComponent],
})
export class LogPage implements OnInit {
  stats!: LogStats;
  entries: LogEntry[] = [];
  filterType: LogType = 'all';

  constructor(private logService: LogService) {}

  ngOnInit() {
    this.logService.getStats().subscribe(s => this.stats = s);
    this.loadEntries();
  }

  loadEntries() {
    this.logService.getEntries(this.filterType).subscribe(e => this.entries = e);
  }

  onSearch(val: string) {
    this.logService.getEntries(this.filterType).subscribe(e => {
      if (!val.trim()) { this.entries = e; return; }
      const q = val.toLowerCase();
      this.entries = e.filter(x =>
        x.fullName.toLowerCase().includes(q) ||
        x.cccd.includes(q) ||
        x.room.toLowerCase().includes(q)
      );
    });
  }

  setFilter(type: LogType) {
    this.filterType = type;
    this.loadEntries();
  }

  getTypeBadge(type: string): string {
    const map: Record<string, string> = { checkin: 'badge-ci', checkout: 'badge-co', qr: 'badge-qr' };
    return map[type] || '';
  }

  getTypeLabel(type: string): string {
    const map: Record<string, string> = { checkin: 'Check-in', checkout: 'Check-out', qr: 'QR' };
    return map[type] || type;
  }
}
