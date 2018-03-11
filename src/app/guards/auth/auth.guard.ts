import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService
  ) { }

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      if (localStorage.getItem('user_token')) {
        this.authService.checkToken().subscribe((res: any) => {
          resolve(true);
        }, err => {
          this.authService.logout();
          resolve(false);
        });
      } else {
        this.authService.logout();
        resolve(false);
      }
    });
  }
}
