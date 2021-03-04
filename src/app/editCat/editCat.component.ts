import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../shared/data.service';
import { ICats } from '../models/interface';
@Component({
  selector: 'app-catedit',
  templateUrl: './editCat.component.html',
  styleUrls: ['./editCat.component.css'],
})
export class CateditComponent implements OnInit {
  id: string;
  cat: ICats;
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  //this code is a touch messy and could be cleaned up with a API for a specific cat.

  FindMyCat(cats: ICats[], id: string) {
    for (var i = 0; i < cats.length; i++) {
      if (cats[i]._id === id) {
        return cats[i];
      }
    }
  }

  async GetTheCat() {
    this.id = this.route.snapshot.paramMap.get('id');
    var Mycats: ICats[];
    return this.dataService.getCats().subscribe((cats: ICats[]) => {
      Mycats = cats;
      this.cat = this.FindMyCat(Mycats, this.id);
    });
  }
  ngOnInit(): void {
    this.GetTheCat();
  }
}
