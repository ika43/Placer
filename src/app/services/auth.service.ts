import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
  ) { }

  getUser() {
    const token = localStorage.getItem('token');
    if (!token) return false;
    const jwt = new JwtHelperService();
    const user = jwt.decodeToken(token);
    return user;
  }

  isRegistered() {
    const token = localStorage.getItem('token');
    if (!token) return false;
    const jwt = new JwtHelperService();
    const user = jwt.decodeToken(token);
    if (user.active) return false;
    return true
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (!token) return false;
    const jwt = new JwtHelperService();
    const user = jwt.decodeToken(token);
    //const isExpired = jwt.isTokenExpired(token);
    if (!user.active) return false;
    return true;
  }
}
