import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'tong-quan', pathMatch: 'full' },
  {
    path: 'dang-nhap',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'tong-quan',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage),
  },
  {
    path: 'reception',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/reception/reception.page').then(m => m.ReceptionPage),
  },
  {
    path: 'phong',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/room-management/room-management.page').then(m => m.RoomManagementPage),
  },
  {
    path: 'nhat-ky',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/log/log.page').then(m => m.LogPage),
  },
  {
    path: 've',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/ticket/ticket.page').then(m => m.TicketPage),
  },
  {
    path: 'khach',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/guest/guest.page').then(m => m.GuestPage),
  },
  {
    path: 'thanh-toan',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/payment/payment.page').then(m => m.PaymentPage),
  },
  {
    path: 'dien-nuoc',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/electric/electric.page').then(m => m.ElectricPage),
  },
  {
    path: 'ho-so',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage),
  },
  {
    path: 'in-giay-to',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/print/print.page').then(m => m.PrintPage),
  },
  {
    path: 'checklist',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/checklist/checklist.page').then(m => m.ChecklistPage),
  },
  {
    path: 'su-co',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/incident/incident.page').then(m => m.IncidentPage),
  },
  {
    path: 'nha-thau',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/contractor/contractor.page').then(m => m.ContractorPage),
  },
  {
    path: 'phan-hoi',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/feedback/feedback.page').then(m => m.FeedbackPage),
  },
];
