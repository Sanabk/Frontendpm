import { Component, OnInit } from '@angular/core';
import {AnnonceService} from "../Services/annonce.service";
import {Annonce} from "../Models/Annonce";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  annonces: Array<Annonce>= [] ;

  errorMessage: string;
  constructor(private _annonceService: AnnonceService ) { }

  getAllAnnonce() {
    this._annonceService.getAllAnnonce().subscribe(
        annonces => this.annonces = annonces, error => this.errorMessage = <any> error
    );
  }


  ngOnInit() {
    this.getAllAnnonce();

  }

}
