import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {Router} from "@angular/router";




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: any;
  query: any;

  config;
  constructor(private dataService: DataService, private router: Router) {
    this.users = this.dataService.widgets;
    // console.log(this.users);
  }
  ngOnInit() {
  }

  addContact() {
    this.router.navigateByUrl('contact/new');
  }

}
