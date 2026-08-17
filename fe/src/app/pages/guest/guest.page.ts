import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { LucideIconComponent } from '../../components/lucide-icon/lucide-icon.component';

type GuestType = 'student' | 'visitor' | 'trainee';

type GuestRow = {
  id: number;
  name: string;
  cccd: string;
  phone: string;
  room: string;
  bed: string;
  type: GuestType;
  entryDate: string;
  debt: string;
  status: string;
};

@Component({
  selector: 'app-guest',
  templateUrl: './guest.page.html',
  standalone: true,
  imports: [FormsModule, PageHeaderComponent, LucideIconComponent],
})
export class GuestPage {
  searchTerm = '';
  selectedGuest: GuestRow | null = null;
  editMode = false;
  message = '';

  stats = [
    { label: 'Tổng khách', value: '342', tone: 'default' },
    { label: 'Sinh viên', value: '280', tone: 'blue' },
    { label: 'Khách vãng lai', value: '45', tone: 'purple' },
    { label: 'Học viên lái xe', value: '17', tone: 'orange' },
  ];

  guests: GuestRow[] = [
    { id: 1, name: 'Nguyễn Văn A', cccd: '079123456789', phone: '0901234567', room: 'A301', bed: 'G3', type: 'student', entryDate: '01/03/2026', debt: 'Không nợ', status: 'Đang ở' },
    { id: 2, name: 'Trần Thị B', cccd: '079987654321', phone: '0909876543', room: 'B205', bed: 'G1', type: 'visitor', entryDate: '05/03/2026', debt: '500.000đ', status: 'Đang ở' },
    { id: 3, name: 'Lê Văn C', cccd: '079555666777', phone: '0912345678', room: 'C108', bed: 'G5', type: 'trainee', entryDate: '10/03/2026', debt: 'Không nợ', status: 'Đang ở' },
    { id: 4, name: 'Phạm Thị D', cccd: '079111222333', phone: '0923456789', room: 'A201', bed: 'G2', type: 'student', entryDate: '01/02/2026', debt: '850.000đ', status: 'Đang ở' },
    { id: 5, name: 'Hoàng Văn E', cccd: '079444555666', phone: '0934567890', room: 'B305', bed: 'G4', type: 'student', entryDate: '15/03/2026', debt: 'Không nợ', status: 'Đang ở' },
  ];

  get filteredGuests() {
    const q = this.searchTerm.trim().toLowerCase();
    if (!q) return this.guests;
    return this.guests.filter(guest =>
      [guest.name, guest.cccd, guest.phone, guest.room, guest.bed].some(value => value.toLowerCase().includes(q))
    );
  }

  openDetail(guest: GuestRow) {
    this.selectedGuest = { ...guest };
    this.editMode = false;
  }

  saveEdit() {
    if (!this.selectedGuest) return;
    this.guests = this.guests.map(guest => guest.id === this.selectedGuest?.id ? { ...this.selectedGuest } : guest);
    this.editMode = false;
    this.showMessage('Đã lưu thông tin');
  }

  closePanel() {
    this.selectedGuest = null;
    this.editMode = false;
  }

  typeLabel(type: GuestType) {
    return { student: 'Sinh viên', visitor: 'Khách', trainee: 'HV lái xe' }[type];
  }

  typeClass(type: GuestType) {
    return { student: 'bg-blue-100 text-blue-700', visitor: 'bg-purple-100 text-purple-700', trainee: 'bg-orange-100 text-orange-700' }[type];
  }

  private showMessage(text: string) {
    this.message = text;
    window.setTimeout(() => this.message = '', 1800);
  }
}
