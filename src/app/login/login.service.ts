import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable()
export class LoginService {
  constructor(private http: HttpClient) { }
  
  getUser(user) {
    return this.http.post(`${environment.url}/users/login`, JSON.stringify(user));
  }
}