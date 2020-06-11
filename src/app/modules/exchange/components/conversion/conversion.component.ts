import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { Currencies } from "../../interfaces/currencies";

@Component({
  selector: 'app-conversion',
  templateUrl: './conversion.component.html',
  styleUrls: ['./conversion.component.scss']
})
export class ConversionComponent implements OnInit, OnDestroy {

  conversionForm: FormGroup;
  @Input() currencies: any;
  @Input() currencyTo: any;
  @Output() submitEvent = new EventEmitter();

  private unsubscribe$: Subject<void> = new Subject();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.conversionForm = this.fb.group({
      valueFrom: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      currencyFrom: ['EUR'],
      currencyTo: ['USD']
    }, { validator: CompareCurrency});

    this.conversionForm.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(values => {
        const { amount, from, to } = this.conversionForm.value;
        if (this.conversionForm.valid) {
          this.submitEvent.emit(this.conversionForm.value);
        } else {
          this.currencyTo = null;
        }
      })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}

const CompareCurrency: ValidatorFn = (fg: FormGroup) => {
  const from = fg.get('currencyFrom').value;
  const to = fg.get('currencyTo').value;
  return from !== to
    ? null
    : { compare: true };
};
