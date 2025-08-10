import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  filter, finalize,
  switchMap, take,
  tap,
  throwError,
} from 'rxjs';
import { AuthService } from '.';

let isRefreshing$ = new BehaviorSubject<boolean>(false);

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);
  const token: string | null = authService.token;

  // Если токена нет - пропускаем запрос "как есть"
  if (!token) return next(req);

  // Если уже идёт обновление - сразу "пришпандориваем" текущий запрос к новому токену
  if (isRefreshing$.value) {
    return refreshAndProceed(authService, req, next);
  }

  // Отправляем запрос с существующим токеном
  return next(addToken(req, token)).pipe(
    catchError((error) => {
      // Если получен 401/403 - запускаем логику обновления
      if (error?.status === 401 || error?.status === 403) {
        return refreshAndProceed(authService, req, next);
      }

      // Во всех других случаях - прокидываем ошибку дальше
      return throwError(() => error);
    })
  );
};

const refreshAndProceed = (authService: AuthService, req: HttpRequest<any>, next: HttpHandlerFn) => {
  if (!isRefreshing$.value) {
    isRefreshing$.next(true);

    return authService.refreshAuthToken().pipe(
      // Обновляем access токен в сервисе, если это не делает сам метод
      tap((res) => {
        if (res?.accessToken) {
          // если у тебя есть сеттер — используй его
          (authService as any).token = res.accessToken;
        }
      }),
      switchMap((res) => {
        const fresh = res?.accessToken ?? authService.token!;
        return next(addToken(req, fresh));
      }),
      catchError((err) => {
        return throwError(() => err);
      }),
      finalize(() => {
        isRefreshing$.next(false);
      })
    );
  }

  // Не зацикливаем запрос к /refresh
  if (req.url.includes('refresh')) {
    // если refresh не требует Authorization — можно отправить next(req)
    return next(authService.token ? addToken(req, authService.token) : req);
  }

  return isRefreshing$.pipe(
    filter((isRefreshing) => !isRefreshing),
    take(1),
    switchMap(() => {
      const fresh = authService.token;
      return fresh ? next(addToken(req, fresh)) : next(req);
    })
  );
};

// Функция клонирует запрос и ставит заголовок Authorization
const addToken = (req: HttpRequest<any>, token: string) => {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
};
