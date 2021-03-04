import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../shared/tokenStorage.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  currentUser: any;

  constructor(private token: TokenStorageService) {}

  ngOnInit(): void {}
}
