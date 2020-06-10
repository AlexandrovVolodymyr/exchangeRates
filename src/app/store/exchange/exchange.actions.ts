import { Action } from "@ngrx/store";

export enum exchangeActionsType {
  get = '[EXCHANGE] Get All Currencies'
}

export class ExchangeGetAction implements Action {
  readonly type = exchangeActionsType.get;
}
