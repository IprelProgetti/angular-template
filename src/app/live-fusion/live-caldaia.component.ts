import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataInjectionService } from '../data-injection.service';

@Component({
  selector: 'app-live-caldaia',
  templateUrl: './live-fusion.component.html',
  styleUrls: ['./live-fusion.component.css']
})
export class LiveCaldaiaComponent implements OnInit, OnDestroy {
  graphWidth: string = "100%";
  graphHeight: string = "250";
  graphType: string = "angulargauge";
  graphTitle: string = "Pressione Caldaia";
  graphTheme: string = "fusion";

  dataFormat: string = "json";
  dataSource: any;
  whoAmI: string = "pressioneCaldaia";

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
        "upperLimit": "2100",
        // "gaugeFillMix": "{dark-30},{light-60},{dark-10}",
        // "gaugeFillRatio": "15",
        "pivotRadius": "10",
        // "gaugeOuterRadius": "180",
        // "gaugeInnerRadius": "120",
        "showvalue": "1",
        "majorTMNumber": "9",
        "minorTMNumber": "4"
      },
      "colorRange": {
          "color": [
              {
                  "minValue": "0",
                  "maxValue": "1099",
                  "code": "#6baa01"
              },
              {
                  "minValue": "1100",
                  "maxValue": "1799",
                  "code": "#f8bd19"
              },
              {
                  "minValue": "1800",
                  "maxValue": "2100",
                  "code": "#e44a00"
              }
          ]
      },
      "dials": {
          "dial": [
              {
                  "value": "0"
              }
          ]
      }
    };
   }

  ngOnInit() {
    this.dataStream = this.dataInjection.getTopic(this.whoAmI).subscribe((newValue: any) => {
      this.dataSource.dials.dial[0].value = newValue;
      console.log(this.whoAmI + ": " + newValue);
    })
  }

  ngOnDestroy(){
    this.dataStream.unsubscribe();
  }

}
