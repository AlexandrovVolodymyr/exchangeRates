import { EntityState } from "@ngrx/entity";

import { Currencies } from "../../../modules/exchange/interfaces/currencies";

export interface ExchangeState extends EntityState<any>{
  currencies: Currencies,
  currenciesFrom: Currencies,
  currencyFrom: string,
  convertValues: {
    valueFrom: string,
    currencyFrom: string,
    currencyTo: string
  }
  convertResult: {
    amount: number,
    base: string,
    date: string,
    rates: {}
  },
  period: {
    begin: string | Date,
    end: string | Date
  },
  periodCurrencies: {
    amount: number,
    base: string,
    start_date: string,
    end_date: string,
    rates: {}
  }
  loading: boolean;
  error: string
}

export const initialState: ExchangeState = {
  ids: [],
  entities: {},
  currencies: null,
  currenciesFrom: null,
  currencyFrom: '',
  convertValues: {
    valueFrom: '',
    currencyFrom: '',
    currencyTo: ''
  },
  convertResult: {
    amount: null,
    base: '',
    date: '',
    rates: {}
  },
  period: {
    begin: null,
    end: null
  },
  periodCurrencies: {
    amount: null,
    base: '',
    start_date: '',
    end_date: '',
    rates: {}
  },
  loading: false,
  error: null
};
