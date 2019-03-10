import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.css']
})
export class ApartmentComponent implements OnInit {

  constructor() { }


  i = Array;

  @Input() item

  ngOnInit() {
  }

}
