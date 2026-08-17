import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { LucideIconComponent } from '../../components/lucide-icon/lucide-icon.component';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  standalone: true,
  imports: [FormsModule, PageHeaderComponent, LucideIconComponent],
})
export class ChecklistPage {
  note = '';
  message = '';

  items = [
    { task: 'Kiểm tra an ninh toàn bộ KTX', time: '07:00', done: true },
    { task: 'Cập nhật check-in/out trong đêm', time: '07:15', done: true },
    { task: 'Kiểm tra điện nước các phòng', time: '08:00', done: false },
    { task: 'Xử lý phản hồi từ sinh viên', time: '09:00', done: false },
    { task: 'Báo cáo tình hình cho quản lý', time: '14:30', done: false },
  ];

  get completed() {
    return this.items.filter(item => item.done).length;
  }

  toggle(item: { done: boolean }) {
    item.done = !item.done;
  }

  saveNote() {
    this.message = 'Đã lưu ghi chú ca trực';
    window.setTimeout(() => this.message = '', 1800);
  }
}
