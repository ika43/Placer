import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private registerService: RegisterService, private router: Router) { }

  regexName = /^[a-zA-Z ]+$/;
  regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  user;
  countries;
  countryError = "";
  isLoading: Boolean = false;

  // INITALIZE SIGNUP FORM
  form = new FormGroup({
    'rg-name': new FormControl('', [Validators.pattern(this.regexName), Validators.minLength(2)]),
    'rg-surname': new FormControl('', [Validators.pattern(this.regexName), Validators.minLength(2)]),
    'rg-email': new FormControl('', [Validators.email]),
    'rg-password': new FormControl('', [Validators.pattern(this.regexPassword)]),
    'rg-country': new FormControl('', Validators.required),
    'rg-city': new FormControl('', [Validators.pattern(this.regexName), Validators.minLength(2)]),
  })

  // ↪ getter's
  get name() {
    return this.form.get('rg-name');
  }
  get surname() {
    return this.form.get('rg-surname');
  }
  get country() {
    return this.form.get('rg-country');
  }
  get city() {
    return this.form.get('rg-city');
  }
  get email() {
    return this.form.get('rg-email');
  }
  get password() {
    return this.form.get('rg-password');
  }

  ngOnInit() {

    // ↪ get all countries for drop down list
    this.registerService.getCountries()
      .subscribe((res: any) => {
        this.countries = res.countries
      })
  }

  // on form submit
  register() {

    // ✔ check firstname
    if (!this.regexName.test(this.name.value)) {
      this.name.markAsTouched();
      this.name.setErrors({
        pattern: true
      })
    }

    // ✔ check lastname
    if (!this.regexName.test(this.surname.value)) {
      this.surname.markAsTouched();
      this.surname.setErrors({
        pattern: true
      })
    }


    // ✔ check email
    if (Validators.email(this.email) || Validators.required(this.email)) {
      this.email.markAsTouched();
      this.email.setErrors({
        email: true
      })
    }

    // ✔ check country
    if (!this.country.value) {
      this.country.markAsTouched();
      this.country.setErrors({
        chose: true
      })
    }

    // ✔ check city
    if (!this.regexName.test(this.city.value)) {
      this.city.markAsTouched();
      this.city.setErrors({
        pattern: true
      })
    }

    // ✔ check city
    if (!this.regexPassword.test(this.password.value)) {
      this.password.markAsTouched();
      this.password.setErrors({
        pattern: true
      })
    }

    if (!this.form.invalid) {
      console.log(`PROSAO 🎉🎉🎉`);

      this.isLoading = true;
      this.user = {
        name: this.name.value,
        surname: this.surname.value,
        email: this.email.value,
        password: this.password.value,
        city: this.city.value,
        country: this.country.value,
      }
      console.log(`NEW USER ${JSON.stringify(this.user)} ✅`)
      this.registerService.registerUser(this.user)
        .subscribe((res: Response) => {
          localStorage.setItem('token', res['user_token']);
          this.router.navigate(['/confirm']);
          this.isLoading = false;
        }, (error) => { // catch errors
          console.warn(`error occured: ${error}`)
          this.isLoading = false;
        })
    }
  }



  // CALL THIS METHOD ON BLUR INPUT EMAIL
  checkEmail() {
    // ✔ check email
    if (!Validators.required(this.email) && !Validators.email(this.email)) {
      console.log(`USAO U VALID EMAIL`)
      // call server to valid address
      this.registerService.checkEmail(this.email.value)
        .subscribe((res: any) => {
          console.log('postoji', res.exist)
          if (res.exist) {
            this.email.setErrors({ 'exist': true })
          }
        })
    }
  }
}
