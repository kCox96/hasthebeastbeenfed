import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { InterfaceTypeWithDeclaredMembers } from 'typescript';
import { ICats, IFeed } from '../../shared/interface';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  constructor(private dataService: DataService) {}
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

  doFeedCat(catId: string, feed?: IFeed) {
    if (!feed) {
      var date = new Date();
      var feed = {} as IFeed;
      feed.time = date.toJSON();
      feed.foodType = '';
    }
    this.dataService.feedCat(catId, feed).subscribe((data) => {});
  }

  ngOnInit(): void {}
}
