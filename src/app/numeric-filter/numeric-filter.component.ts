import { Component, OnInit, Input, ViewChild, Output } from '@angular/core';
import { MatInput } from '@angular/material';

export interface Filter {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-numeric-filter',
  templateUrl: './numeric-filter.component.html',
  styleUrls: ['./numeric-filter.component.css']
})
export class NumericFilterComponent implements OnInit {
  @Input('descr') public descr: string;
  // @ViewChild('valFld') public val: MatInput;
  @Output() public f: any;
  @Output() public selected: string ='none';
  @Output() public isDisabled: boolean = true;

  filters: Filter[] = [
    {value: 'none', viewValue: '/'},
    {value: 'eq', viewValue: '='},
    {value: 'gt', viewValue: '>'},
    {value: 'gte', viewValue: '>='},
    {value: 'lt', viewValue: '<'},
    {value: 'lte', viewValue: '<='},
    // {value: 'in_incl', viewValue: '[]'},
    // {value: 'in_excl', viewValue: ']['},
    // {value: 'in_linc', viewValue: '[['},
    // {value: 'in_rinc', viewValue: ']]'},
  ];
  
  constructor() { 
  }

  ngOnInit() {
  }

  triggerChange() {
    if(this.selected == 'none'){
      this.isDisabled = true;
      this.f = null;
      console.log(this.f);
    }else{
      this.isDisabled = false;
      console.log(this.f);
    }
  }

  public toString = () : string => {
    if(this.selected=='none'){
      return '';
    }else if(this.selected =='eq'){
      return `${this.descr}=${this.f}`;
    }else{
      return `${this.descr}=${this.selected}:${this.f}`;
    }
    
}

}
