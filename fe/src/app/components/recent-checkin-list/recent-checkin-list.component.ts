import { Component, input } from '@angular/core';
import { RecentCheckinItemComponent, CheckinItem } from '../recent-checkin-item/recent-checkin-item.component';

@Component({
  selector: 'app-recent-checkin-list',
  templateUrl: './recent-checkin-list.component.html',
  standalone: true,
  imports: [RecentCheckinItemComponent],
})
export class RecentCheckinListComponent {
  items = input<CheckinItem[]>([]);
}
