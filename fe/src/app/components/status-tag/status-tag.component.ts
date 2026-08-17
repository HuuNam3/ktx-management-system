import { Component, input } from '@angular/core';

@Component({
  selector: 'app-status-tag',
  templateUrl: './status-tag.component.html',
  standalone: true,
})
export class StatusTagComponent {
  type = input.required<string>();

  get badgeClass(): string {
    const base = 'inline-flex items-center px-3 py-1 rounded-md text-[14px] font-bold whitespace-nowrap';
    switch (this.type()) {
      case 'sinh-vien': return `${base} bg-[#E0F2FE] text-[#0284C7]`;
      case 'khach': return `${base} bg-[#F3E8FF] text-[#7C3AED]`;
      case 'hoc-vien': return `${base} bg-[#FFF7ED] text-[#EA580C]`;
      default: return `${base} bg-bg text-text-secondary`;
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
