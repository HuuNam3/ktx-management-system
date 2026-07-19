import { Component, input } from '@angular/core';
import { Room } from '../../models/room.model';
import { LucideIconComponent } from '../lucide-icon/lucide-icon.component';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss'],
  standalone: true,
  imports: [LucideIconComponent],
})
export class RoomCardComponent {
  room = input.required<Room>();

  get statusLabel(): string {
    const map: Record<string, string> = { empty: 'Còn trống', partial: 'Còn chỗ', full: 'Đầy', maintenance: 'Bảo trì' };
    return map[this.room().status] || this.room().status;
  }

  get statusIcon(): string {
    const map: Record<string, string> = { empty: 'check', partial: 'minus', full: 'x', maintenance: 'settings' };
    return map[this.room().status] || '';
  }
}
