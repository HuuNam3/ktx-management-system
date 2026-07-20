import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { StatisticCardComponent } from '../../components/statistic-card/statistic-card.component';
import { LucideIconComponent } from '../../components/lucide-icon/lucide-icon.component';
import { ContractorService } from '../../services/contractor.service';
import { ContractorStats, ContractorRecord } from '../../models/contractor.model';

@Component({
  selector: 'app-contractor',
  templateUrl: './contractor.page.html',
  standalone: true,
  imports: [DecimalPipe, PageHeaderComponent, StatisticCardComponent, LucideIconComponent],
})
export class ContractorPage implements OnInit {
  stats!: ContractorStats;
  records: ContractorRecord[] = [];

  constructor(private contractorService: ContractorService) {}

  ngOnInit() {
    this.contractorService.getStats().subscribe(s => this.stats = s);
    this.contractorService.getRecords().subscribe(r => this.records = r);
  }

  getStatusLabel(s: string): string {
    return s === 'dang-lam' ? 'Đang làm' : 'Hoàn thành';
  }

  getStatusBadge(s: string): string {
    return s === 'dang-lam' ? 'badge-pending' : 'badge-success';
  }

  onCheckin() { console.log('Check-in thợ'); }
}
