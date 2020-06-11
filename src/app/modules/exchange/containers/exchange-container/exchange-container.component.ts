import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { ExchangeApiService } from "../../services/exchange-api.service";
import { map, pluck, takeUntil, tap } from "rxjs/operators";
import { Currencies } from "../../interfaces/currencies";
import { Store } from "@ngrx/store";
import * as ExchangeActions from "../../../../store/exchange/actions/exchange.actions";
import { ExchangeState } from "../../../../store/exchange/state/exchange.state";
import {
  convertCurrencies,
  currencies,
  currenciesFrom, periodCurrencies
} from "../../../../store/exchange/state/exchange-state.selectors";

@Component({
  selector: 'app-exchange-container',
  templateUrl: './exchange-container.component.html',
  styleUrls: ['./exchange-container.component.scss']
})
export class ExchangeContainerComponent implements OnInit, OnDestroy {

  currencyTo: any;
  defaultCurrency: string = 'EUR';
  periodFailed = false;

  currenciesAll$: Observable<any>;
  currencies$: Observable<Currencies>;
  currencyTo$: Observable<any>;
  periodCurrencies$: Observable<any>;

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
          return {...currencies.rates, ...{'EUR': 1}};
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
      this.periodFailed = true;
      this.store.dispatch(ExchangeActions.periodFail({ error: true }));
    }
  }

  private getData(value: string) {
    this.store.dispatch(ExchangeActions.getFrom({ currency: value }));
    this.currencies$ = this.store
      .pipe(currenciesFrom, takeUntil(this.unsubscribe$))
  }

  convert({ valueFrom: amount, currencyFrom: from, currencyTo: to }) {
    this.store.dispatch(ExchangeActions.convertValue({ amount, from, to }));
    this.currencyTo$ = this.store
      .pipe(
        convertCurrencies,
        map(res => Object.values(res['rates'])[0]),
        takeUntil(this.unsubscribe$)
      )
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
