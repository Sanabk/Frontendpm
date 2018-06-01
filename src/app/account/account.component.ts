import { Component, OnInit } from '@angular/core';
import {AuthService} from "../Services/auth.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  username : string;
  mail : string;
  type : string;
  error : string;
  constructor(private auth : AuthService) { }

  ngOnInit() {
      console.log("test");
    if (typeof (Storage) !== "undefined") {
        console.log("defined");
     this.username=sessionStorage.getItem('username');
     this.mail=sessionStorage.getItem('mail');
     this.type=sessionStorage.getItem('type');

        console.log(this.type);


    }

  }

    updatepassword(pwd : string , pwd1 : string , pwd2 : string){

      if(pwd1 == pwd2){
            this.auth.updatepassword(pwd , pwd1 , pwd2 , this.mail)
                .subscribe(res=>{
                    let result : any = res;
                    if(result.message != "success"){
                        this.error = "Please verify your password"
                    }
                });

      }else{

          this.error = "Password doesnt match"
      }
    }

}
