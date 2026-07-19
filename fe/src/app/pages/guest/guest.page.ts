import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { StatisticCardComponent } from '../../components/statistic-card/statistic-card.component';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { LucideIconComponent } from '../../components/lucide-icon/lucide-icon.component';
import { GuestService } from '../../services/guest.service';
import { GuestStats, Guest } from '../../models/guest.model';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.page.html',
  styleUrls: ['./guest.page.scss'],
  standalone: true,
  imports: [DecimalPipe, PageHeaderComponent, StatisticCardComponent, SearchInputComponent, LucideIconComponent],
})
export class GuestPage implements OnInit {
  stats!: GuestStats;
  guests: Guest[] = [];
  filtered: Guest[] = [];

  constructor(private guestService: GuestService) {}

  ngOnInit() {
    this.guestService.getStats().subscribe(s => this.stats = s);
    this.guestService.getGuests().subscribe(g => {
      this.guests = g;
      this.filtered = g;
    });
  }

  onSearch(val: string) {
    if (!val.trim()) { this.filtered = this.guests; return; }
    const q = val.toLowerCase();
    this.filtered = this.guests.filter(x =>
      x.name.toLowerCase().includes(q) ||
      x.cccd.includes(q) ||
      x.phone.includes(q) ||
      x.room.toLowerCase().includes(q)
    );
  }

  getTypeLabel(type: string): string {
    const map: Record<string, string> = { 'sinh-vien': 'Sinh viên', 'khach-vang-lai': 'Khách vãng lai', 'hoc-vien-lai-xe': 'Học viên lái xe' };
    return map[type] || type;
  }

  getTypeBadge(type: string): string {
    const map: Record<string, string> = { 'sinh-vien': 'badge-student', 'khach-vang-lai': 'badge-guest', 'hoc-vien-lai-xe': 'badge-trainee' };
    return map[type] || '';
  }

  getStatusLabel(status: string): string {
    return status === 'dang-o' ? 'Đang ở' : 'Đã trả';
  }

  getStatusBadge(status: string): string {
    return status === 'dang-o' ? 'badge-active' : 'badge-inactive';
  }

  formatCurrency(v: number): string {
    return v ? v.toLocaleString('vi-VN') + 'đ' : '—';
  }
}
