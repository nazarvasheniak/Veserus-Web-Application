import { NgModule } from '@angular/core';

import { MarketHeaderComponent } from './components';
import { OrderBookComponent } from './components';
import { TradeHistoryComponent } from './components';
import { OpenOrdersComponent } from './components';

@NgModule({
  providers: [

  ],
  imports: [
  ],
  declarations: [
    MarketHeaderComponent,
    OrderBookComponent,
    TradeHistoryComponent,
    OpenOrdersComponent
  ],
  exports: [
  ]
})

export class MarketModule { }
