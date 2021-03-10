import { Component } from '@angular/core';
import { DataService } from '../shared/data.service';
import { ICats } from '../models/interface';

@Component({
  selector: 'app-cardview',
  templateUrl: './catCard.component.html',
  styleUrls: ['./catCard.component.css'],
  providers: [DataService],
})
export class CardviewComponent {
  cats: ICats[];
  constructor(private dataService: DataService) {}

  //gets cats for card view page passed to cards through angular html []
  getTheCats() {
    this.dataService.getCats().subscribe((cats: ICats[]) => (this.cats = cats));
  }
  ngOnInit() {
    this.getTheCats();
  }

  onWheel(event: WheelEvent): void {
    if (window.innerWidth < 768) {
      (<Element>event.currentTarget).scrollLeft +=
        window.innerWidth * (event.deltaY / Math.abs(event.deltaY));
      event.preventDefault();
    }
  }
}
