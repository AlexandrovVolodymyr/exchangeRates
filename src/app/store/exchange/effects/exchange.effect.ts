import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { of } from "rxjs";

import { ExchangeApiService } from "../../../modules/exchange/services/exchange-api.service";
import * as ExchangeActions from "../actions/exchange.actions";

@Injectable()
export class ExchangeEffect {
  constructor(
    private actions$: Actions,
    private exchangeService: ExchangeApiService
  ) {}

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExchangeActions.getAll),
      mergeMap(() => this.exchangeService.getAll()),
      map(currencies => ExchangeActions.getAllSuccess({ currencies })),
      catchError((error) => of(ExchangeActions.getAllFail({ error })))
    )
  );

  getFrom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExchangeActions.getFrom),
      mergeMap( ({ currency }) => this.exchangeService.getFrom(currency)),
      map(currenciesFrom => ExchangeActions.getFromSuccess({ currenciesFrom })),
      catchError((error) => of(ExchangeActions.getFromFail({ error })))
    )
  );

  convertValue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExchangeActions.convertValue),
      mergeMap((payload) => this.exchangeService.convertCurrency(payload)),
      map(convertResult => ExchangeActions.convertValueSuccess( { convertResult })),
      catchError((error) => of(ExchangeActions.convertValueFail({ error })))
    )
  );

  periodCurrencies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExchangeActions.period),
      switchMap((payload) => this.exchangeService.getByPeriod(payload)
        .pipe(
          map(periodCurrencies => ExchangeActions.periodSuccess({ periodCurrencies })),
          catchError((error) => of(ExchangeActions.periodFail({ error })))
        )
      ),
    )
  );
}
