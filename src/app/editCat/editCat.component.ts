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

  //Gets the specified cat for edit

  async GetTheCat() {
    this.id = this.route.snapshot.paramMap.get('id');
    return this.dataService.getCat(this.id).subscribe((cat: ICat) => {
      this.cat = cat;
      this.cat.feedingTimes = this.cat.feedingTimes.reverse();
    });
  }

  // Deletes a feed on this page.
  DeleteFeed(index) {
    this.cat.feedingTimes.splice(index, 1);
  }

  //updates the name of the cat
  UpdateName(event: any) {
    this.cat.name;
  }

  //Update one of the feed times for this cat and sort so they are still in the correct order
  UpdateTime(event: any, index) {
    this.cat.feedingTimes[index].time = event.target.value;
    this.cat.feedingTimes.sort(this.CompareFeed);
  }

  //update one of the feed types for this cat
  UpdateType(event: any, index) {
    this.cat.feedingTimes[index].foodType = event.target.value;
  }

  //compare feed function to sort feeding times so they are in the correct order
  CompareFeed(a, b) {
    if (a.time > b.time) return 1;
    if (a.time < b.time) return -1;
    return 0;
  }

  //update the cat with the current cat from this page
  UpdateCat(cat: ICat) {
    this.dataService.replaceCat(this.cat).subscribe((data) => {});
    window.location.href = './cardview';
  }

  // delete this cat
  DeleteCat(catId: string) {
    if (catId) {
      this.dataService.deleteCat(catId).subscribe((data) => {});
      window.location.href = './cardview';
    }
  }

  //on page start get the cat
  ngOnInit(): void {
    this.GetTheCat();
  }
}
