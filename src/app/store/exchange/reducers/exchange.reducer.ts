import { Action, createReducer, on } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

import { ExchangeState, initialState } from "../state/exchange.state";
import { Currencies } from "../../../modules/exchange/interfaces/currencies";
import * as ExchangeActions from "../actions/exchange.actions";

export const exchangeAdapter: EntityAdapter<Currencies> = createEntityAdapter<Currencies>();

const exchangeInitialState = exchangeAdapter.getInitialState(initialState);

const currencyReducer = createReducer(
  exchangeInitialState,
  on(ExchangeActions.getAll, (state) => {
    return {
      ...state,
      loading: true
    }
  }),
  on(ExchangeActions.getAllSuccess, (state, { currencies }) => {
    return {
      ...state,
      currencies,
      loading: false
    }
  }),
  on(ExchangeActions.getAllFail, (state, { error }) => {
    console.error(error);
    return {
      ...state,
      error,
      loading: false
    }
  }),
  on(ExchangeActions.getFrom, (state, { currency }) => {
    return {
      ...state,
      currencyFrom: currency,
      loading: true
    }
  }),
  on(ExchangeActions.getFromSuccess, (state, { currenciesFrom }) => {
    return {
      ...state,
      currenciesFrom,
      loading: false
    }
  }),
  on(ExchangeActions.getFromFail, (state, { error }) => {
    console.error(error);
    return {
      ...state,
      error,
      loading: false
    }
  }),
  on(ExchangeActions.convertValue, (state, { amount, from, to }) => {
    return {
      ...state,
      convertValues: {
        valueFrom: amount,
        currencyFrom: from,
        currencyTo: to
      },
      loading: true
    }
  }),
  on(ExchangeActions.convertValueSuccess, (state, { convertResult }) => {
    return {
      ...state,
      convertResult,
      loading: true
    }
  }),
  on(ExchangeActions.convertValueFail, (state, { error }) => {
    console.error(error);
    return {
      ...state,
      error,
      loading: false
    }
  }),
  on(ExchangeActions.period, (state, { begin, end }) => {
    return {
      ...state,
      period: {
        begin,
        end
      },
      loading: true
    }
  }),
  on(ExchangeActions.periodSuccess, (state, { periodCurrencies }) => {
    return {
      ...state,
      periodCurrencies,
      loading: false
    }
  }),
  on(ExchangeActions.periodFail, (state, { error }) => {
    return {
      ...state,
      periodCurrencies: {
        rates: {}
      },
      error,
      loading: false
    }
  })
);

export function reducer(state: ExchangeState | undefined, action: Action) {
  return currencyReducer(state, action);
}
