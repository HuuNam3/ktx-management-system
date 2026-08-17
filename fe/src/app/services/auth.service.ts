import { Injectable, computed, signal } from '@angular/core';
import { Router } from '@angular/router';

export interface AppUser {
  name: string;
  email: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storageKey = 'ktx-current-user';
  private readonly currentUserSignal = signal<AppUser | null>(this.loadUser());

  currentUser = this.currentUserSignal.asReadonly();
  isLoggedIn = computed(() => this.currentUserSignal() !== null);

  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    const isAllowedAccount =
      (normalizedEmail === 'admin@ktx.local' && normalizedPassword === '123456') ||
      (normalizedEmail === 'admin' && normalizedPassword === 'admin');

    if (!isAllowedAccount) {
      return false;
    }

    const user: AppUser = {
      name: 'Nguyễn Văn A',
      email: normalizedEmail.includes('@') ? normalizedEmail : 'admin@ktx.local',
      role: 'Quản trị viên',
    };

    localStorage.setItem(this.storageKey, JSON.stringify(user));
    this.currentUserSignal.set(user);
    return true;
  }

  logout() {
    localStorage.removeItem(this.storageKey);
    this.currentUserSignal.set(null);
    this.router.navigateByUrl('/dang-nhap');
  }

  private loadUser(): AppUser | null {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as AppUser;
    } catch {
      localStorage.removeItem(this.storageKey);
      return null;
    }
  }
}
