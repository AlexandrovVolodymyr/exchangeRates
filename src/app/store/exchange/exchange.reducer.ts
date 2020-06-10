import { Currencies } from "../../modules/exchange/interfaces/currencies";

export const EXCHANGE_REDUCER_NODE = 'exchange';

export interface ExchangeState {
  currencies: Currencies
}

const initialState: ExchangeState = {
  currencies: null
}

export const exchangeReducer = (state: ExchangeState = initialState, actions) => {
  return state;
};
