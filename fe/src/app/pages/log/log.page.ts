import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/log.service';
import { LogEntry, LogStats, LogType } from '../../models/log.model';
import { LucideIconComponent } from '../../components/lucide-icon/lucide-icon.component';

@Component({
  selector: 'app-log',
  templateUrl: './log.page.html',
  standalone: true,
  imports: [LucideIconComponent],
})
export class LogPage implements OnInit {
  stats!: LogStats;
  entries: LogEntry[] = [];
  filterType: LogType = 'all';
  searchTerm = '';
  message = '';

  constructor(private logService: LogService) {}

  ngOnInit() {
    this.logService.getStats().subscribe(s => this.stats = s);
    this.loadEntries();
  }

  loadEntries() {
    this.logService.getEntries(this.filterType, this.searchTerm).subscribe(e => this.entries = e);
  }

  onSearch(val: string) {
    this.searchTerm = val;
    this.loadEntries();
  }

  setFilter(type: LogType) {
    this.filterType = type;
    this.loadEntries();
  }

  onFilterSelect(value: string) {
    this.setFilter(value as LogType);
  }

  exportReport() {
    this.logService.exportCsv(this.filterType, this.searchTerm);
    this.showMessage('Đã xuất báo cáo nhật ký.');
  }

  private showMessage(text: string) {
    this.message = text;
    window.setTimeout(() => {
      if (this.message === text) this.message = '';
    }, 3000);
  }

  getTypeBadge(type: string): string {
    const map: Record<string, string> = { checkin: 'bg-[#020617] text-white', checkout: 'bg-[#DC143C] text-white', qr: 'bg-purple-100 text-purple-700' };
    return map[type] || '';
  }

  getTypeLabel(type: string): string {
    const map: Record<string, string> = { checkin: 'Check-in', checkout: 'Check-out', qr: 'QR' };
    return map[type] || type;
  }
}
