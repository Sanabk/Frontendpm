import { Component, OnInit } from '@angular/core';
import {RequestService} from "../Services/request.service";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  constructor(private requestService : RequestService) { }
requests:any;

demande_id : any;

  ngOnInit() {
    this.requestService.getAll()
        .subscribe(res=>console.log("accepter"));

  }


  Accepter(){

    this.requestService.Accepter(this.demande_id)
        .subscribe(res=>console.log("accepter"));

  }
  Refuser(){
    this.requestService.Refuser(this.demande_id)
        .subscribe(res=>console.log("refuser"));
  }


}
