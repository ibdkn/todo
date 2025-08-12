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
      this.authService.login(this.form.value).subscribe((val) => {
        this.router.navigate(['/']);
        this.toastr.success('You are signed in successfully!');
      });
    }
  }
}
