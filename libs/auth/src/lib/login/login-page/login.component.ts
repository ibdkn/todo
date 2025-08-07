import {Component, inject, signal, WritableSignal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth';

@Component({
  selector: 'lib-login',
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authService: AuthService = inject(AuthService);

  // Сигнал для показа/скрытия текста пароля
  isPasswordVisible: WritableSignal<boolean> = signal<boolean>(false);
}
