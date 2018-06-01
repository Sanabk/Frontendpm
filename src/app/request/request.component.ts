import { Component, OnInit } from '@angular/core';
import {RequestService} from "../Services/request.service";
import {CalendarService} from "../Services/calendar.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  constructor(private calendarService : CalendarService , private requestService : RequestService, private router: Router ) { }
requests:any;
events : any = [];
demande_id : any;

  ngOnInit(){
    if(typeof (Storage) !== "undefined"){
      if(sessionStorage.getItem('type') != 'professionnel'){
        this.router.navigate(['/home']);
      }
    }

    this.events=[];
    this.calendarService.getEvents()
        .subscribe(res=> {
          for (let value of res) {
            console.log(value);
            if (value.valid == "0") {

              this.events.push(value);
            }

          }
        });


  }


  Accepter($id){

    this.requestService.Accepter($id)
        .subscribe(res=>this.ngOnInit());

  }
  Refuser($id){
    this.requestService.Refuser($id)
        .subscribe(res=>{this.ngOnInit()});
  }


}
