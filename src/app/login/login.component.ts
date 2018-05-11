import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  mail: string;
  password: string;
  error: string;

  constructor( private router: Router,
               private authenticationService: AuthService) {}

  ngOnInit() {
    this.authenticationService.logout();
  }


  login(e) {

    e.preventDefault();


    this.authenticationService.login(this.mail, this.password)
        .subscribe(result => {

          console.log("test"+result);
          this.router.navigate(['/annonce']);

        }, loginError => this.error = loginError.message + ' : Please verify  your username or password !  ');


  }
  logout(){
    this.authenticationService.logout();
  }

}