import {Component, effect, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {firstValueFrom} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService, User} from '@todo/auth';

@Component({
  selector: 'lib-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);

  isLoginPage: WritableSignal<boolean> = signal(false);
  me: WritableSignal<User | null> = this.authService.me;

  themeMode: boolean = false;

  ngOnInit() {
    // определяем, что это страница логина
    this.isLoginPage.set(this.router.url === '/login');

    firstValueFrom(this.authService.getMe());

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.themeMode = true;
      document.body.classList.add('dark-theme');
    } else {
      this.themeMode = false;
      document.body.classList.remove('dark-theme');
    }
  }

  toggleTheme() {
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
