import { Injectable } from '@angular/core';
import {Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {AuthService} from './auth.service';
import {Reclamation} from '../Models/Reclamation';

@Injectable()
export class ReclamationService {

  private uri= 'http://127.0.0.1:8001/api/reclamations';

    constructor(private http: Http, private authenticationService: AuthService  ) {}

  addReclamation(reclamation: Reclamation) {
    const  headers = new Headers();
    headers.append('content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authenticationService.token);
    //noinspection TypeScriptUnresolvedFunction
    return this.http.post(this.uri, JSON.stringify(reclamation), {headers : headers}).map(res => res.json()).catch(this.handelError);
  }

  private handelError(error: Response) {

    return Observable.throw(error.json().errors || 'server error');

  }

  getReclamation(): Observable<any[]> {
    const headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    //noinspection TypeScriptUnresolvedFunction
    return  this.http.get(this.uri , {headers : headers}).map(res => <Reclamation[]> res.json() ).catch(this.handelError);

  }
}