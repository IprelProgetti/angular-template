import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections'
import { DataInjectionService } from '../data-injection.service';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-active-table',
  templateUrl: './active-table.component.html',
  styleUrls: ['./active-table.component.css']
})
export class ActiveTableComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('TABLE') table: ElementRef;

  @ViewChild('rpm') public rpmFx: any;
  @ViewChild('temperatura') public tempFx: any;
  @ViewChild('pressioneAcqua') public acqFx: any;
  @ViewChild('pressioneCaldaia') public caldFx: any;
  @ViewChild('pressostatoAria') public ariaFx: any;

  // selection: any;
  // initialSelection = [];
  // allowMultiSelect = true;


  // 2 problemi: 
  // i DetectChange sono visualizzati solo interagendo con la tabella, non automaticamente
  // se cambio vista e torno, perdo lo storico precedente, ma per la tabella a differenza dei grafici voglio tenermi tutto (behavioralSubject)
  // la casella delle selezioni è troppo attaccata alla seconda colonna

  // 3° problema
  // esportare in csv la selezione "live"

  // RDATA = [
  //   { time: "1461148591.6820002", rpm: 10, temperatura: 20, pressioneAcqua: 30, pressioneCaldaia: 40, pressostatoAria: 50 },
  //   { time: "1461149039.966", rpm: 60, temperatura: 70, pressioneAcqua: 80, pressioneCaldaia: 90, pressostatoAria: 100 },
  //   { time: "1461149026.889", rpm: 110, temperatura: 120, pressioneAcqua: 130, pressioneCaldaia: 140, pressostatoAria: 150 },
  //   { time: "1461148591.6820002", rpm: 10, temperatura: 20, pressioneAcqua: 30, pressioneCaldaia: 40, pressostatoAria: 50 },
  //   { time: "1461149039.966", rpm: 60, temperatura: 70, pressioneAcqua: 80, pressioneCaldaia: 90, pressostatoAria: 100 },
  //   { time: "1461149026.889", rpm: 110, temperatura: 120, pressioneAcqua: 130, pressioneCaldaia: 140, pressostatoAria: 150 },
  //   { time: "1461148591.6820002", rpm: 10, temperatura: 20, pressioneAcqua: 30, pressioneCaldaia: 40, pressostatoAria: 50 },
  //   { time: "1461149039.966", rpm: 60, temperatura: 70, pressioneAcqua: 80, pressioneCaldaia: 90, pressostatoAria: 100 },
  //   { time: "1461149026.889", rpm: 110, temperatura: 120, pressioneAcqua: 130, pressioneCaldaia: 140, pressostatoAria: 150 },
  //   { time: "1461148591.6820002", rpm: 10, temperatura: 20, pressioneAcqua: 30, pressioneCaldaia: 40, pressostatoAria: 50 },
  //   { time: "1461149039.966", rpm: 60, temperatura: 70, pressioneAcqua: 80, pressioneCaldaia: 90, pressostatoAria: 100 },
  //   { time: "1461149026.889", rpm: 110, temperatura: 120, pressioneAcqua: 130, pressioneCaldaia: 140, pressostatoAria: 150 }
  // ];
  pageSizeOptions = [3, 12, 24, 36]
  displayedColumns: string[] = ['time', 'rpm', 'temperatura', 'pressioneAcqua', 'pressioneCaldaia', 'pressostatoAria'];
  dataSource = new MatTableDataSource();
  // timeFilter = new FormControl('');
  // rpmFilter = new FormControl('');
  // tempFilter = new FormControl('');
  // acqFilter = new FormControl('');
  // caldFilter = new FormControl('');
  // airFilter = new FormControl('');

  // filterValues = {
  //   time: "",
  //   rpm: "",
  //   temperatura: "",
  //   pressioneAcqua: "",
  //   pressioneCaldaia: "",
  //   pressostatoAria: ""
  // };

  // private dataStream: any;

  constructor(
    // private dataInjection: DataInjectionService,
    private http: HttpClient
  ) {
    this.dataSource.data = [];
    // this.dataSource.filterPredicate = this.createFilter();
    // this.selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);
    // this.dataSource.data = this.RDATA;
    // this.dataSource.data.push({ time: "1461148591.6820002", rpm: 10, temperatura: 20, pressioneAcqua: 30, pressioneCaldaia: 40, pressostatoAria: 50 });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.dataStream = this.dataInjection.data.subscribe((msg: any) => {
    //   // this.dataStream = this.dataSource.connect().asObservable().subscribe((msg: any) => {
    //   var content = JSON.parse(msg.y);
    //   console.log("table!");
    //   const data = this.dataSource.data;
    //   data.push(content);
    //   this.dataSource.data = data;
    //   // this.dataSource.data.push(content);
    //   // this.dataSource.data = content;
    //   // console.log(this.dataSource.data);
    //   // this.changeDetectorRefs.detectChanges();
    // })

    // this.timeFilter.valueChanges
    //   .subscribe(
    //     time => {
    //       this.filterValues.time = time;
    //       this.dataSource.filter = JSON.stringify(this.filterValues);
    //     }
    //   )
    // this.rpmFilter.valueChanges
    //   .subscribe(
    //     rpm => {
    //       this.filterValues.rpm = rpm;
    //       this.dataSource.filter = JSON.stringify(this.filterValues);
    //     }
    //   )
    // this.tempFilter.valueChanges
    //   .subscribe(
    //     temp => {
    //       this.filterValues.temperatura = temp;
    //       this.dataSource.filter = JSON.stringify(this.filterValues);
    //     }
    //   )
    // this.acqFilter.valueChanges
    //   .subscribe(
    //     acq => {
    //       this.filterValues.pressioneAcqua = acq;
    //       this.dataSource.filter = JSON.stringify(this.filterValues);
    //     }
    //   )
    // this.caldFilter.valueChanges
    //   .subscribe(
    //     cald => {
    //       this.filterValues.pressioneCaldaia = cald;
    //       this.dataSource.filter = JSON.stringify(this.filterValues);
    //     }
    //   )
    // this.airFilter.valueChanges
    //   .subscribe(
    //     air => {
    //       this.filterValues.pressostatoAria = air;
    //       this.dataSource.filter = JSON.stringify(this.filterValues);
    //     }
    //   )
  }

  ngOnDestroy(): void {
    // this.dataStream.unsubscribe();
  }

  // createFilter(): (data: any, filter: string) => boolean {
  //   let filterFunction = function (data, filter): boolean {
  //     let searchTerms = JSON.parse(filter);
  //     return data.time.toLowerCase().indexOf(searchTerms.time) !== -1
  //       && data.rpm.toString().toLowerCase().indexOf(searchTerms.rpm) !== -1
  //       && data.temperatura.toString().toLowerCase().indexOf(searchTerms.temperatura) !== -1
  //       && data.pressioneCaldaia.toString().toLowerCase().indexOf(searchTerms.pressioneCaldaia) !== -1
  //       && data.pressostatoAria.toString().toLowerCase().indexOf(searchTerms.pressostatoAria) !== -1
  //       && data.pressioneAcqua.toString().toLowerCase().indexOf(searchTerms.pressioneAcqua) !== -1;
  //   }
  //   return filterFunction;
  // }

  // /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected == numRows;
  // }

  // /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   this.isAllSelected() ?
  //     this.selection.clear() :
  //     this.dataSource.data.forEach(row => this.selection.select(row));
  // }

  download() {
    console.log("download");
    /**
     * TODO: handle paginator issue
     * https://stackoverflow.com/questions/50398284/angular-material-data-table-export-to-excel
     * https://www.npmjs.com/package/xlsx
     * https://github.com/SheetJS/js-xlsx/tree/1eb1ec985a640b71c5b5bbe006e240f45cf239ab/demos/angular2
     * https://stackblitz.com/edit/angular-uyanwz?file=app%2Ftable-basic-example.ts
     */
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'SheetJS.xlsx');
  }

  reset() {
    console.log("reset form");
    this.rpmFx.f = null;
    this.rpmFx.selected = 'none';
    this.rpmFx.isDisabled = true;

    this.tempFx.f = null;
    this.tempFx.selected = 'none';
    this.tempFx.isDisabled = true;

    this.acqFx.f = null;
    this.acqFx.selected = 'none';
    this.acqFx.isDisabled = true;

    this.caldFx.f = null;
    this.caldFx.selected = 'none';
    this.caldFx.isDisabled = true;

    this.ariaFx.f = null;
    this.ariaFx.selected = 'none';
    this.ariaFx.isDisabled = true;

    // this.timeFilter.setValue("");
    // this.rpmFilter.setValue("");
    // this.tempFilter.setValue("");
    // this.acqFilter.setValue("");
    // this.caldFilter.setValue("");
    // this.airFilter.setValue("");
  }

  currentFilters() {
    return new Array(
      this.rpmFx,
      this.tempFx,
      this.acqFx,
      this.caldFx,
      this.ariaFx
    ).map((x) => {
      return x.toString();
    }).filter((y) => {
      if (y != '') {
        return y;
      }
    }).join("&");
  }

  get() {
    var baseEndPoint = 'http://localhost:5432/api/data';
    var selection = this.currentFilters();
    if (selection != '') {
      baseEndPoint += ("?" + selection);
    }
    console.log(baseEndPoint);
    this.http.get(baseEndPoint).subscribe((response: any) => {
      // console.log(response);
      this.dataSource.data = response;
    });
  }

}
