import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataInjectionService } from '../data-injection.service';

@Component({
  selector: 'app-live-aria',
  templateUrl: './live-fusion.component.html',
  styleUrls: ['./live-fusion.component.css']
})
export class LiveAriaComponent implements OnInit, OnDestroy {
  graphWidth: string = "100%";
  graphHeight: string = "130";
  graphType: string = "bulb";
  graphTitle: string = "Pressostato Aria";
  graphTheme: string = "fusion";

  dataFormat: string = "json";
  dataSource: any;
  whoAmI: string = "pressostatoAria";

  private dataStream: any;

  constructor(
    private dataInjection: DataInjectionService
  ) {
    // Initialize dataSource
    this.dataSource = {
      "chart": {
        "caption": this.graphTitle,
        "theme": this.graphTheme,
        "upperlimit": "10",
        "lowerlimit": "-5",
        "showshadow": "0",
        "showvalue": "0",
        "placeValuesInside": "1",
        "valueFontSize": "12"
      },
      "colorrange": {
        "color": [{
          "minvalue": "-5",
          "maxvalue": "0",
          "label": "off",
          "code": "#ff0000"  //rosso
        }, {
          "minvalue": "1",
          "maxvalue": "10",
          "label": "on",
          "code": "#00ff00"  //verde
        }]
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
