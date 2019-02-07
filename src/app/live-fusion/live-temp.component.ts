import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataInjectionService } from '../data-injection.service';

@Component({
  selector: 'app-live-temp',
  templateUrl: './live-fusion.component.html',
  styleUrls: ['./live-fusion.component.css']
})
export class LiveTempComponent implements OnInit, OnDestroy {
  graphWidth: string = "100%";
  graphHeight: string = "250";
  graphType: string = "thermometer";
  graphTitle: string = "Temperatura";
  graphTheme: string = "fusion";

  dataFormat: string = "json";
  dataSource: any;
  whoAmI: string = "Temperatura";

  private dataStream: any;

  constructor(
    private dataInjection: DataInjectionService
  ) {
    // Initialize dataSource
    this.dataSource = {
      "chart": {
          "caption": this.graphTitle,
          "theme": this.graphTheme,
          "lowerLimit": "0",
          "upperLimit": "100",
          "decimals": "1",
          "numberSuffix": "°C",
          "showhovereffect": "1",
          "showvalue": "1",
          "thmFillColor": "#008ee4",
          "showGaugeBorder": "1",
          "gaugeBorderColor": "#008ee4",
          "gaugeBorderThickness": "2",
          "gaugeBorderAlpha": "30",
          "valueFontColor": "#000000"
      },
      "value": "0"
  };
   }

  ngOnInit() {
    this.dataStream = this.dataInjection.getTopic(this.whoAmI).subscribe((newValue: any) => {
      this.dataSource.value = newValue;
      console.log(this.whoAmI + ": " + newValue);
    })
  }

  ngOnDestroy(){
    this.dataStream.unsubscribe();
  }

}
