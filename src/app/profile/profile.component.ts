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
    if(this.monday.day ){
      this.monday.day="monday";
      this.calendarService.addCalendar(this.monday)
          .subscribe(res=>console.log("added"));
    }
    if(this.tuesday.day){
      this.tuesday.day="tuesday";
      this.calendarService.addCalendar(this.tuesday)
          .subscribe(res=>console.log("added"));
    }
    if(this.wed.day){
      this.wed.day="wednesday";
      this.calendarService.addCalendar(this.wed)
          .subscribe(res=>console.log("added"));
    }
    if(this.thur.day){
      this.thur.day="thursday";
      this.calendarService.addCalendar(this.thur)
          .subscribe(res=>console.log("added"));
    }
    if(this.fri.day){
      this.fri.day="friday";
      this.calendarService.addCalendar(this.fri)
          .subscribe(res=>console.log("added"));
    }
    if(this.sat.day){
      this.sat.day="saturday";
      this.calendarService.addCalendar(this.sat)
          .subscribe(res=>console.log("added"));
    }
    if(this.sun.day){
      this.sun.day="sunday";
      this.calendarService.addCalendar(this.sun)
          .subscribe(res=>console.log("added"));
    }
  }
}
