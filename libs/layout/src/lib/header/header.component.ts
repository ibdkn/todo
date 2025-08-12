import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {firstValueFrom} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService, User} from '@todo/auth';
import {GlobalStoreService} from '@todo/shared';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'lib-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);
  #globalStoreService: GlobalStoreService = inject(GlobalStoreService);
  toastr: ToastrService = inject(ToastrService);

  isLoginPage: WritableSignal<boolean> = signal(false);

  themeMode: boolean = false;

  async ngOnInit(): Promise<void> {
    // определяем, что это страница логина
    this.isLoginPage.set(this.router.url === '/login');

    // получаем данные пользователя
    if (this.authService.token) {
      await firstValueFrom(this.authService.getMe());
    }

    const savedTheme: string | null = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.themeMode = true;
      document.body.classList.add('dark-theme');
    } else {
      this.themeMode = false;
      document.body.classList.remove('dark-theme');
    }
  }

  get user(): User | null {
    return this.#globalStoreService.me();
  }

  logout(): void {
    this.authService.logout();
    this.toastr.success('You have been logged out successfully', 'Logout successful');
  }

  toggleTheme(): void {
    this.themeMode = !this.themeMode;
    if (this.themeMode) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }
}
