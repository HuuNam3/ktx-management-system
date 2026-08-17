import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { LucideIconComponent } from '../../components/lucide-icon/lucide-icon.component';

type ProfileStatus = 'pending' | 'approved' | 'rejected';

interface ProfileRow {
  code: string;
  name: string;
  room: string;
  type: string;
  date: string;
  docs: string;
  status: ProfileStatus;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  standalone: true,
  imports: [FormsModule, PageHeaderComponent, LucideIconComponent],
})
export class ProfilePage {
  activeFilter = 'all';
  message = '';
  selectedProfile: ProfileRow | null = null;
  reviewNote = '';

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

  profiles: ProfileRow[] = [
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

  openProfile(profile: ProfileRow) {
    this.selectedProfile = { ...profile };
    this.reviewNote = profile.status === 'pending' ? '' : `Hồ sơ đã ${this.statusLabel(profile.status).toLowerCase()}.`;
  }

  closeProfile() {
    this.selectedProfile = null;
    this.reviewNote = '';
  }

  approveSelected() {
    this.updateSelectedStatus('approved');
  }

  rejectSelected() {
    this.updateSelectedStatus('rejected');
  }

  private updateSelectedStatus(status: ProfileStatus) {
    if (!this.selectedProfile) return;
    this.profiles = this.profiles.map(profile =>
      profile.code === this.selectedProfile?.code ? { ...profile, status } : profile
    );
    this.selectedProfile = { ...this.selectedProfile, status };
    this.recalc();
    this.show(status === 'approved' ? 'Đã duyệt hồ sơ.' : 'Đã từ chối hồ sơ.');
  }

  private recalc() {
    const pending = this.profiles.filter(profile => profile.status === 'pending').length;
    const approved = this.profiles.filter(profile => profile.status === 'approved').length;
    const rejected = this.profiles.filter(profile => profile.status === 'rejected').length;
    this.stats[0].value = String(pending);
    this.stats[1].value = String(approved);
    this.stats[2].value = String(rejected);
    this.stats[3].value = String(this.profiles.length);
    this.filters = [
      { key: 'all', label: `Tất cả (${this.profiles.length})` },
      { key: 'pending', label: `Chờ duyệt (${pending})` },
      { key: 'approved', label: `Đã duyệt (${approved})` },
      { key: 'rejected', label: `Từ chối (${rejected})` },
    ];
  }

  show(text: string) {
    this.message = text;
    window.setTimeout(() => this.message = '', 1800);
  }
}
