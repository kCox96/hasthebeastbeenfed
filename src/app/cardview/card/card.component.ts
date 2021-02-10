import { Component, OnInit, Input } from '@angular/core';
import { ICat } from 'src/app/interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  private _cats: ICat[] = [];
  @Input() get cats(): ICat[] {
    return this._cats;
  }

  set cats(value: ICat[]) {
    if (value) {
      this._cats = this.catslist = value;
    }
  }

  catslist: ICat[] = [];

  constructor() {}

  ngOnInit() {}
}
