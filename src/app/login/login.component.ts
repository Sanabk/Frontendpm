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
  user : any;

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
          this.user = result;
            if(typeof (Storage) !== "undefined"){
                sessionStorage.setItem('type' , this.user.type);
            }
          if(this.user.type == 'professionnel') {

            this.router.navigate(['/annonce']);
          }else{
            this.router.navigate(['/homepage']);
          }

        }, loginError => this.error = loginError.message + ' : Please verify  your username or password !  ');


  }
  logout(){
    this.authenticationService.logout();
  }

}