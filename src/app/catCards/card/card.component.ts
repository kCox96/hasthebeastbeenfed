import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { ICats, IFeed } from '../../models/interface';
import { CardviewComponent } from '../catCard.component';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private cardview: CardviewComponent,
    public elementRef: ElementRef
  ) {}
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

  doFeedCat(catId: string, type: string): void {
    var date = new Date();
    var feed = {} as IFeed;
    feed.time = date.toJSON();
    if (type === '') {
      type = 'Basic';
    }
    feed.foodType = type;
    console.log(feed);
    this.dataService.feedCat(catId, feed).subscribe((data) => {});
    this.cardview.getTheCats();
  }

  ngOnInit(): void {}
}
