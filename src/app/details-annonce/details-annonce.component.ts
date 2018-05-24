import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
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
  constructor(  private activatedRoute : ActivatedRoute, private annonceService : AnnonceService , private calendarService : CalendarService) { }
evts:any=[];

  dispo : any;


  ngOnInit() {
    let context = this;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.idS= params['id'];
    });

    this.annonceService.getAnnonceById(this.idS)
        .subscribe(res=>{

          this.annonce=res;
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
        $(this).css('background-color', 'red');
        let ev: any = {'title': new_event, 'start': date.format()};
        //console.log(date.format('end'));


        context.calendarService.addCalendar(new Events(new_event, date.format(), date.format(), date.format(), context.annonce.id), context.idS)
            .subscribe(res => res);

        //context.evts.push(ev);
        $('#calendar').fullCalendar('renderEvent', ev);
      }
          });
    }





      }
    });



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
