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
          if (result != false) {
            console.log("test" + result);
            this.user = result;
            if (typeof (Storage) !== "undefined") {
              sessionStorage.setItem('type', this.user.type);
              sessionStorage.setItem('id' , this.user.id);
              sessionStorage.setItem('mail' , this.user.mail);
              sessionStorage.setItem('username' , this.user.username);

            }
            console.log(this.user);

            if (this.user.type == 'professionnel') {
              this.router.navigate(['/annonce']);
            } else {
              this.router.navigate(['/home']);
            }

          }
          else {
            this.error = ' Please verify  your username or password !  ';
          }


        });

  }
  logout(){
    this.authenticationService.logout();
  }

}