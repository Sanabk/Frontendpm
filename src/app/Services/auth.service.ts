import { Injectable } from '@angular/core';
import {Http, Headers, Response, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class AuthService {

  public token: any;

  constructor(private http: Http) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }



  login(mail: string, password: string): Observable<boolean> {
    let headers = new Headers();
    headers.append('content-type', 'application/x-www-form-urlencoded');
    let body = new URLSearchParams();
    body.set('mail', mail);
    body.set('password', password);


    //noinspection TypeScriptUnresolvedFunction
    return this.http.post('http://127.0.0.1:8001/user/login', body ,{headers : headers} )
        .map((response: Response) => {
          // login successful if there's a jwt token in the response
          const token = response.json() && response.json().response.token;
          if (token) {
            // set token property
            this.token = token;

            // store username and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify({ mail: mail, token: token }));

            // return true to indicate successful login
              console.log(this.token)
            return this.token.client;
          } else {
            // return false to indicate failed login
             // console.log("test1")
              return false;
          }
        }).catch(this.handelError);
  }

    getUserById(id : any){
      const  headers = new Headers();
      headers.append('X-Auth-Token' , this.token.value);

      //noinspection TypeScriptUnresolvedFunction
      return this.http.get('http://127.0.0.1:8001/user/'+id , {headers : headers})
          .map(res=>res.json()).catch(this.handelError);
    }

updatepassword(pwd , pwd1 , pwd2 , mail){

    let contenu = {
      "password":pwd,
      "newpassword":pwd1,
      "newpasswordconfirmation":pwd2,
      "mail": mail

    }
  let headers = new Headers();
  headers.append('content-type', 'application/json');
  headers.append('X-Auth-Token' , this.token.value);
  //noinspection TypeScriptUnresolvedFunction
  return this.http.put('http://127.0.0.1:8001/user/update-password', contenu ,{headers : headers} )
      .map(res=>res.json()).catch(this.handelError);
}


  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }

  private handelError(error: Response) {

    return Observable.throw(error.json() || 'server error');

  }




}