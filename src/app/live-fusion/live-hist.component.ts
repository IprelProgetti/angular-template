import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-live-hist',
  templateUrl: './live-fusion.component.html',
  styleUrls: ['./live-fusion.component.css']
})
export class LiveHistComponent implements OnInit, OnDestroy {
  graphWidth: string = "100%";
  graphHeight: string = "500";
  graphType: string = "column2D";
  graphTitle: string = "Valore Sensori";
  graphTheme: string = "fusion";

  dataFormat: string = "json";
  dataSource: any;

  private topic = "Mix";
  private url = 'http://localhost:8091';
  private socket: any;
  private dataSourceConnection: any;

  private dataStreamSource = function getLiveDataSource() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on(this.topic, (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    })
    return observable;
  }

  constructor() {
    // Initialize dataSource
    this.dataSource = {
      chart: { 
        "caption": this.graphTitle,
        "theme": this.graphTheme,
        "subCaption": "variazioni in tempo reale",
        "xAxisName": "Grandezza",
        "yAxisName": "Valore",
        "showvalue": "1",
      },
      data: [
        {label: "RPM", value: 0},
        {label: "Temp.", value: 0},
        {label: "Pr. Acqua", value: 0},
        {label: "Pr. Caldaia", value: 0},
        {label: "Pr. Aria", value: 0},
      ]
    };
   }

  ngOnInit() {
    this.dataSourceConnection = this.dataStreamSource().subscribe((msg: any) => {
      // Get data from websocket
      // Populate graph
      // TODO: use websocket as dataSource
      var content = JSON.parse(msg.y);

      // console.log("new production: "+ key + " "+ val);
      this.dataSource.data[0].value = parseFloat(content[Object.keys(content)[0]]);
      this.dataSource.data[1].value = parseFloat(content[Object.keys(content)[1]]);
      this.dataSource.data[2].value = parseFloat(content[Object.keys(content)[2]]);
      this.dataSource.data[3].value = parseFloat(content[Object.keys(content)[3]]);
      this.dataSource.data[4].value = parseFloat(content[Object.keys(content)[4]]);
    })
  }

  ngOnDestroy(){
    this.dataSourceConnection.unsubscribe();
  }

}
