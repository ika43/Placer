import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgRedux } from 'ng2-redux';
import { IApartmentState } from './store';
import { FETCH_APARTMENT, APARTMENT_FETCHED } from './actions';
import { environment } from 'src/environments/environment';
import { find } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient,
    private ngRedux: NgRedux<IApartmentState>
  ) { }

  getMostPopularCities(apartments) {
    let recommended = [];
    return new Promise(resolve => {
      apartments.map(item => {
        let found = find(recommended, { name: item.address.city })
        if (!found) {
          recommended.push({
            name: item.address.city,
            img: environment[item.address.city],
            number: 1
          })
        } else {
          recommended.map(recCity => {
            if (recCity.name === item.address.city) {
              recCity.number += 1
            }
          })
        }
      })
      resolve(recommended);
    })
  }

  loadApartment() {

    this.http.get(`${environment.url}/apartment`)
      .subscribe((res: any) => {
        //console.log("response", res.apartments)
        this.ngRedux.dispatch({ type: FETCH_APARTMENT, apartments: res.apartments, properties: res.properties })
        this.ngRedux.dispatch({ type: APARTMENT_FETCHED });
      })
  }
}
