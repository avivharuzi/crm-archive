import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validator } from '../../../models/validator.model';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  public loginForm: FormGroup;
  public loginMessage: any;
  public typeMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createLoginForm();
    this.loginMessage = null;
    this.typeMessage = null;
  }

  createLoginForm(): void {
    const username = new FormControl('', [
      Validator.required('Username')
    ]);

    const password = new FormControl('', [
      Validator.required('Password')
    ]);

    this.loginForm = new FormGroup({
      username,
      password
    });
  }

  setLoginForm(): void {
    if (this.loginForm.valid) {
      const user: User = new User(
        this.loginForm.get('username').value,
        this.loginForm.get('password').value
      );

      this.loginUser(user);
    }
  }

  loginUser(user) {
    this.authService.login(user).subscribe((res: any) => {
      if (res) {
        this.router.navigate(['/']);
      }
    }, err => {
      this.loginMessage = err.errors;
      this.typeMessage = 'danger';
    });
  }
}
