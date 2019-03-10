import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfirmcodeService {

  constructor(private http: HttpClient) { }

  confirm(code, token) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };

    //define body
    const body = {
      code
    }
    return this.http.post(`${environment.url}/users/confirm`, JSON.stringify(body), httpOptions)
  }
}
