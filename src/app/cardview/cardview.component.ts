import { Component, OnInit } from '@angular/core';
import { title } from 'process';
import * as data from '../../assets/cats.json';
import { DataService } from '../shared/data.service';
import { ICats } from '../shared/interface';

@Component({
  selector: 'app-cardview',
  templateUrl: './cardview.component.html',
  styleUrls: ['./cardview.component.css'],
  providers: [DataService],
})
export class CardviewComponent {
  cats: ICats[];
  title: string;
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService
      .getCats('562346672')
      .subscribe((cats: ICats[]) => (this.cats = cats));
    this.title = JSON.stringify(this.cats);
  }
}
