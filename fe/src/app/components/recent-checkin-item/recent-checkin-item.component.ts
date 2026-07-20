import { Component, input } from '@angular/core';
import { StatusTagComponent } from '../status-tag/status-tag.component';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline, personSharp } from 'ionicons/icons';

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
  imports: [StatusTagComponent, IonIcon],
})
export class RecentCheckinItemComponent {
  item = input.required<CheckinItem>();

  constructor() {
    addIcons({ personOutline, personSharp });
  }
}
