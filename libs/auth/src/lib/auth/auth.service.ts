import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {Router} from '@angular/router';
import {Login, TokenResponse, User} from '@todo/auth';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';
import {GlobalStoreService} from '@todo/shared';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  cookieService: CookieService = inject(CookieService);
  #globalStoreService: GlobalStoreService = inject(GlobalStoreService);

  baseApiUrl: string = 'http://localhost:3000/api/auth';

  token: string | null = null;
  refreshToken: string | null = null;

  me: WritableSignal<User | null> = signal<User | null>(null);

  get isAuth(): boolean {
    if (!this.token) {
      this.token = this.cookieService.get('token');
      this.refreshToken = this.cookieService.get('refreshToken');
    }
    return !!this.token;
  }

  login(payload: Login): Observable<TokenResponse> {
    return this.http
      .post<TokenResponse>(`${this.baseApiUrl}/login`, payload)
      .pipe(tap((val: TokenResponse): void => this.saveTokens(val)))
      .pipe(tap(() => {this.getMe().subscribe()}));
  }

  getMe(): Observable<User> {
    return this.http
      .get<User>(`${this.baseApiUrl}/me`)
      .pipe(tap((res: User): void => {
        this.me.set(res);
        this.#globalStoreService.me.set(res);
      }));
  }

  // TODO пофиксить запрос на рефреш, уходит ""
  refreshAuthToken() {
    return this.http
      .post<TokenResponse>(`${this.baseApiUrl}/refresh`, {
        refreshToken: this.refreshToken,
      })
      .pipe(
        tap((val: TokenResponse): void => this.saveTokens(val)),
        catchError((err) => {
          this.logout();
          return throwError(err);
        })
      );
  }

  logout() {
    this.cookieService.deleteAll();
    this.token = null;
    this.refreshToken = null;
    this.me.set(null);
    this.#globalStoreService.me.set(null);
    this.router.navigate(['/login']);
  }

  saveTokens(res: TokenResponse): void {
    this.token = res.accessToken;
    this.refreshToken = res.refreshToken;

    this.cookieService.set('token', this.token);
    this.cookieService.set('refreshToken', this.refreshToken);
  }
}
