import { Component, OnInit } from '@angular/core';
import {Calendar} from '../Models/Calendar';
import {CalendarService} from "../Services/calendar.service";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private calendarService : CalendarService) { }

  monday = new Calendar ();
  tuesday = new Calendar ();
  wed = new Calendar ();
  thur =new Calendar ();
  fri =new Calendar ();
  sat =new Calendar ();
  sun =new Calendar ();

  ngOnInit() {
  }


  save(){
    if(this.monday.Day ){
      this.monday.Day="monday";
      this.calendarService.addDispo(this.monday)
          .subscribe(res=>console.log("added"));
    }
    if(this.tuesday.Day){
      this.tuesday.Day="tuesday";
      this.calendarService.addDispo(this.tuesday)
          .subscribe(res=>console.log("added"));
    }
    if(this.wed.Day){
      this.wed.Day="wednesday";
      this.calendarService.addDispo(this.wed)
          .subscribe(res=>console.log("added"));
    }
    if(this.thur.Day){
      this.thur.Day="thursday";
      this.calendarService.addDispo(this.thur)
          .subscribe(res=>console.log("added"));
    }
    if(this.fri.Day){
      this.fri.Day="friday";
      this.calendarService.addDispo(this.fri)
          .subscribe(res=>console.log("added"));
    }
    if(this.sat.Day){
      this.sat.Day="saturday";
      this.calendarService.addDispo(this.sat)
          .subscribe(res=>console.log("added"));
    }
    if(this.sun.Day){
      this.sun.Day="sunday";
      this.calendarService.addDispo(this.sun)
          .subscribe(res=>console.log("added"));
    }
  }
}
