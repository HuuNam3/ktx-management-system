import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  gridOutline, gridSharp,
  clipboardOutline, clipboardSharp,
  bedOutline, bedSharp,
  bookOutline, bookSharp,
  peopleOutline, peopleSharp,
  ticketOutline, ticketSharp,
  walletOutline, walletSharp,
  flashOutline, flashSharp,
  folderOutline, folderSharp,
  printOutline, printSharp,
  checkboxOutline, checkboxSharp,
  alertCircleOutline, alertCircleSharp,
  hammerOutline, hammerSharp,
  chatbubbleOutline, chatbubbleSharp,
  chevronBackOutline, chevronBackSharp,
  chevronForwardOutline, chevronForwardSharp
} from 'ionicons/icons';

interface MenuItem {
  label: string;
  route: string;
  icon: string;
  badge?: number;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, IonIcon],
})
export class SidebarComponent {
  collapsed = signal(false);

  menuItems: MenuItem[] = [
    { label: 'Tổng quan', route: '/tong-quan', icon: 'grid' },
    { label: 'Lễ tân', route: '/reception', icon: 'clipboard' },
    { label: 'Quản lý phòng', route: '/phong', icon: 'bed' },
    { label: 'Nhật ký ra vào', route: '/nhat-ky', icon: 'book' },
    { label: 'Quản lý khách', route: '/khach', icon: 'people' },
    { label: 'Quản lý vé', route: '/ve', icon: 'ticket' },
    { label: 'Thanh toán', route: '/thanh-toan', icon: 'wallet' },
    { label: 'Điện nước', route: '/dien-nuoc', icon: 'flash' },
    { label: 'Hồ sơ', route: '/ho-so', icon: 'folder', badge: 12 },
    { label: 'In giấy tờ', route: '/in-giay-to', icon: 'print' },
    { label: 'Checklist', route: '/checklist', icon: 'checkbox' },
    { label: 'Sự cố', route: '/su-co', icon: 'alert-circle' },
    { label: 'Nhà thầu/Thợ', route: '/nha-thau', icon: 'hammer' },
    { label: 'Phản hồi', route: '/phan-hoi', icon: 'chatbubble', badge: 3 },
  ];

  toggleCollapse() {
    this.collapsed.update(v => !v);
  }

  constructor() {
    addIcons({
      gridOutline, gridSharp,
      clipboardOutline, clipboardSharp,
      bedOutline, bedSharp,
      bookOutline, bookSharp,
      peopleOutline, peopleSharp,
      ticketOutline, ticketSharp,
      walletOutline, walletSharp,
      flashOutline, flashSharp,
      folderOutline, folderSharp,
      printOutline, printSharp,
      checkboxOutline, checkboxSharp,
      alertCircleOutline, alertCircleSharp,
      hammerOutline, hammerSharp,
      chatbubbleOutline, chatbubbleSharp,
      chevronBackOutline, chevronBackSharp,
      chevronForwardOutline, chevronForwardSharp
    });
  }
}
