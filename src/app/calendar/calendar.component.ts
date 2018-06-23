import { Component, OnInit } from '@angular/core';
import {CalendarService} from "../Services/calendar.service";
import {forEach} from "@angular/router/src/utils/collection";
import {Calendar} from "../Models/Calendar";
import {Events} from "../Models/Events";
declare var $ :any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  evts :any= [];
  idS : any;
  loading : any = true;
  constructor(private calendarService : CalendarService) { }

  ngOnInit() {
    let context = this;


    this.calendarService.getEvents()
        .subscribe(res=>{
          console.log(res);
          let event : any;
          for(let value of res){
            console.log(value);
            if(value.valid == "1") {
                event = {'title': value.subject, 'start': value.fromo, 'end': value.toon};
                this.evts.push(event);
            }

          }
          this.loading=false;
          console.log(this.evts);
          $('#calendar').fullCalendar({
            header: {
              left: 'prev,next today',
              center: 'title',
              right: 'month,agendaWeek,agendaDay'
            },
            defaultDate:new Date(),
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            events: this.evts,

          });
        });

  }

}

