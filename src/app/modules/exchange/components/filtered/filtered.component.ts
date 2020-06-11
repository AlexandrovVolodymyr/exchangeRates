import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: 'app-filtered',
  templateUrl: './filtered.component.html',
  styleUrls: ['./filtered.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilteredComponent implements OnInit {

  filteredForm: FormGroup;
  @Input() currenciesByPeriod: any;
  @Input() periodFailed: boolean;
  @Output() periodEvent = new EventEmitter();
  private unsubscribe$: Subject<void> = new Subject();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.filteredForm = this.fb.group({
      date: [{
        begin: '',
        end: ''
      }]
    });

    this.filteredForm.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(period => this.periodEvent.emit(period));
  }

  resetForm() {
    this.filteredForm.reset();
  }

}
