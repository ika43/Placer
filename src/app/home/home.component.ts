import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { NgRedux } from 'ng2-redux';
import { IApartmentState } from './store';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
const log = console.log;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  constructor(
    private homeService: HomeService,
    private ngRedux: NgRedux<IApartmentState>,
    private router: Router
  ) { }

  apartments: [];
  recommendedCities;
  recommendedApartmentsInBelgrade;
  loading: Boolean;
  public minDate: Object = new Date();

  protected srcCities = [
    'Milan',
    'Belgrade',
    'Paris'
  ]

  searchForm = new FormGroup({
    'srcCity': new FormControl(),
    'dateRange': new FormControl(),
    'numberOfVisitors': new FormControl()
  })

  ngOnInit() {
    log("COMPONENT INIT: HOME");
    this.homeService.loadApartment();
    this.ngRedux.select('apartmentStore')
      .subscribe(async (apartmentStore: any) => {
        this.apartments = apartmentStore.apartments;
        this.loading = apartmentStore.loaded;
        this.recommendedCities = await this.homeService.getMostPopularCities(this.apartments);
        this.recommendedApartmentsInBelgrade = await this.homeService.getMostPopularApartmentsInBelgrade(this.apartments);
        //this.recommendedCities.map(item => {
        //  console.log("item", item)
        //})
      })
  }

  get dateRange() {
    return this.searchForm.get('dateRange');
  }
  get srcCity() {
    return this.searchForm.get('srcCity');
  }
  get numberOfVisitors() {
    return this.searchForm.get('numberOfVisitors');
  }

  submitSearch() {

    // * get all values from form for validation
    let errors: Array<string> = [];
    let city: string = this.srcCity.value;
    let adults: number = this.numberOfVisitors.value;

    try {
      // parse date for calling aws lambda
      let dateFrom = moment(this.dateRange.value[0]).format();
      let dateTo = moment(this.dateRange.value[1]).format();
    } catch (e) { // catch errors 
      errors.push('Invalid date format!')
      this.dateRange.setErrors({'date':true})
    }

    // valid only city that exist
    if (!this.srcCities.includes(city)) {
      errors.push('Invalid city');
      this.srcCity.setErrors({ 'city': true });
    }

    if (adults < 1 || adults > 3) {
      errors.push('Min 1, max 3 person per apartment!')
      this.numberOfVisitors.setErrors({'visitors': true})
    }

    if (errors.length > 0) {

    } else {
      // send to city-apartment component
      this.router.navigate([`/apartments/city/${this.srcCity.value}`]);
    }
  }

}
