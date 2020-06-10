import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Currencies } from "../interfaces/currencies";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ExchangeApiService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Currencies> {
    return this.http.get<Currencies>('https://api.frankfurter.app/latest');
  }

  getFrom(value: string): Observable<Currencies> {
    return this.http.get<Currencies>(`https://api.frankfurter.app/latest?from=${value}`);
  }

  getTo(value: string): Observable<Currencies> {
    return this.http.get<Currencies>(`https://api.frankfurter.app/latest?to=${value}`);
  }

  getDateFrom(date): Observable<Currencies> {
    const begin = moment(date.begin).format('YYYY-MM-DD');

    return this.http.get<Currencies>(`https://api.frankfurter.app/${begin}`);
  }

  getByPeriod(date): Observable<any> {
    const begin = moment(date.begin).format('YYYY-MM-DD');
    const end = moment(date.end).format('YYYY-MM-DD');

    return this.http.get(`https://api.frankfurter.app/${begin}..${end}`);
  }

  convertCurrency(values): Observable<any> {
    return this.http.get<any>(`https://api.frankfurter.app/latest?amount=${values.valueFrom}&from=${values.currencyFrom}&to=${values.currencyTo}`);
  }
}
