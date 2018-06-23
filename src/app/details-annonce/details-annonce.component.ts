import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AnnonceService} from "../Services/annonce.service";
import {CalendarService} from "../Services/calendar.service";
import {Events} from "../Models/Events";
import Swal from 'sweetalert2';

declare var $ :any;

@Component({
  selector: 'app-details-annonce',
  templateUrl: './details-annonce.component.html',
  styleUrls: ['./details-annonce.component.css']
})
export class DetailsAnnonceComponent implements OnInit {
idS : any;
annonce : any;
event_title : any ;
event_start : any;
event_end : any;
event_test:any=false;
  constructor( private router: Router , private activatedRoute : ActivatedRoute, private annonceService : AnnonceService , private calendarService : CalendarService) { }
evts:any=[];

  dispo : any;


  ngOnInit() {
    if(typeof (Storage) !== "undefined"){
      if(sessionStorage.getItem('type') != 'Particular'){
        this.router.navigate(['/annonce']);
      }
    }
    let context = this;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.idS= params['id'];
    });

    this.annonceService.getAnnonceById(this.idS)
        .subscribe(res=>{

          this.annonce=res;
          console.log(this.annonce);
        this.calendarService.getAllDispo(this.annonce.user.id)
            .subscribe(res=>{this.dispo = res;
            console.log(this.dispo)
            });

        });

    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate:new Date(),
      defaultView: 'agendaWeek',
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: this.evts,
      dayClick: function(date, jsEvent, view ) {
    if(context.isDisponible(date)) {
     let new_event;
     Swal({
        title: 'Add event',
        input: 'text',
      })
          .then((result) => {
            new_event =result.value;


      if (new_event != null) {
       // $(this).css('background-color', 'red');
        let ev: any = {'title': new_event, 'start': date.format()};
        //console.log(date.start);
        //console.log(date.end);




        //context.evts.push(ev);
        $('#calendar').fullCalendar('renderEvent', ev);
      }
          });
    }
  },
      eventResize: function(event, delta, revertFunc) {
          //let ev: any = {'title': "ok", 'start': event.start.format() , 'end' : event.end.format()};

        if(context.isDisponible(event.end)){
          context.event_title=event.title;
          context.event_start=event.start.format();
          context.event_end=event.end.format();
          context.event_test=true;
         // context.SaveEvent(event.title , event.start.format() , event.end.format()  );

        }
       else{
          alert('non disponible')
          context.event_test=false;

      }
        //  $('#calendar').fullCalendar('renderEvent', ev);

      }
    });



  }

  SaveEvent() {
    if (this.event_test) {
      this.calendarService.addCalendar(new Events(this.event_title, this.event_start, this.event_start, this.event_end, this.annonce.id), this.idS)
          .subscribe(res => res);
      alert("event saved");
    }
    else {
      alert("please check request time .. current time is not available");
    }
  }
  isDisponible(date : any){
    console.log(date.format());
    var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    var d = new Date(date.format());
    for(let dis of this.dispo.result) {
      console.log(days[d.getDay()] + "  " + dis.day);
      if (days[d.getDay()].localeCompare(dis.day) == 0){
        console.log(d.getHours());
        if(d.getHours()!=1){
        var fromoh= dis.fromo.split(':');
        var fromom= dis.fromo.split(':');
        var tooh= dis.too.split(':');
        var toom= dis.too.split(':');
        var fromth= dis.fromt.split(':');
        var fromtm= dis.fromt.split(':');
        var toth= dis.tot.split(':');
        var totm= dis.tot.split(':');

        var t1 = new Date();
        t1.setHours(fromoh[0]);
        t1.setMinutes(fromoh[1]);

        var t2 = new Date();
        t2.setHours(tooh[0]);
        t2.setMinutes(toom[1]);

        var t3 = new Date();
        t3.setHours(fromth[0]);
        t3.setMinutes(fromtm[1]);

        var t4 = new Date();
        t4.setHours(toth[0]);
        t4.setMinutes(totm[1]);

      var ti = new Date();
        ti.setHours(d.getHours());
        ti.setMinutes(d.getMinutes());
      //console.log(ti.getTime()+"    "+t1.getTime() +"   " + t2.getTime());

        if(((ti.getTime()>= t1.getTime())&&(ti.getTime()<= t2.getTime())) ||((ti.getTime()>= t3.getTime())&&(ti.getTime()<= t4.getTime()))){
          return true;

        }
      }else{
        return true;}
      }
    }
    return false;
  }

}
