import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { ChartModule } from 'angular2-highcharts';

import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/components';
import { SidebarComponent } from './common/components';
import { MarketHeaderComponent } from './market/components';
import { OrderBookComponent } from './market/components';
import { TradeHistoryComponent } from './market/components';
import { PriceChartComponent } from './common/components';
import { OpenOrdersComponent } from './market/components';

import { HttpModule, Http } from '@angular/http';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';

import { ProgressSpinner } from './common/components';

@NgModule({
  exports: [
    RouterModule,
    
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
})

export class MaterialModule { }

@NgModule({
    imports: [
      BrowserModule,
      RouterModule.forRoot(ROUTES),
      BrowserAnimationsModule,
      MaterialModule,
      MatNativeDateModule,
      ChartModule.forRoot(
        require('highcharts'),
        require('highcharts/highstock')
      ),
      BrowserModule,
      HttpModule,
    ],
    entryComponents: [
      
    ],
    declarations: [
      AppComponent,
      IndexComponent,
      SidebarComponent,
      MarketHeaderComponent,
      OrderBookComponent,
      TradeHistoryComponent,
      PriceChartComponent,
      OpenOrdersComponent,
    ],
    bootstrap: [
      AppComponent,
      IndexComponent,
      SidebarComponent,
      MarketHeaderComponent,
      OrderBookComponent,
      TradeHistoryComponent,
      PriceChartComponent,
      OpenOrdersComponent,
    ],
    providers: [],
})

export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
