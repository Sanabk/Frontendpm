import { Injectable } from '@angular/core';
import {Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {Calendar} from "../Models/Calendar";
import {AuthService} from "./auth.service";
import {Events} from "../Models/Events";

@Injectable()
export class CalendarService {
uri='http://127.0.0.1:8001/user/';
  constructor( private http : Http, private authenticationService: AuthService) { }

  addDispo(day: Calendar) {
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    headers.append( 'X-Auth-Token', this.authenticationService.token.value);
    //  headers.append('service_id' , service_id);

    //noinspection TypeScriptUnresolvedFunction
    return this.http.post(this.uri+'create/dispo', JSON.stringify(day), {headers: headers}).map(res => res.json()).catch(this.handelError);
  }
  getAllDispo(id : any){

    const headers = new Headers();
    headers.append('content-type', 'application/json');
    headers.append( 'X-Auth-Token', this.authenticationService.token.value);
    //noinspection TypeScriptUnresolvedFunction
    return this.http.get(this.uri+'list/dispo/'+id, {headers: headers}).map(res => res.json()).catch(this.handelError);

  }
  addCalendar(day: Events , ids) {
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    headers.append( 'X-Auth-Token', this.authenticationService.token.value);
  //  headers.append('service_id' , service_id);

    //noinspection TypeScriptUnresolvedFunction
    return this.http.post(this.uri+'demandes', JSON.stringify(day), {headers: headers}).map(res => res.json()).catch(this.handelError);
  }
  private handelError(error: Response) {

    return Observable.throw(error.json().errors || 'server error');

  }

  getEvents(){
    const headerss = new Headers({ 'X-Auth-Token' : this.authenticationService.token.value});
    //noinspection TypeScriptUnresolvedFunction

    return this.http.get(this.uri+'list/demandes' ,  {headers: headerss})
        .map(res=>res.json().result).catch(this.handelError);
  }


}
