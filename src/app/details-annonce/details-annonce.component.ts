import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {AnnonceService} from "../Services/annonce.service";
import {CalendarService} from "../Services/calendar.service";
import {Events} from "../Models/Events";
declare var $ :any;

@Component({
  selector: 'app-details-annonce',
  templateUrl: './details-annonce.component.html',
  styleUrls: ['./details-annonce.component.css']
})
export class DetailsAnnonceComponent implements OnInit {
idS : any;
annonce : any;
  constructor(  private activatedRoute : ActivatedRoute, private annonceService : AnnonceService , private calendarService : CalendarService) { }
evts:any=[];
  ngOnInit() {
    let context = this;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.idS= params['id'];
    });

    this.annonceService.getAnnonceById(this.idS)
        .subscribe(res=>this.annonce=res);

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
      dayClick: function(date, jsEvent, view ) {
        var new_event = prompt("Subject", "");
        if (new_event != null) {
          let ev :any = {'title' : new_event , 'start' :date.format()};
          context.calendarService.addCalendar(new Events(new_event , date.format() , date.format() , date.format() ) , context.idS)
              .subscribe(res=>res);

          //context.evts.push(ev);
          $('#calendar').fullCalendar('renderEvent' , ev);
        }





      }
    });



  }

}
