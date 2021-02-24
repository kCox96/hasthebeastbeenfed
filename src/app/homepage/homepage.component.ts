import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  form: any = {
    email: null,
  };
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    const email = this.form.email;
    console.log('on submit email value ' + email);
    this.router.navigate(['signup'], {
      queryParams: { userEmail: email },
    });
  }
}
