import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css']
})
export class LayoutsComponent implements OnInit {

  constructor( private router : Router) { }
user_type : any;
  ngOnInit() {

    if (typeof (Storage) !== "undefined") {
     this.user_type= sessionStorage.getItem('type');
     console.log(this.user_type);
    }
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
