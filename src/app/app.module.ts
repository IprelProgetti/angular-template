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

import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule, Routes } from "@angular/router";

import { LinkOneComponent } from './link1/linkone.component';
import { LinkTwoComponent } from './link2/linktwo.component';
import { LinkThreeComponent } from './link3/linkthree.component';
import { HttpClientModule } from '@angular/common/http';


const appRoutes: Routes = [
  { path: '', component: LinkOneComponent, data: { title: 'Link 1' } },
  { path: 'link1', component: LinkOneComponent, data: { title: 'Link 1' } },
  { path: 'link2', component: LinkTwoComponent, data: { title: 'Link 2' } },
  { path: 'link3', component: LinkThreeComponent, data: { title: 'Link 3' } }
];

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    LinkOneComponent,
    LinkTwoComponent,
    LinkThreeComponent
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
    RouterModule.forRoot(
      appRoutes,
      { useHash: true }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
