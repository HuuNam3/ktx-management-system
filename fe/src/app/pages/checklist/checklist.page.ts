import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { StatisticCardComponent } from '../../components/statistic-card/statistic-card.component';
import { LucideIconComponent } from '../../components/lucide-icon/lucide-icon.component';
import { ChecklistService } from '../../services/checklist.service';
import { ChecklistStats, ChecklistItem } from '../../models/checklist.model';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  standalone: true,
  imports: [DecimalPipe, PageHeaderComponent, StatisticCardComponent, LucideIconComponent],
})
export class ChecklistPage implements OnInit {
  stats!: ChecklistStats;
  items: ChecklistItem[] = [];

  constructor(private checklistService: ChecklistService) {}

  ngOnInit() {
    this.checklistService.getStats().subscribe(s => this.stats = s);
    this.checklistService.getItems().subscribe(i => this.items = i);
  }

  toggle(item: ChecklistItem) {
    item.status = item.status === 'done' ? 'pending' : 'done';
    this.recalcStats();
  }

  private recalcStats() {
    const total = this.items.length;
    const done = this.items.filter(i => i.status === 'done').length;
    this.stats = { ...this.stats, completed: done, remaining: total - done };
  }

  getStatusLabel(s: string): string {
    return s === 'done' ? 'Hoàn thành' : 'Chưa hoàn thành';
  }

  getStatusBadge(s: string): string {
    return s === 'done' ? 'badge-success' : 'badge-pending';
  }
}
