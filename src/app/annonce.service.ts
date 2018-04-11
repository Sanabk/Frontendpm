
import { Injectable } from '@angular/core';
import {Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {Annonce} from './Annonce';
import {AuthService} from './auth.service';

@Injectable()
export class AnnonceService {

  private uri= 'http://127.0.0.1:8001/api/annonces';



  constructor(private http: Http, private authenticationService: AuthService  ) {}

  getAnnonce(): Observable<any[]> {
    const headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    //noinspection TypeScriptUnresolvedFunction
    return  this.http.get(this.uri , {headers : headers}).map(res => <Annonce[]> res.json() ).catch(this.handelError);

  }

  addAnnonce(annonce: Annonce) {
    const  headers = new Headers();
    headers.append('content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authenticationService.token);
    //noinspection TypeScriptUnresolvedFunction
    return this.http.post(this.uri, JSON.stringify(annonce), {headers : headers}).map(res => res.json()).catch(this.handelError);
  }



  editAnnonce(annonce: Annonce , id) {
    const  headers = new Headers();
    headers.append('content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authenticationService.token);
    //noinspection TypeScriptUnresolvedFunction
    return this.http.post(this.uri + '/' + id, JSON.stringify(annonce), {headers : headers}).map(res => res.json()).catch(this.handelError);
  }


  deleteAnnonce(id: any) {
    const  headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.authenticationService.token);
    return this.http.delete(this.uri + '/' + id, {headers : headers}).map(res => res.json());
  }


  private handelError(error: Response) {

    return Observable.throw(error.json().errors || 'server error');

  }

}