import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";

import { Observable, Subject } from "rxjs";
import { map, pluck, takeUntil } from "rxjs/operators";

import { Currencies } from "../../interfaces/currencies";
import { ExchangeApiService } from "../../services/exchange-api.service";
import * as ExchangeActions from "../../../../store/exchange/actions/exchange.actions";
import { ExchangeState } from "../../../../store/exchange/state/exchange.state";
import {
  convertCurrencies,
  currencies,
  currenciesFrom,
  periodCurrencies
} from "../../../../store/exchange/state/exchange-state.selectors";

@Component({
  selector: 'app-exchange-container',
  templateUrl: './exchange-container.component.html',
  styleUrls: ['./exchange-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExchangeContainerComponent implements OnInit, OnDestroy {

  currencyTo: any;
  defaultCurrency: string = 'EUR';
  periodFailed = false;

  currenciesAll$: Observable<any>;
  currencies$: Observable<Currencies>;
  currencyTo$: Observable<any>;
  periodCurrencies$: Observable<{ dates: string[], currencies: any[] }>;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private exchangeApiService: ExchangeApiService,
    private store: Store<ExchangeState>
  ) { }

  ngOnInit(): void {
    this.getData(this.defaultCurrency);

    this.store.dispatch(ExchangeActions.getAll());

    this.currenciesAll$ = this.store
      .pipe(
        currencies,
        map(currencies => {
          return {...currencies.rates, ...{[this.defaultCurrency]: 1}};
        }),
        takeUntil(this.unsubscribe$)
      );

    this.periodCurrencies$ = this.store
      .pipe(
        periodCurrencies,
        pluck('rates'),
        map(rates => {
          const dates = Object.keys(rates);
          const currencies = Object.values(rates);
          return { dates, currencies };
        }),
        takeUntil(this.unsubscribe$)
      );

  }

  selectedValue(value: string) {
    this.defaultCurrency = value;

    this.getData(value);
  }

  filterByPeriod({ date }: any) {
    if (date) {
      const { begin, end } = date;
      this.store.dispatch(ExchangeActions.period({ begin, end }));
    } else {
      this.store.dispatch(ExchangeActions.periodClear());
    }
  }

  convert({ amount, from, to }) {
    this.store.dispatch(ExchangeActions.convertValue({ amount, from, to }));
    this.currencyTo$ = this.store
      .pipe(
        convertCurrencies,
        map(res => Object.values(res['rates'])[0]),
        takeUntil(this.unsubscribe$)
      )
  }

  private getData(value: string) {
    this.store.dispatch(ExchangeActions.getFrom({ currency: value }));
    this.currencies$ = this.store
      .pipe(currenciesFrom, takeUntil(this.unsubscribe$))
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
