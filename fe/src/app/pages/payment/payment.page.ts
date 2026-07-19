import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { StatisticCardComponent } from '../../components/statistic-card/statistic-card.component';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { LucideIconComponent } from '../../components/lucide-icon/lucide-icon.component';
import { PaymentService } from '../../services/payment.service';
import { PaymentStats, PaymentRecord, PaymentStatus, PaymentTab } from '../../models/payment.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
  standalone: true,
  imports: [DecimalPipe, PageHeaderComponent, StatisticCardComponent, SearchInputComponent, LucideIconComponent],
})
export class PaymentPage implements OnInit {
  stats!: PaymentStats;
  records: PaymentRecord[] = [];
  filtered: PaymentRecord[] = [];
  activeTab: PaymentTab = 'cong-no';
  statusFilter: string = 'all';

  tabs: { key: PaymentTab; label: string }[] = [
    { key: 'cong-no', label: 'Công nợ' },
    { key: 'da-thanh-toan', label: 'Đã thanh toán' },
    { key: 'lich-su', label: 'Lịch sử' },
    { key: 'doi-soat-ca', label: 'Đối soát ca' },
  ];

  statusOptions = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Chưa đóng', value: 'chua-dong' },
    { label: 'Đã đóng', value: 'da-dong' },
    { label: 'Quá hạn', value: 'qua-han' },
  ];

  constructor(private paymentService: PaymentService) {}

  ngOnInit() {
    this.paymentService.getStats().subscribe(s => this.stats = s);
    this.paymentService.getRecords().subscribe(r => {
      this.records = r;
      this.applyFilters();
    });
  }

  setTab(tab: PaymentTab) {
    this.activeTab = tab;
    this.applyFilters();
  }

  onSearch(val: string) {
    if (!val.trim()) { this.applyFilters(); return; }
    const q = val.toLowerCase();
    this.filtered = this.filtered.filter(x =>
      x.customer.toLowerCase().includes(q) || x.room.toLowerCase().includes(q)
    );
  }

  onStatusFilter(val: string) {
    this.statusFilter = val;
    this.applyFilters();
  }

  private applyFilters() {
    let base = [...this.records];
    if (this.activeTab === 'cong-no') base = base.filter(r => r.status === 'chua-dong' || r.status === 'qua-han');
    else if (this.activeTab === 'da-thanh-toan') base = base.filter(r => r.status === 'da-dong');
    if (this.statusFilter !== 'all') base = base.filter(r => r.status === this.statusFilter);
    this.filtered = base;
  }

  getStatusLabel(s: string): string {
    const map: Record<string, string> = { 'chua-dong': 'Chưa đóng', 'da-dong': 'Đã đóng', 'qua-han': 'Quá hạn' };
    return map[s] || s;
  }

  getStatusBadge(s: string): string {
    const map: Record<string, string> = { 'chua-dong': 'badge-pending', 'da-dong': 'badge-success', 'qua-han': 'badge-danger' };
    return map[s] || '';
  }

  formatCurrency(v: number): string {
    return v.toLocaleString('vi-VN') + 'đ';
  }
}
