import { Component, input } from '@angular/core';
import { StatusTagComponent } from '../status-tag/status-tag.component';
import { LucideIconComponent } from '../lucide-icon/lucide-icon.component';

export interface CheckinItem {
  name: string;
  cccd: string;
  room: string;
  bed: string;
  type: string;
  time: string;
}

@Component({
  selector: 'app-recent-checkin-item',
  templateUrl: './recent-checkin-item.component.html',
  standalone: true,
  imports: [StatusTagComponent, LucideIconComponent],
})
export class RecentCheckinItemComponent {
  item = input.required<CheckinItem>();
}
