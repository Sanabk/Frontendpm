import { Injectable } from '@angular/core';
import {Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {Calendar} from "../Models/Calendar";

@Injectable()
export class RequestService {
  uri='';
  constructor( private http : Http) { }


  getAll(){
    const headers = new Headers();

    //noinspection TypeScriptUnresolvedFunction
    return  this.http.get(this.uri , {headers : headers}).map(res =>res.json()).catch(this.handelError);

  }

  Accepter(id : any){
      const headers = new Headers();
      headers.append('content-type', 'application/json');
      //noinspection TypeScriptUnresolvedFunction
      return this.http.post(this.uri, JSON.stringify(id), {headers: headers}).map(res => res.json()).catch(this.handelError);

  }

  Refuser(id : any){
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    //noinspection TypeScriptUnresolvedFunction
    return this.http.post(this.uri, JSON.stringify(id), {headers: headers}).map(res => res.json()).catch(this.handelError);

  }
  private handelError(error: Response) {

    return Observable.throw(error.json().errors || 'server error');

  }

}
