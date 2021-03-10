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

  UpdateFeed(index, type?, time?) {
    if (type) {
      this.cat.feedingTimes[index].foodType = type;
    }
    if (time) {
      this.cat.feedingTimes[index].time = time;
    }
  }

  ngOnInit(): void {
    this.GetTheCat();
  }
}
