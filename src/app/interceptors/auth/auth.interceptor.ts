import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth/auth.service';
import { NO_AUTHORIZATION_URLS } from './../../constants/urls';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!(NO_AUTHORIZATION_URLS.indexOf(req.url) > -1)) {
      req = req.clone({
        setHeaders: {
          Authorization: this.authService.token
        }
      });
    }

    return next.handle(req)
      .do(event => {
        if (event instanceof HttpResponse) {
          if (event.status === 401) {
            this.router.navigate(['/login']);
          }
        }
      });
  }
}
