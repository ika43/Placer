import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {


  constructor(private loginService: LoginService, private router: Router) {

  }

  user;
  serverError;
  isLoading: Boolean = false;


  // INITIALIZE LOGIN FORM
  form = new FormGroup({
    'email': new FormControl('',
      [
        Validators.email
      ]),
    'password': new FormControl('',
      [
        Validators.minLength(8),
      ])
  })

  // GETTER
  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  login() {

    if (Validators.email(this.email) || Validators.required(this.email)) {
      console.error(`invalid email`)
      this.email.markAsTouched();
      this.email.setErrors({ 'email': true })
    } else {
      //define user
      this.user = {
        email: this.email.value,
        password: this.password.value
      }

      // call lambda
      this.isLoading = true;
      this.loginService.getUser(this.user)
        .subscribe((res: any) => {
          // set token in storage
          localStorage.setItem('token', res.resultLogin);
          // redirect to posts
          this.router.navigate(['/posts'])
          this.isLoading = false;
        }, (error) => {
          this.serverError = error.error;
          this.isLoading = false;
        })
    }
  }
}
