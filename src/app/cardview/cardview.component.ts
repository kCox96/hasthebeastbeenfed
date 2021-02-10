import { Component, OnInit } from '@angular/core';
import * as data from './test.json';
import { ICat } from '../interface';

@Component({
  selector: 'app-cardview',
  templateUrl: './cardview.component.html',
  styleUrls: ['./cardview.component.css'],
})
export class CardviewComponent {
  cats: ICat[];
  title: string;
  constructor() {}

  ngOnInit() {
    this.cats = data.cats;
  }
}
