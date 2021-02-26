import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { ICat } from '../models/interface';

@Component({
  selector: 'app-catcreate',
  templateUrl: './catcreate.component.html',
  styleUrls: ['./catcreate.component.css'],
})
export class CatcreateComponent implements OnInit {
  constructor(private dataService: DataService) {}

  createCat(catname: string) {
    if (catname != null || catname != '') {
      var cat: ICat;
      cat = {
        name: catname,
        users: [],
      };
      this.dataService.createCat(cat).subscribe((data) => {});
      window.location.href = './cardview';
    }
  }

  ngOnInit(): void {}
}
