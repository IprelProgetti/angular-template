import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataInjectionService } from '../data-injection.service';

@Component({
  selector: 'app-live-acqua',
  templateUrl: './live-fusion.component.html',
  styleUrls: ['./live-fusion.component.css']
})
export class LiveAcquaComponent implements OnInit, OnDestroy {
  graphWidth: string = "100%";
  graphHeight: string = "250";
  graphType: string = "angulargauge";
  graphTitle: string = "Pressione Acqua";
  graphTheme: string = "fusion";

  dataFormat: string = "json";
  dataSource: any;
  whoAmI: string = "pressioneAcqua";

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
        "upperLimit": "20",
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
                  "maxValue": "5",
                  "code": "#6baa01"
              },
              {
                  "minValue": "6",
                  "maxValue": "10",
                  "code": "#f8bd19"
              },
              {
                  "minValue": "10",
                  "maxValue": "20",
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
