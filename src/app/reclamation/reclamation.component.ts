import { Component, OnInit } from '@angular/core';
import {Reclamation} from "../Models/Reclamation";
import {ReclamationService} from "../Services/reclamation.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {


  reclamations: Array<Reclamation>= [] ;

  errorMessage: string;
  constructor(private _reclamationService: ReclamationService, private router: Router ) { }

  getReclamation() {
    this._reclamationService.getReclamation().subscribe(
        reclamations => this.reclamations = reclamations, error => this.errorMessage = <any> error
    );
  }

  ngOnInit() {

    this.getReclamation();
  }



}
