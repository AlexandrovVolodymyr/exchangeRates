import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { reducer } from "./reducers/exchange.reducer";
import { feature } from "./actions/exchange.actions";
import { EffectsModule } from "@ngrx/effects";
import { ExchangeEffect } from "./effects/exchange.effect";

@NgModule({
  imports: [
    StoreModule.forFeature(feature, reducer),
    EffectsModule.forFeature([ExchangeEffect])
  ],
  providers: [
    ExchangeEffect
  ]
})
export class ExchangeStateModule {}
