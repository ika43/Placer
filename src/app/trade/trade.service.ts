import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NgRedux } from 'ng2-redux';
import { IUsersState } from './store';
import { FETCH_USERS, FETCH_USERS_START } from './actions';


@Injectable()
export class TradeService {
  constructor(
    private http: HttpClient,
    private ngRedux: NgRedux<IUsersState>
  ) { }

  loadUsers() {

    this.http.get(`${environment.url}/users`)
      .subscribe((res: any) => {
        this.ngRedux.dispatch({ type: FETCH_USERS, users: res.users })
        this.ngRedux.dispatch({ type: FETCH_USERS_START });
      })
  }
}