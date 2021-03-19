import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { ICat } from '../models/interface';
import { CardviewComponent } from '../catCards/catCard.component';

@Component({
  selector: 'app-catcreate',
  templateUrl: './createCat.component.html',
  styleUrls: ['./createCat.component.css'],
  providers: [CardviewComponent],
})
export class CatcreateComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private cardview: CardviewComponent
  ) {}

  //creates cat for name provided on the form 
  createCat(catname: string) {
    if (catname != null || catname != '') {
      var cat: ICat;
      cat = {
        name: catname,
        users: [],
      };
      this.dataService.createCat(cat).subscribe((data) => {});
      // If on create cat page then go back to the cardview if on cardview then refresh data
      if ((window.location.href = './cardview')) {
        this.cardview.getTheCats();
      } else {
        window.location.href = './cardview';
      }
    }
  }

  ngOnInit(): void {}
}
