import {Component, inject, signal, WritableSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../auth';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  standalone: true,
  selector: 'lib-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  toastr: ToastrService = inject(ToastrService);

  // Сигнал для показа/скрытия текста пароля
  isPasswordVisible: WritableSignal<boolean> = signal<boolean>(false);

  form: FormGroup = new FormGroup({
    usernameOrEmail: new FormControl<string>('', {nonNullable: true, validators: Validators.required,}),
    password: new FormControl<string>('', {nonNullable: true, validators: Validators.required,}),
  });

  login(): void {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe({
        next: () => {
          this.router.navigate(['/']);
          this.toastr.success('You have signed in successfully', 'Login successful');
        },
        error: (err) => {
          if (err.status === 401) {
            this.toastr.error('Invalid username or password', 'Login failed');
          } else {
            this.toastr.error('An unexpected error occurred', 'Error');
          }
        }
      });
    }
  }
}
