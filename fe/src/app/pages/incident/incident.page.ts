import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { StatisticCardComponent } from '../../components/statistic-card/statistic-card.component';
import { LucideIconComponent } from '../../components/lucide-icon/lucide-icon.component';
import { IncidentService } from '../../services/incident.service';
import { IncidentStats, Incident } from '../../models/incident.model';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.page.html',
  styleUrls: ['./incident.page.scss'],
  standalone: true,
  imports: [DecimalPipe, PageHeaderComponent, StatisticCardComponent, LucideIconComponent],
})
export class IncidentPage implements OnInit {
  stats!: IncidentStats;
  incidents: Incident[] = [];

  constructor(private incidentService: IncidentService) {}

  ngOnInit() {
    this.incidentService.getStats().subscribe(s => this.stats = s);
    this.incidentService.getIncidents().subscribe(i => this.incidents = i);
  }

  formatCurrency(v: number): string {
    return v ? v.toLocaleString('vi-VN') + 'đ' : '—';
  }

  getStatusLabel(s: string): string {
    return s === 'chua-xu-ly' ? 'Chưa xử lý' : 'Đã xử lý';
  }

  getStatusBadge(s: string): string {
    return s === 'chua-xu-ly' ? 'badge-pending' : 'badge-success';
  }

  onReport() { console.log('Báo cáo sự cố'); }
  onFix(i: Incident) { console.log('Xử lý', i); }
  onView(i: Incident) { console.log('Xem', i); }
}
