import { Component, signal } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  notificationsOutline, notificationsSharp,
  personCircleOutline, personCircleSharp,
  chevronDownOutline, chevronDownSharp,
  calendarOutline, calendarSharp,
  logOutOutline, logOutSharp,
  informationCircleOutline, informationCircleSharp,
  settingsOutline, settingsSharp
} from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';

interface Notification {
  id: number;
  text: string;
  time: string;
}

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  standalone: true,
  imports: [IonIcon],
})
export class TopbarComponent {
  constructor(public auth: AuthService) {
    addIcons({
      notificationsOutline, notificationsSharp,
      personCircleOutline, personCircleSharp,
      chevronDownOutline, chevronDownSharp,
      calendarOutline, calendarSharp,
      logOutOutline, logOutSharp,
      informationCircleOutline, informationCircleSharp,
      settingsOutline, settingsSharp
    });
  }

  today = new Date();
  formattedDate = this.today.toLocaleDateString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  showNotifDropdown = signal(false);
  showUserDropdown = signal(false);

  notifications: Notification[] = [
    { id: 1, text: 'Check-in mới: Nguyễn Văn A - Phòng A101', time: '2 phút' },
    { id: 2, text: 'Thanh toán thành công: 1.200.000đ', time: '15 phút' },
    { id: 3, text: 'Bảo trì phòng B301', time: '1 giờ' },
  ];

  toggleNotif() {
    this.showNotifDropdown.update(v => !v);
    if (this.showUserDropdown()) this.showUserDropdown.set(false);
  }

  toggleUser() {
    this.showUserDropdown.update(v => !v);
    if (this.showNotifDropdown()) this.showNotifDropdown.set(false);
  }

  closeDropdowns() {
    this.showNotifDropdown.set(false);
    this.showUserDropdown.set(false);
  }

  logout() {
    this.auth.logout();
  }
}
