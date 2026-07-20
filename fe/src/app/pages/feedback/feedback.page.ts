import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { StatisticCardComponent } from '../../components/statistic-card/statistic-card.component';
import { LucideIconComponent } from '../../components/lucide-icon/lucide-icon.component';
import { FeedbackService } from '../../services/feedback.service';
import { FeedbackStats, Feedback } from '../../models/feedback.model';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  standalone: true,
  imports: [DecimalPipe, PageHeaderComponent, StatisticCardComponent, LucideIconComponent],
})
export class FeedbackPage implements OnInit {
  stats!: FeedbackStats;
  feedbacks: Feedback[] = [];

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit() {
    this.feedbackService.getStats().subscribe(s => this.stats = s);
    this.feedbackService.getFeedbacks().subscribe(f => this.feedbacks = f);
  }

  getPriorityLabel(p: string): string {
    const map: Record<string, string> = { 'cao': 'Cao', 'trung-binh': 'Trung bình', 'thap': 'Thấp' };
    return map[p] || p;
  }

  getPriorityBadge(p: string): string {
    const map: Record<string, string> = { 'cao': 'badge-danger', 'trung-binh': 'badge-warning', 'thap': 'badge-success' };
    return map[p] || '';
  }

  getStatusLabel(s: string): string {
    const map: Record<string, string> = { 'cho-xu-ly': 'Chờ xử lý', 'dang-xu-ly': 'Đang xử lý', 'da-xu-ly': 'Đã xử lý' };
    return map[s] || s;
  }

  getStatusBadge(s: string): string {
    const map: Record<string, string> = { 'cho-xu-ly': 'badge-pending', 'dang-xu-ly': 'badge-warning', 'da-xu-ly': 'badge-success' };
    return map[s] || '';
  }
}
