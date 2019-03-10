import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable()
export class RegisterService {
  constructor(private http: HttpClient) { }

  getCountries() {
    return this.http.get(`${environment.url}/users/countries`);
  }

  registerUser(user) {
    return this.http.post(`${environment.url}/users/register`, JSON.stringify(user));
  }

  checkEmail(email) {
    const body = {
      email
    }
    return this.http.post(`${environment.url}/users/email`, JSON.stringify(body));
  }
}