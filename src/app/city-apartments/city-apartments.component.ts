import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { IApartmentState } from '../home/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { FormGroup, FormControl, NgForm, FormBuilder, FormArray } from '@angular/forms';
import { some, sortBy } from 'lodash'

@Component({
  selector: 'app-city-apartments',
  templateUrl: './city-apartments.component.html',
  styleUrls: ['./city-apartments.component.css']
})
export class CityApartmentsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private ngRedux: NgRedux<IApartmentState>,
  ) { }

  p = 1;
  initialApartments;
  apartments;
  properties;
  currentCity;
  pages = [];
  result;
  i = Array;
  public start: Date;
  public end: Date;
  lpStar: Boolean = false;
  lpPrice: Boolean = false;
  lpReview: Boolean = false;

  // * initialize search form
  form = new FormGroup({
    'dateRange': new FormControl(),
    'destination': new FormControl(),
    'person': new FormControl()
  })

  sortReview(){
    this.apartments = sortBy(this.apartments, ['review.length', 'starRate']).reverse()
  }

  priceMin() {
    if (!this.lpPrice) {
      this.lpPrice = true;
      this.apartments = sortBy(this.apartments, ['pricePerNight', 'starRate']).reverse();
    } else {
      this.lpPrice = false;
      this.apartments = sortBy(this.apartments, ['pricePerNight', 'starRate'])
    }
  }

  starSort() {

    if (!this.lpStar) {
      this.lpStar = true;
      this.apartments = sortBy(this.apartments, ['starRate', 'pricePerNight']).reverse();
    } else {
      this.lpStar = false;
      this.apartments = sortBy(this.apartments, ['starRate', 'pricePerNight'])
    }
  }

  submitFilter(val: NgForm) {
    let checkedProp = [];
    let lpApartments = [];
    // * map array for matching
    for (let [key, value] of Object.entries(val.value)) {
      if (value) {
        checkedProp.push(key);
      }
    }
    this.initialApartments.map(a => {
      let lp = true;
      checkedProp.map(prop => {
        if (!some(a.properties, { name: prop })) {
          lp = false;
        }
      })
      if (lp) {
        //this.result.push(a);
        lpApartments.push(a);
      }
    })
    this.apartments = lpApartments;
  }

  // * getter
  get dateRange() {
    return this.form.get('dateRange');
  }

  get destination() {
    return this.form.get('destination');
  }

  get person() {
    return this.form.get('person');
  }

  // * ON SUBMIT FORM

  submitSearch() {
    console.log("VALUES", this.dateRange.value)
    console.log("VALUES", this.destination.value)
    console.log("VALUES", this.person.value)
  }



  ngOnInit() {
    console.log("COMPONENT INIT:  CITY_APARTMENT")

    // * subscribe to param and query event to get data without init component 
    Observable.combineLatest([
      this.ngRedux.select('apartmentStore'),
      this.route.paramMap,
      //this.route.queryParamMap,
    ]).subscribe((combined: any) => {
      this.apartments = combined[0].apartments.filter(item => item.address.city === combined[1].get('city'));
      this.initialApartments = combined[0].apartments.filter(item => item.address.city === combined[1].get('city'));
      this.properties = combined[0].properties;
      console.log(this.properties);

      // * calculate avg rate and change description text
      this.initialApartments.map(a => {

        // * decrease description to three sentences
        let res = a.description.split(".", 3);
        let description = res.join(".")

        // * put new description
        a.description = description;

        // * calculate average rate
        let sum = 0;
        a.review.map(r => {
          sum += +r.rate;
        })
        // * round to one decimal
        a.avgRate = Math.round(sum / a.review.length);
        a.starRate = Math.ceil(a.avgRate / 2);
      })
      this.currentCity = combined[1].get('city');
    })
  }
}
