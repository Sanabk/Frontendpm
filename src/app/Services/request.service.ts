import { Injectable } from '@angular/core';
import {Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {Calendar} from "../Models/Calendar";
import {AuthService} from "./auth.service";

@Injectable()
export class RequestService {
  uri='http://127.0.0.1:8001/user';
  constructor( private http : Http , private authenticationService: AuthService) { }



  Accepter(id : any){
      const headers = new Headers();
      headers.append('content-type', 'application/json');
        let x= {'id' :id};
    headers.append( 'X-Auth-Token', this.authenticationService.token.value);
      //noinspection TypeScriptUnresolvedFunction
      return this.http.post(this.uri+'/valid-req', JSON.stringify(x), {headers: headers}).map(res => res).catch(this.handelError);

  }

  Refuser(id : any){
    const headers = new Headers();
    headers.append('content-type', 'application/json');

    headers.append( 'X-Auth-Token', this.authenticationService.token.value);
    //noinspection TypeScriptUnresolvedFunction
    return this.http.delete(this.uri+'/delete/'+id, {headers: headers}).map(res => res.json()).catch(this.handelError);

  }
  getAll(){
    const headers = new Headers();

    headers.append( 'X-Auth-Token', this.authenticationService.token.value);
    //noinspection TypeScriptUnresolvedFunction
    return this.http.get(this.uri+'/list/demandes', {headers: headers}).map(res => res.json()).catch(this.handelError);

  }
  private handelError(error: Response) {

    return Observable.throw(error.json().errors || 'server error');

  }

}
