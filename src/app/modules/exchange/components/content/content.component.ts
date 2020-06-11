import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Currencies } from "../../interfaces/currencies";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent implements OnInit {

  @Input() currencies: Currencies;

  constructor() { }

  ngOnInit(): void {}

}
