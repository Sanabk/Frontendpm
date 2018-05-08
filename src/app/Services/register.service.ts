import { Injectable } from '@angular/core';
import {Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {User} from "../Models/User";

@Injectable()
export class RegisterService {

  private uri = 'http://localhost:8001/register';

  constructor(private http: Http,) {}



  addUsers(user: User) {
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    //noinspection TypeScriptUnresolvedFunction
    return this.http.post(this.uri, JSON.stringify(User), {headers: headers}).map(res => res.json()).catch(this.handelError);
  }
  private handelError(error: Response) {

    return Observable.throw(error.json().errors || 'server error');

  }
}