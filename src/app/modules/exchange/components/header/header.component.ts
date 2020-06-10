import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Currencies} from "../../interfaces/currencies";
import {MatOptionSelectionChange} from "@angular/material/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() currencies: Currencies;
  selectedValue = 'EUR';

  @Output() onSelectedValue = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
}
