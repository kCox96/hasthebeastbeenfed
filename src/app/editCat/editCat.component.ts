import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../shared/data.service';
import { ICat } from '../models/interface';
@Component({
  selector: 'app-catedit',
  templateUrl: './editCat.component.html',
  styleUrls: ['./editCat.component.css'],
})
export class CateditComponent implements OnInit {
  id: string;
  cat: ICat;
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  //Gets the specified cat

  async GetTheCat() {
    this.id = this.route.snapshot.paramMap.get('id');
    return this.dataService.getCat(this.id).subscribe((cat: ICat) => {
      this.cat = cat;
      this.cat.feedingTimes = this.cat.feedingTimes.reverse();
    });
  }

  DeleteFeed(index) {
    this.cat.feedingTimes.splice(index, 1);
  }

  UpdateName(event: any) {
    this.cat.name;
  }

  UpdateTime(event: any, index) {
    this.cat.feedingTimes[index].time = event.target.value;
    this.cat.feedingTimes.sort(this.CompareFeed);
    console.log(event);
  }

  UpdateType(event: any, index) {
    this.cat.feedingTimes[index].foodType = event.target.value;
  }

  CompareFeed(a, b) {
    if (a.time > b.time) return 1;
    if (a.time < b.time) return -1;
    return 0;
  }

  UpdateCat(cat: ICat) {
    this.dataService.replaceCat(this.cat).subscribe((data) => {});
    window.location.href = './cardview';
  }

  DeleteCat(catId: string) {
    if (catId) {
      this.dataService.deleteCat(catId).subscribe((data) => {});
      window.location.href = './cardview';
    }
  }

  ngOnInit(): void {
    this.GetTheCat();
  }
}
