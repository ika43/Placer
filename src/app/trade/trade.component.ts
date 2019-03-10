import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { NgRedux, select } from 'ng2-redux';
import { TradeService } from './trade.service';
import { IUsersState } from './store';
import { NgbDate, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {

  constructor(
    //private route: ActivatedRoute,
    private tradeService: TradeService,
    private ngRedux: NgRedux<IUsersState>,
    calendar: NgbCalendar,
    config: NgbDatepickerConfig) {

    config.minDate = calendar.getToday();
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }


  loaded;
  state;
  users;

  public start: Date = new Date();
  public minDate: Date = new Date();


  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  ngOnInit() {

    console.log(`TRADE COMPONENT INIT`)
    this.tradeService.loadUsers();
    this.ngRedux.select('userStore')
      .subscribe((userStore: any) => {
        this.users = userStore.users;
        this.loaded = userStore.loaded;
      })
    //this.ngRedux.subscribe(() => {
    //  this.state = this.ngRedux.getState();
    //  this.users = this.state.userStore.users;
    //  console.log(this.state)
    //})
    //this.route.paramMap.subscribe(params => {
    //     // TODO: Add logic here
    //})
  }

}
