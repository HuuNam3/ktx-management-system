import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideIconComponent } from '../../components/lucide-icon/lucide-icon.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  imports: [FormsModule, LucideIconComponent],
})
export class LoginPage {
  email = 'admin@ktx.local';
  password = '123456';
  remember = true;
  error = signal('');
  loading = signal(false);

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  submit() {
    this.error.set('');
    this.loading.set(true);

    window.setTimeout(() => {
      const ok = this.auth.login(this.email, this.password);
      this.loading.set(false);

      if (!ok) {
        this.error.set('Sai tài khoản hoặc mật khẩu. Có thể dùng admin@ktx.local / 123456.');
        return;
      }

      this.router.navigateByUrl('/tong-quan');
    }, 350);
  }
}
