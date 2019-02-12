import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { 
  MatButtonModule, 
  MatCheckboxModule, 
  MatToolbarModule, 
  MatSidenavModule, 
  MatIconModule, 
  MatListModule,
  MatTabsModule,
  MatSortModule,
  MatPaginatorModule,
  MatTableModule,
  MatInputModule,
  MatGridListModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatSelectModule
} from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FusionChartsModule } from 'angular-fusioncharts';

import * as FusionCharts from 'fusioncharts';
import * as FusionWidgets from 'fusioncharts/fusioncharts.widgets'
import * as FusionTime from 'fusioncharts/fusioncharts.timeseries'
import * as Charts from 'fusioncharts/fusioncharts.charts';

import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import * as CandyTheme from 'fusioncharts/themes/fusioncharts.theme.candy';
import * as CarbonTheme from 'fusioncharts/themes/fusioncharts.theme.carbon';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import * as GammelTheme from 'fusioncharts/themes/fusioncharts.theme.gammel';
import * as OceanTheme from 'fusioncharts/themes/fusioncharts.theme.ocean';
import * as ZuneTheme from 'fusioncharts/themes/fusioncharts.theme.zune';

FusionChartsModule.fcRoot(
  FusionCharts, FusionWidgets, FusionTime,
  Charts, 
  FusionTheme, CandyTheme, CarbonTheme, FintTheme, GammelTheme, OceanTheme, ZuneTheme
)

import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule, Routes } from "@angular/router";

import { PassatoComponent } from './passato/passato.component';
import { PresenteComponent } from './presente/presente.component';
import { FuturoComponent } from './futuro/futuro.component';
import { LiveHistComponent } from './live-fusion/live-hist.component';
import { LiveRpmComponent } from './live-fusion/live-rpm.component';
import { LiveTempComponent } from './live-fusion/live-temp.component';
import { LiveAcquaComponent } from './live-fusion/live-acqua.component';
import { LiveAriaComponent } from './live-fusion/live-aria.component';
import { LiveCaldaiaComponent } from './live-fusion/live-caldaia.component';
import { DataInjectionService } from './data-injection.service';
import { ActiveTableComponent } from './active-table/active-table.component'
import { HttpClientModule } from '@angular/common/http';
import { NumericFilterComponent } from './numeric-filter/numeric-filter.component';
import { DateTimeComponent } from './date-time/date-time.component';

const appRoutes: Routes = [
  { path: '', component: PresenteComponent, data: { title: 'Live Dati' } },
  { path: 'passato', component: PassatoComponent, data: { title: 'Storico Dati' } },
  { path: 'presente', component: PresenteComponent, data: { title: 'Live Dati' } },
  { path: 'futuro', component: FuturoComponent, data: { title: 'Manutenzioni Future' } }
];

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    PassatoComponent,
    PresenteComponent,
    FuturoComponent,
    LiveHistComponent,
    LiveRpmComponent,
    LiveTempComponent,
    LiveAcquaComponent,
    LiveAriaComponent,
    LiveCaldaiaComponent,
    ActiveTableComponent,
    NumericFilterComponent,
    DateTimeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule, 
    MatCheckboxModule, 
    MatSelectModule,
    LayoutModule, 
    MatToolbarModule, 
    MatSidenavModule, 
    MatIconModule, 
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatTabsModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatGridListModule,
    FormsModule, 
    ReactiveFormsModule,
    FusionChartsModule,
    RouterModule.forRoot(
      appRoutes,
      { useHash: true }
    ),
  ],
  providers: [DataInjectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
