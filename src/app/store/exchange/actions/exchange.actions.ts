import { createAction, props } from "@ngrx/store";

export const feature = 'Currencies';

export const getAll = createAction(`[${feature}] Get All`);
export const getAllSuccess = createAction(`[${feature}] Get All Success`, props<{ currencies }>());
export const getAllFail = createAction(`[${feature}] Get All Error`, props<{ error }>());

export const getFrom = createAction(`[${feature}] Get From EUR`, props<{ currency }>());
export const getFromSuccess = createAction(`[${feature}] Get From EUR Success`, props<{ currenciesFrom }>());
export const getFromFail = createAction(`[${feature}] Get From EUR Error`, props<{ error }>());

export const convertValue = createAction(`[${feature}] Convert Value`, props<{ amount, from, to }>());
export const convertValueSuccess = createAction(`[${feature}] Convert Value Success`, props<{ convertResult }>());
export const convertValueFail = createAction(`[${feature}] Convert Value Error`, props<{ error }>());

export const period = createAction(`[${feature}] By Period`, props<{ begin, end }>());
export const periodSuccess = createAction(`[${feature}] By Period Success`, props<{ periodCurrencies }>());
export const periodFail = createAction(`[${feature}] By Period Error`, props<{ error }>());
