import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NgRedux } from "ng2-redux";
import { IApartmentState } from "./store";
import { FETCH_APARTMENT, APARTMENT_FETCHED } from "./actions";
import { environment } from "src/environments/environment";
import { find } from "lodash";

@Injectable({
  providedIn: "root"
})
export class HomeService {
  constructor(
    private http: HttpClient,
    private ngRedux: NgRedux<IApartmentState>
  ) {}

  getMostPopularCities(apartments) {
    let recommended = [];
    return new Promise(resolve => {
      apartments.map(item => {
        let found = find(recommended, { name: item.address.city });
        if (!found) {
          recommended.push({
            name: item.address.city,
            img: environment[item.address.city],
            number: 1
          });
        } else {
          recommended.map(recCity => {
            if (recCity.name === item.address.city) {
              recCity.number += 1;
            }
          });
        }
      });
      resolve(recommended);
    });
  }

  getMostPopularApartmentsInBelgrade(apartments) {
    return new Promise(resolve => {
      const recommended = apartments
        .filter(apartment => apartment.address.city === "Belgrade")
        .sort((a, b) => this.getStarRate(b) - this.getStarRate(a))
        .slice(0, 4)
        .map(apartment => {
          apartment.starRate = this.getStarRate(apartment);
          return apartment;
        });
        
      console.log("recommended", recommended);
      resolve(recommended);
    });
  }

  getStarRate(item) {
    let sum = 0;
    item.review.map(r => (sum += +r.rate));
    const avgRate = Math.round(sum / item.review.length);
    const starRate = Math.ceil(avgRate / 2);
    return starRate;
  }

  loadApartment() {
    this.http.get(`${environment.url}/apartment`).subscribe((res: any) => {
      //console.log("response", res.apartments)
      this.ngRedux.dispatch({
        type: FETCH_APARTMENT,
        apartments: res.apartments,
        properties: res.properties
      });
      this.ngRedux.dispatch({ type: APARTMENT_FETCHED });
    });
  }
}
