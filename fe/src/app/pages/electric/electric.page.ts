import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { StatisticCardComponent } from '../../components/statistic-card/statistic-card.component';
import { LucideIconComponent } from '../../components/lucide-icon/lucide-icon.component';
import { ElectricService } from '../../services/electric.service';
import { ElectricWaterStats, ElectricWaterRecord } from '../../models/electric.model';

@Component({
  selector: 'app-electric',
  templateUrl: './electric.page.html',
  styleUrls: ['./electric.page.scss'],
  standalone: true,
  imports: [PageHeaderComponent, StatisticCardComponent, LucideIconComponent],
})
export class ElectricPage implements OnInit {
  stats!: ElectricWaterStats;
  records: ElectricWaterRecord[] = [];

  constructor(private electricService: ElectricService) {}

  ngOnInit() {
    this.electricService.getStats().subscribe(s => this.stats = s);
    this.electricService.getRecords().subscribe(r => this.records = r);
  }

  formatCurrency(v: number): string {
    return v.toLocaleString('vi-VN') + 'đ';
  }

  getStatusLabel(s: string): string {
    return s === 'da-thu' ? 'Đã thu' : 'Chưa thu';
  }

  getStatusBadge(s: string): string {
    return s === 'da-thu' ? 'badge-success' : 'badge-pending';
  }

  onInput() { console.log('Nhập chỉ số'); }
  onExport() { console.log('Xuất báo cáo'); }
}
