import { Component, OnInit, Input } from '@angular/core';
import { ICats } from '../../shared/interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  //passing gets cat object from cardview
  private _cats: ICats[] = [];
  @Input() get cats(): ICats[] {
    return this._cats;
  }

  set cats(value: ICats[]) {
    if (value) {
      this._cats = this.catslist = value;
    }
  }

  catslist: ICats[] = [];

  constructor() {}

  ngOnInit() {}
}
