import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Currencies } from "../interfaces/currencies";

@Injectable({
  providedIn: 'root'
})
export class ExchangeApiService {

  constructor(private http: HttpClient) { }

  get(): Observable<Currencies> {
    return this.http.get<Currencies>('https://api.frankfurter.app/latest');
  }

  getFrom(): Observable<Currencies> {
    return this.http.get<Currencies>(`https://api.frankfurter.app/latest?from=EUR`);
  }

  getTo(value: string): Observable<Currencies> {
    return this.http.get<Currencies>(`https://api.frankfurter.app/latest?to=${value}`);
  }

  getDateFrom(date): Observable<Currencies> {
    const from = new Date(date.begin);
    const fromDate = from.getDate() < 10 ? ("0" + from.getDate()) : from.getDate();
    const begin = from.getFullYear()  + "-" + ("0" + (from.getMonth()+1)) + "-" + fromDate;

    return this.http.get<Currencies>(`https://api.frankfurter.app/${begin}`);
  }

  getByPeriod(date): Observable<any> {
    const from = new Date(date.begin);
    const fromDate = from.getDate() < 10 ? ("0" + from.getDate()) : from.getDate();
    const begin = from.getFullYear()  + "-" + ("0" + (from.getMonth()+1)) + "-" + fromDate;

    const to = new Date(date.end);
    const toDate = to.getDate() < 10 ? ("0" + to.getDate()) : to.getDate();
    const end = to.getFullYear()  + "-" + ("0" + (to.getMonth()+1)) + "-" + toDate;

    return this.http.get(`https://api.frankfurter.app/${begin}..${end}`);
  }

  convertCurrency(values): Observable<any> {
    return this.http.get<any>(`https://api.frankfurter.app/latest?amount=${values.valueFrom}&from=${values.currencyFrom}&to=${values.currencyTo}`);
  }
}
