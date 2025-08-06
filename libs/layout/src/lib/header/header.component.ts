import {Component, effect, inject, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {taskActions, todolistActions} from '@todo/task-board';
import {switchMap} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'lib-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  router: Router = inject(Router);

  isLoginPage = signal(false);

  themeMode: boolean = false;

  ngOnInit() {
    // определяем, что это страница логина
    this.isLoginPage.set(this.router.url === '/login');

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
