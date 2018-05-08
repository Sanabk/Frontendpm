import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {RegisterService} from '../Services/register.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string ;
  email: string;
  type: string;
  password: string;
  errors = [];

  constructor(private _registerService: RegisterService , private router: Router ) { }
  addUser(username, email, type, password) {

    let user: any;
    user = {username: username, email: email, type: type, password: password};
    this._registerService.addUsers(user).subscribe(( result => {

      this.router.navigate(['/login']);

    }), addError => this.errors = addError);

  }

  ngOnInit() {

  }

}
