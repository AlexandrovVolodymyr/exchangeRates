import { createFeatureSelector, createSelector, select } from "@ngrx/store";

import { pipe } from "rxjs";
import { filter } from "rxjs/operators";

import { ExchangeState } from "./exchange.state";
import { feature } from "../actions/exchange.actions";

export const selectCurrenciesState = createFeatureSelector<ExchangeState>(feature);

export const selectCurrencies = createSelector(
  selectCurrenciesState,
  (state: ExchangeState) => state.currencies
)

export const selectCurrenciesFrom = createSelector(
  selectCurrenciesState,
  (state: ExchangeState) => state.currenciesFrom
)

export const selectConvertCurrencies = createSelector(
  selectCurrenciesState,
  (state: ExchangeState) => state.convertResult
)

export const selectPeriodCurrencies = createSelector(
  selectCurrenciesState,
  (state: ExchangeState) => state.periodCurrencies
)

export const currencies = pipe(
  select(selectCurrencies),
  filter(v => !!v)
);

export const currenciesFrom = pipe(
  select(selectCurrenciesFrom),
  filter(v => !!v)
);

export const convertCurrencies = pipe(
  select(selectConvertCurrencies),
  filter(v => !!v)
)

export const periodCurrencies = pipe(
  select(selectPeriodCurrencies),
  filter(v => !!v)
)
