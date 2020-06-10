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
  currencyTo: any;
  currenciesByPeriod: any = [];
  periodKeys: string[];
  periodFailed = false;
  private unsubscribe$: Subject<void> = new Subject();

  constructor(private exchangeApiService: ExchangeApiService) { }

  ngOnInit(): void {
    this.getData();
  }

  selectedValue(value: string) {
    if (value !== 'EUR') {
      this.exchangeApiService.getTo(value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => this.currencies = data);
    } else {
      this.getData();
    }
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
            // console.log('period', data.rates[this.periodKeys[i]]);
            this.currenciesByPeriod.push(data.rates[this.periodKeys[i]]);
            // console.log('period', this.currenciesByPeriod);
          }
          this.periodFailed = false;
        }, error => {
          console.log(error);
          this.periodFailed = true;
        });
    } else {
      this.getData();
    }
  }

  private getData() {
    this.exchangeApiService.getFrom()
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
