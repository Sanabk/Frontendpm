import { Injectable } from '@angular/core';
import {Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {Category} from './Category';
import {AuthService} from './auth.service';

@Injectable()
export class CategoryService {

  private uri= 'http://127.0.0.1:8001/api/category';



  constructor(private http: Http, private authenticationService: AuthService  ) {}

  getCategory(): Observable<any[]> {
    const headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    //noinspection TypeScriptUnresolvedFunction
    return  this.http.get(this.uri , {headers : headers}).map(res => <Category[]> res.json() ).catch(this.handelError);

  }

  private handelError(error: Response) {

    return Observable.throw(error.json().errors || 'server error');

  }

}