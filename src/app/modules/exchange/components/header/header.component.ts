import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Currencies} from "../../interfaces/currencies";
import {MatOptionSelectionChange} from "@angular/material/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  selectedValue = 'EUR';
  @Input() currencies: any;

  @Output() onSelectedValue = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }
}
