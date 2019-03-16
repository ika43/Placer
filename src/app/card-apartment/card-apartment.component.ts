import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-apartment',
  templateUrl: './card-apartment.component.html',
  styleUrls: ['./card-apartment.component.css']
})
export class CardApartmentComponent implements OnInit {

  @Input() item;

  constructor() { }

  ngOnInit() {
  }

}
