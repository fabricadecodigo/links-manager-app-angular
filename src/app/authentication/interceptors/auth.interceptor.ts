import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@authentication/services/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();

    let newRequest: HttpRequest<unknown> = request;

    if (token && !this.authService.isTokenExpired(token)) {
      newRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
    }

    return next.handle(newRequest);
  }
}
