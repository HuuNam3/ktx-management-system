import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { StatisticCardComponent } from '../../components/statistic-card/statistic-card.component';
import { ChartCardComponent } from '../../components/chart-card/chart-card.component';
import { TimelineComponent, TimelineEntry } from '../../components/timeline/timeline.component';
import { AlertCardComponent, AlertEntry } from '../../components/alert-card/alert-card.component';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardStats, RevenueEntry, RoomDistribution, TimelineActivity, Alert } from '../../models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  standalone: true,
  imports: [
    PageHeaderComponent,
    StatisticCardComponent,
    ChartCardComponent,
    TimelineComponent,
    AlertCardComponent,
  ],
})
export class DashboardPage implements OnInit {
  stats!: DashboardStats;
  revenueData: number[] = [];
  revenueLabels: string[] = [];
  distData: number[] = [];
  distLabels: string[] = [];
  distColors: string[] = [];
  timelineItems: TimelineEntry[] = [];
  alertItems: AlertEntry[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.getStats().subscribe(s => this.stats = s);
    this.dashboardService.getRevenueData().subscribe((d: RevenueEntry[]) => {
      this.revenueData = d.map(x => x.value);
      this.revenueLabels = d.map(x => x.date);
    });
    this.dashboardService.getRoomDistribution().subscribe((d: RoomDistribution[]) => {
      this.distData = d.map(x => x.count);
      this.distLabels = d.map(x => x.type);
      this.distColors = d.map(x => x.color);
    });
    this.dashboardService.getTimeline().subscribe((d: TimelineActivity[]) => {
      this.timelineItems = d;
    });
    this.dashboardService.getAlerts().subscribe((d: Alert[]) => {
      this.alertItems = d;
    });
  }

  formatCurrency(v: number): string {
    return (v / 1000).toFixed(0) + 'tr';
  }
}
