import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {RequestService} from "../Services/request.service";

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css']
})
export class LayoutsComponent implements OnInit {

  constructor( private router : Router , private requestService : RequestService) { }
user_type : any;
  requests : any=[];
  user_id : any;
  resultat : {result : any};
  ngOnInit() {

    if (typeof (Storage) !== "undefined") {
        this.user_type = sessionStorage.getItem('type');
        this.user_id = sessionStorage.getItem('id');
        if (this.user_id != undefined) {
            this.requestService.getAll()
                .subscribe(res => {
                    this.resultat = res;
                    for (let r of this.resultat.result) {
                        if (r.user) {
                            if (r.user.id == this.user_id) {
                                this.requests.push(r);
                            }
                        }
                    }
                })
        }
    }else{
        this.router.navigate(['/login']);
    }
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
