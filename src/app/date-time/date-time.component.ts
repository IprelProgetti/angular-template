import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.css']
})
export class DateTimeComponent implements OnInit {
  @Input('descr') 
  public descr: string;

  constructor() { }

  ngOnInit() {
  }

}
