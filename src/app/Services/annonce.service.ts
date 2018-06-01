
import { Injectable } from '@angular/core';
import {Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {Annonce} from '../Models/Annonce';
import {AuthService} from './auth.service';

@Injectable()
export class AnnonceService {

  private uri= 'http://127.0.0.1:8001/annonces';



  constructor(private http: Http, private authenticationService: AuthService  ) {}

  getAnnonce(): Observable<any[]> {
    const headers = new Headers({ 'X-Auth-Token' : this.authenticationService.token.value
        // .value
    });
    // console.log(this.authenticationService.token.value);
    //noinspection TypeScriptUnresolvedFunction
    return  this.http.get(this.uri , {headers : headers}).map(res => <Annonce[]> res.json() ).catch(this.handelError);

  }

  getAllAnnonce(): Observable<any[]> {
    const headers = new Headers({ 'X-Auth-Token' : this.authenticationService.token.value
      // .value
    });
    // console.log(this.authenticationService.token.value);
    //noinspection TypeScriptUnresolvedFunction
    return  this.http.get(this.uri + '/' + 'all' , {headers : headers}).map(res => <Annonce[]> res.json() ).catch(this.handelError);

  }

  addAnnonce(annonce: Annonce) {
    const  headers = new Headers();
    headers.append('content-type', 'application/json');
    headers.append('X-Auth-Token' , this.authenticationService.token.value);
    //noinspection TypeScriptUnresolvedFunction
    return this.http.post(this.uri, JSON.stringify(annonce), {headers : headers}).map(res => res).catch(this.handelError);
  }



  editAnnonce(annonce: Annonce , id) {
    const  headers = new Headers();
    headers.append('content-type', 'application/json');
    headers.append('X-Auth-Token' , this.authenticationService.token.value);
    //noinspection TypeScriptUnresolvedFunction
    return this.http.post(this.uri + '/' + id, JSON.stringify(annonce), {headers : headers}).map(res => res.json()).catch(this.handelError);
  }


  deleteAnnonce(id: any) {
    const  headers = new Headers();
    headers.append('X-Auth-Token' , this.authenticationService.token.value);
    //noinspection TypeScriptUnresolvedFunction

    return this.http.delete(this.uri + '/' + id, {headers : headers}).map(res => res.json()).catch(this.handelError);

  }
  getAnnonceById(ids : any){

    const  headers = new Headers();
    headers.append('X-Auth-Token' , this.authenticationService.token.value);
    //noinspection TypeScriptUnresolvedFunction
    return this.http.get(this.uri+'/'+ids , {headers : headers})
        .map(res=>res.json()).catch(this.handelError);
  }


  private handelError(error: Response) {

    return Observable.throw(error.json().errors || 'server error');

  }


}