import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class ConfirmGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private location: Location
  ) { }

  canActivate() {
    if (this.authService.isRegistered()) return true
    this.location.back();
    return false;
  }
}
