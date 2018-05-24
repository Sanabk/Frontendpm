import { Component, OnInit } from '@angular/core';
import {RequestService} from "../Services/request.service";
import {CalendarService} from "../Services/calendar.service";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  constructor(private calendarService : CalendarService , private requestService : RequestService) { }
requests:any;
events : any = [];
demande_id : any;

  ngOnInit(){
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
