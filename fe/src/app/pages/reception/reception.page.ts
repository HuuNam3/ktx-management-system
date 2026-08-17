import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecentCheckinListComponent } from '../../components/recent-checkin-list/recent-checkin-list.component';
import { LucideIconComponent } from '../../components/lucide-icon/lucide-icon.component';
import { ReceptionGuest, ReceptionService } from '../../services/reception.service';
import { ReceptionStats, CheckinRecord } from '../../models/reception.model';
import { LogService } from '../../services/log.service';

type ReceptionAction = 'checkin' | 'checkout' | 'qr';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.page.html',
  standalone: true,
  imports: [
    FormsModule,
    RecentCheckinListComponent,
    LucideIconComponent,
  ],
})
export class ReceptionPage implements OnInit {
  stats: ReceptionStats = { checkinsToday: 0, checkoutsToday: 0, currentOccupants: 0 };
  checkins: CheckinRecord[] = [];
  filteredCheckins: CheckinRecord[] = [];
  guests: ReceptionGuest[] = [];
  searchResults: ReceptionGuest[] = [];
  searchTerm = '';
  selectedGuest: ReceptionGuest | null = null;
  actionMode: ReceptionAction | null = null;
  staffName = 'Lễ tân 1';
  message = '';

  constructor(
    private receptionService: ReceptionService,
    private logService: LogService,
  ) {}

  ngOnInit() {
    this.receptionService.getStats().subscribe(s => this.stats = s);
    this.receptionService.getGuests().subscribe(guests => {
      this.guests = guests;
      this.searchResults = this.searchTerm ? this.receptionService.findGuests(this.searchTerm) : guests.slice(0, 4);
      if (this.selectedGuest) {
        this.selectedGuest = guests.find(guest => guest.id === this.selectedGuest?.id) || null;
      }
    });
    this.receptionService.getRecentCheckins().subscribe(c => {
      this.checkins = c;
      this.applyRecentFilter();
    });
  }

  onSearch(value: string) {
    this.searchTerm = value;
    this.searchResults = this.receptionService.findGuests(value).slice(0, 6);
    this.applyRecentFilter();
  }

  onCheckin(guest?: ReceptionGuest) {
    this.openAction('checkin', guest || this.findDefaultGuest('outside'));
  }

  onCheckout(guest?: ReceptionGuest) {
    this.openAction('checkout', guest || this.findDefaultGuest('inside'));
  }

  onQr(guest?: ReceptionGuest) {
    this.openAction('qr', guest || this.findDefaultGuest('outside'));
  }

  confirmAction() {
    if (!this.selectedGuest || !this.actionMode) return;

    if (this.actionMode === 'checkout') {
      this.receptionService.checkOut(this.selectedGuest);
      this.logService.addEntry({
        type: 'checkout',
        fullName: this.selectedGuest.name,
        cccd: this.selectedGuest.cccd,
        room: this.selectedGuest.room,
        method: 'Thủ công',
        staff: this.staffName,
      });
      this.showMessage(`Đã check-out ${this.selectedGuest.name}`);
    } else {
      const method = this.actionMode === 'qr' ? 'QR Code' : 'Thủ công';
      const logType = this.actionMode === 'qr' ? 'qr' : 'checkin';
      this.receptionService.checkIn(this.selectedGuest);
      this.logService.addEntry({
        type: logType,
        fullName: this.selectedGuest.name,
        cccd: this.selectedGuest.cccd,
        room: this.selectedGuest.room,
        method,
        staff: method === 'QR Code' ? 'Auto' : this.staffName,
      });
      this.showMessage(`Đã check-in ${this.selectedGuest.name}`);
    }

    this.closeAction();
  }

  closeAction() {
    this.actionMode = null;
    this.selectedGuest = null;
  }

  typeLabel(type: ReceptionGuest['type']) {
    return { 'sinh-vien': 'Sinh viên', khach: 'Khách', 'hoc-vien': 'Học viên' }[type];
  }

  actionTitle() {
    return this.actionMode === 'checkout' ? 'Xác nhận check-out'
      : this.actionMode === 'qr' ? 'Xác nhận quét QR'
      : 'Xác nhận check-in';
  }

  actionButtonLabel() {
    return this.actionMode === 'checkout' ? 'CHECK-OUT'
      : this.actionMode === 'qr' ? 'QUÉT QR'
      : 'CHECK-IN';
  }

  private openAction(mode: ReceptionAction, guest?: ReceptionGuest) {
    if (!guest) {
      this.showMessage(mode === 'checkout' ? 'Không có khách đang ở để check-out.' : 'Không có khách phù hợp để check-in.');
      return;
    }
    this.actionMode = mode;
    this.selectedGuest = guest;
  }

  private findDefaultGuest(status: ReceptionGuest['status']) {
    return this.searchResults.find(guest => guest.status === status) || this.guests.find(guest => guest.status === status);
  }

  private applyRecentFilter() {
    const q = this.searchTerm.trim().toLowerCase();
    if (!q) {
      this.filteredCheckins = this.checkins;
      return;
    }

    this.filteredCheckins = this.checkins.filter(item =>
      item.name.toLowerCase().includes(q) ||
      item.cccd.includes(q) ||
      item.room.toLowerCase().includes(q) ||
      item.bed.toLowerCase().includes(q)
    );
  }

  private showMessage(text: string) {
    this.message = text;
    window.setTimeout(() => {
      if (this.message === text) this.message = '';
    }, 3000);
  }
}
