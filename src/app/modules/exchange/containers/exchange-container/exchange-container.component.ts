import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from "rxjs";
import { ExchangeApiService } from "../../services/exchange-api.service";
import { takeUntil, tap } from "rxjs/operators";
import { Currencies } from "../../interfaces/currencies";

@Component({
  selector: 'app-exchange-container',
  templateUrl: './exchange-container.component.html',
  styleUrls: ['./exchange-container.component.scss']
})
export class ExchangeContainerComponent implements OnInit, OnDestroy {

  currencies: Currencies;
  currenciesAll: Currencies;
  currencyTo: any;
  currenciesByPeriod: any = [];
  defaultCurrency: string = 'EUR';
  periodKeys: string[];
  periodFailed = false;
  private unsubscribe$: Subject<void> = new Subject();

  constructor(private exchangeApiService: ExchangeApiService) { }

  ngOnInit(): void {
    this.getData(this.defaultCurrency);

    this.exchangeApiService.getAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.currenciesAll = data;
        this.currenciesAll.rates['EUR'] = 1;
      });
  }

  selectedValue(value: string) {
    this.defaultCurrency = value;
    this.exchangeApiService.getFrom(value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.currencies = data;
      });
    // if (value !== 'EUR') {
    //   this.exchangeApiService.getTo(value)
    //     .pipe(takeUntil(this.unsubscribe$))
    //     .subscribe(data => this.currencies = data);
    // } else {
    //   this.getData();
    // }
  }

  filterByPeriod(period: any) {
    if (period.date) {
      this.exchangeApiService.getByPeriod(period.date)
        .pipe(
          tap(period => {
            this.periodKeys = Object.keys(period.rates);
          }),
          takeUntil(this.unsubscribe$)
        )
        .subscribe(data => {
          for(let i = 0; i < this.periodKeys.length; i++) {
            this.currenciesByPeriod.push(data.rates[this.periodKeys[i]]);
          }
          this.periodFailed = false;
        }, error => {
          console.log(error);
          this.periodFailed = true;
        });
    } else {
      this.getData(this.defaultCurrency);
    }
  }

  private getData(value: string) {
    this.exchangeApiService.getFrom(value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => this.currencies = data);
  }

  convert(values) {
    this.exchangeApiService.convertCurrency(values)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => this.currencyTo = Object.values(data.rates)[0]);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
