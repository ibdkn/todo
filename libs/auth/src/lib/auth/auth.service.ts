import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Login, TokenResponse} from '@todo/auth';
import {Observable, tap} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  cookieService: CookieService = inject(CookieService);
  baseApiUrl: string = 'http://localhost:3000/api/auth';

  token: string | null = null;
  refreshToken: string | null = null;

  login(payload: Login): Observable<TokenResponse> {
    return this.http
      .post<TokenResponse>(`${this.baseApiUrl}/login`, payload)
      .pipe(tap((val: TokenResponse): void => this.saveTokens(val)));
  }

  saveTokens(res: TokenResponse): void {
    this.token = res.accessToken;
    this.refreshToken = res.refreshToken;

    this.cookieService.set('token', this.token);
    this.cookieService.set('refreshToken', this.refreshToken);
  }
}
