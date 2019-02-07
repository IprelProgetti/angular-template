import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataInjectionService } from '../data-injection.service';

@Component({
  selector: 'app-live-rpm',
  templateUrl: './live-fusion.component.html',
  styleUrls: ['./live-fusion.component.css']
})
export class LiveRpmComponent implements OnInit, OnDestroy {
  graphWidth: string = "100%";
  graphHeight: string = "150";
  graphType: string = "hlineargauge";
  graphTitle: string = "RPM";
  graphTheme: string = "fusion";

  dataFormat: string = "json";
  dataSource: any;
  whoAmI: string = "RPM";

  private dataStream: any;

  constructor(
    private dataInjection: DataInjectionService
    ) {
    // Initialize dataSource
    this.dataSource = {
      "chart": {
        "theme": this.graphTheme,
        "caption": this.graphTitle,
        "lowerLimit": "0",
        "upperLimit": "1000",
        "numberSuffix": " RPM",
        "valueFontSize": "12",
        "valueFontBold": "0"
      },
      "colorRange": {
          "color": [{
              "minValue": "0",
              "maxValue": "549",
              "label": "Low"
          }, {
              "minValue": "550",
              "maxValue": "699",
              "label": "Moderate"
          }, {
              "minValue": "700",
              "maxValue": "1000",
              "label": "High"
          }]
      },
      "pointers": {
          "pointer": [{
              "value": "0"
          }]
      }
    };
   }

  ngOnInit() {
    this.dataStream = this.dataInjection.getTopic(this.whoAmI).subscribe((newValue: any) => {
      this.dataSource.pointers.pointer[0].value = newValue;
      console.log(this.whoAmI + ": " + newValue);
    })
  }

  ngOnDestroy(){
    this.dataStream.unsubscribe();
  }

}
