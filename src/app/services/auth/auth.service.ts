import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from './../../models/user.model';
import { LOGIN_URL, CHECK_TOKEN_URL } from './../../constants/urls';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {
  private _token: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.token = localStorage.getItem('user_token');
  }

  get token(): string {
    return this._token;
  }

  set token(newToken: string) {
    if (newToken !== null) {
      this._token = newToken;
      localStorage.setItem('user_token', newToken);
    }
  }

  login(user): Observable<any> {
    return this.http.post(LOGIN_URL, { user: user }).map((res: any) => {
      let token = res.data;
      if (token) {
        this.token = token;
        return true;
      } else {
        return false;
      }
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('user_token');
    this.router.navigate(['/login']);
  }

  checkToken(): Observable<any> {
    return this.http.post(CHECK_TOKEN_URL, { token: this.token }).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err));
  }
}
