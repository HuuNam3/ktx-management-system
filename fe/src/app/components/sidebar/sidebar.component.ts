import { Component, effect, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonIcon } from '@ionic/angular/standalone';
import { LucideIconComponent } from '../lucide-icon/lucide-icon.component';
import { addIcons } from 'ionicons';
import {
  closeOutline, closeSharp,
  menuOutline, menuSharp
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
  standalone: true,
  imports: [RouterLink, RouterLinkActive, IonIcon, LucideIconComponent],
})
export class SidebarComponent {
  collapsed = signal(false);

  menuItems: MenuItem[] = [
    { label: 'Tổng quan', route: '/tong-quan', icon: 'layout-dashboard' },
    { label: 'Lễ tân', route: '/reception', icon: 'user-round-check' },
    { label: 'Quản lý phòng', route: '/phong', icon: 'bed' },
    { label: 'Nhật ký ra vào', route: '/nhat-ky', icon: 'notepad-text' },
    { label: 'Quản lý khách', route: '/khach', icon: 'users-round' },
    { label: 'Quản lý vé', route: '/ve', icon: 'ticket' },
    { label: 'Thanh toán', route: '/thanh-toan', icon: 'panel-top' },
    { label: 'Điện nước', route: '/dien-nuoc', icon: 'zap' },
    { label: 'Hồ sơ 238', route: '/ho-so', icon: 'file-text', badge: 5 },
    { label: 'In giấy tờ', route: '/in-giay-to', icon: 'file-check' },
    { label: 'Checklist', route: '/checklist', icon: 'square-check-big' },
    { label: 'Sự cố', route: '/su-co', icon: 'triangle-alert' },
    { label: 'Nhà thầu/Thợ', route: '/nha-thau', icon: 'wrench' },
    { label: 'Phản hồi', route: '/phan-hoi', icon: 'message-square', badge: 3 },
  ];

  toggleCollapse() {
    this.collapsed.update(v => !v);
    document.documentElement.style.setProperty('--sidebar-width', `${this.collapsed() ? 64 : 306}px`);
  }

  private sidebarEffect = effect(() => {
    document.documentElement.style.setProperty('--sidebar-width', `${this.collapsed() ? 64 : 306}px`);
  });

  constructor() {
    addIcons({
      closeOutline, closeSharp,
      menuOutline, menuSharp
    });
  }
}
