import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { LucideIconComponent } from '../../components/lucide-icon/lucide-icon.component';

type ProfileStatus = 'pending' | 'approved' | 'rejected';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  standalone: true,
  imports: [PageHeaderComponent, LucideIconComponent],
})
export class ProfilePage {
  activeFilter = 'all';
  message = '';

  stats = [
    { label: 'Chờ duyệt', value: '2', icon: 'clock', color: '#B45309', bg: '#FEFCE8', border: '#FDE047' },
    { label: 'Đã duyệt', value: '2', icon: 'circle-check', color: '#059669', bg: '#F0FDF4', border: '#BBF7D0' },
    { label: 'Từ chối', value: '1', icon: 'circle-x', color: '#DC2626', bg: '#FEF2F2', border: '#FECACA' },
    { label: 'Tổng hồ sơ', value: '5', icon: 'file-text', color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE' },
  ];

  filters = [
    { key: 'all', label: 'Tất cả (5)' },
    { key: 'pending', label: 'Chờ duyệt (2)' },
    { key: 'approved', label: 'Đã duyệt (2)' },
    { key: 'rejected', label: 'Từ chối (1)' },
  ];

  profiles = [
    { code: 'SV001', name: 'Nguyễn Văn A', room: 'A301', type: 'Miễn giảm', date: '20/03/2026', docs: '3 file', status: 'pending' as ProfileStatus },
    { code: 'SV002', name: 'Trần Thị B', room: 'B205', type: 'Xác nhận', date: '19/03/2026', docs: '2 file', status: 'pending' as ProfileStatus },
    { code: 'SV003', name: 'Lê Văn C', room: 'C108', type: 'Miễn giảm', date: '18/03/2026', docs: '4 file', status: 'approved' as ProfileStatus },
    { code: 'SV004', name: 'Phạm Thị D', room: 'A201', type: 'Xác nhận', date: '17/03/2026', docs: '2 file', status: 'approved' as ProfileStatus },
    { code: 'SV005', name: 'Hoàng Văn E', room: 'B108', type: 'Miễn giảm', date: '16/03/2026', docs: '3 file', status: 'rejected' as ProfileStatus },
  ];

  get filteredProfiles() {
    return this.activeFilter === 'all' ? this.profiles : this.profiles.filter(item => item.status === this.activeFilter);
  }

  statusLabel(status: ProfileStatus) {
    return { pending: 'Chờ duyệt', approved: 'Đã duyệt', rejected: 'Từ chối' }[status];
  }

  statusClass(status: ProfileStatus) {
    return { pending: 'bg-gray-100 text-slate-900', approved: 'bg-[#020214] text-white', rejected: 'bg-rose-600 text-white' }[status];
  }

  typeClass(type: string) {
    return type === 'Miễn giảm' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700';
  }

  show(text: string) {
    this.message = text;
    window.setTimeout(() => this.message = '', 1800);
  }
}
