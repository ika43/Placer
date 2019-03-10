import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { NgRedux } from 'ng2-redux';
import { IApartmentState } from './store';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
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

  searchForm = new FormGroup({
    'location': new FormControl(),
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
  get location() {
    return this.searchForm.get('location');
  }
  get numberOfVisitors() {
    return this.searchForm.get('numberOfVisitors');
  }

  submitSearch() {
    this.router.navigate([`/apartments/city/${this.location.value}`], { queryParams: { page: 0 } });
  }

}
