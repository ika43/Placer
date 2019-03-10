import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { NgRedux } from 'ng2-redux';
import { IApartmentState } from './store';
const log = console.log;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  constructor(
    private homeService: HomeService,
    private ngRedux: NgRedux<IApartmentState>
  ) { }

  apartments: [];
  recommendedCities;
  loading: Boolean;

  ngOnInit() {
    log("COMPONENT INIT: HOME");
    this.homeService.loadApartment();
    this.ngRedux.select('apartmentStore')
      .subscribe(async (apartmentStore: any) => {
        this.apartments = apartmentStore.apartments;
        this.loading = apartmentStore.loaded;
        this.recommendedCities = await this.homeService.getMostPopularCities(this.apartments);
        //this.recommendedCities.map(item => {
        //  console.log("item", item)
        //})
      })
  }

}
