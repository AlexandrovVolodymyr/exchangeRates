import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-conversion',
  templateUrl: './conversion.component.html',
  styleUrls: ['./conversion.component.scss']
})
export class ConversionComponent implements OnInit, OnDestroy {

  conversionForm: FormGroup;
  @Input() currencyTo: any;
  @Output() submitEvent = new EventEmitter();

  private unsubscribe$: Subject<void> = new Subject();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.conversionForm = this.fb.group({
      valueFrom: new FormControl(null, [Validators.pattern("^[0-9]*$")]),
      currencyFrom: new FormControl('EUR'),
      valueTo: new FormControl(this.currencyTo ? this.currencyTo : null),
      currencyTo: new FormControl('USD')
    });

    this.conversionForm.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(values => {
        this.submitEvent.emit(this.conversionForm.value);
      })
  }

  submitForm() {
    // this.submitEvent.emit(this.conversionForm.value);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
