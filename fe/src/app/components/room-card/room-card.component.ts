import { Component, input } from '@angular/core';
import { Room } from '../../models/room.model';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss'],
  standalone: true,
})
export class RoomCardComponent {
  room = input.required<Room>();

  get statusLabel(): string {
    const map: Record<string, string> = { empty: 'Còn trống', partial: 'Còn chỗ', full: 'Đầy', maintenance: 'Bảo trì' };
    return map[this.room().status] || this.room().status;
  }

  get statusIcon(): string {
    const map: Record<string, string> = { empty: '✓', partial: '◐', full: '✕', maintenance: '⚙' };
    return map[this.room().status] || '';
  }
}
