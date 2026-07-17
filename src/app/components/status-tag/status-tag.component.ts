import { Component, input } from '@angular/core';

@Component({
  selector: 'app-status-tag',
  templateUrl: './status-tag.component.html',
  styleUrls: ['./status-tag.component.scss'],
  standalone: true,
})
export class StatusTagComponent {
  type = input.required<string>();

  get badgeClass(): string {
    switch (this.type()) {
      case 'sinh-vien': return 'badge-student';
      case 'khach': return 'badge-guest';
      case 'hoc-vien': return 'badge-trainee';
      default: return 'badge-default';
    }
  }

  get label(): string {
    switch (this.type()) {
      case 'sinh-vien': return 'Sinh viên';
      case 'khach': return 'Khách';
      case 'hoc-vien': return 'Học viên';
      default: return this.type();
    }
  }
}
