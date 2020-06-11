import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
