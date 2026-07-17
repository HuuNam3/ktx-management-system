import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'tong-quan', pathMatch: 'full' },
  {
    path: 'tong-quan',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage),
  },
  {
    path: 'reception',
    loadComponent: () => import('./pages/reception/reception.page').then(m => m.ReceptionPage),
  },
  {
    path: 'phong',
    loadComponent: () => import('./pages/room-management/room-management.page').then(m => m.RoomManagementPage),
  },
  {
    path: 'nhat-ky',
    loadComponent: () => import('./pages/log/log.page').then(m => m.LogPage),
  },
  {
    path: 've',
    loadComponent: () => import('./pages/ticket/ticket.page').then(m => m.TicketPage),
  },
];
