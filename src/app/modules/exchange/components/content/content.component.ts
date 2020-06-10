import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Currencies} from "../../interfaces/currencies";
import {FormBuilder, FormGroup} from "@angular/forms";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  @Input() currencies: Currencies;

  constructor() { }

  ngOnInit(): void {}

}
