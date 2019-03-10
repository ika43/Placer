import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { IApartmentState } from '../home/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-city-apartments',
  templateUrl: './city-apartments.component.html',
  styleUrls: ['./city-apartments.component.css']
})
export class CityApartmentsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private ngRedux: NgRedux<IApartmentState>
  ) { }

  apartments;
  properties;
  currentCity;
  pages = [];
  result;
  i = Array;
  public start: Date;
  public end: Date;
  testing

  // * initialize search form
  form = new FormGroup({
    'dateRange': new FormControl(),
    'destination': new FormControl(),
    'person': new FormControl()
  })

  //onChange(val) {
  //  this.apartments.map(a => {
  //    a.properties.map(p => {
  //      if (p.name === val) {
  //        console.log("USAO", p.name)
  //        this.result.push(a)
  //      }
  //    })
  //  })
  //}

  submitFilter(val) {
    console.log(val);
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
      this.route.queryParamMap,
    ]).subscribe((combined: any) => {
      this.apartments = combined[0].apartments.filter(item => item.address.city === combined[1].get('city'));
      this.properties = combined[0].properties;
      console.log("ika limar pre", this.apartments.length)

      let page = parseInt(combined[2].get('page'))

      // * define array for five apartments
      this.result = [];

      // * map five apartments
      for (let i = page; i < (page + 5); i++) {

        if (i === this.apartments.length) break;
        const element = this.apartments[i];

        // * decrease description to three sentences
        let res = element.description.split(".", 3);
        let description = res[0].concat(".", res[1], ".", res[2], ".");

        // * put new description
        element.description = description;

        // * calculate average rate
        let sum = 0;
        Promise.all(
          element.review.map(r => {
            sum += +r.rate;
          })
        )
        // * round to one decimal
        element.avgRate = Math.round(sum / element.review.length);
        element.starRate = Math.ceil(element.avgRate / 2);
        this.result.push(element)
      }
      this.currentCity = combined[1].get('city');
    })

    // * map array for pagination
    for (let index = 0; index < Math.ceil(this.apartments.length / 5); index++) {
      this.pages.push(index)
    }
  }
}
