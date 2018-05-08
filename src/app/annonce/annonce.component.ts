import { Component, OnInit } from '@angular/core';
import {Annonce} from '../Models/Annonce';
import {AnnonceService} from '../Services/annonce.service';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.css']
})
export class AnnonceComponent implements OnInit {

  annonces: Array<Annonce>= [] ;

  errorMessage: string;
  constructor(private _annonceService: AnnonceService) { }

  getAnnonce() {
    this._annonceService.getAnnonce().subscribe(
        annonces => this.annonces = annonces, error => this.errorMessage = <any> error
    );
  }

  ngOnInit() {
    this.getAnnonce();
  }

  deleteAnnonce(id) {
    //noinspection TypeScriptUnresolvedFunction
    this._annonceService.deleteAnnonce(id).subscribe(
        result => {
          window.location.reload();
        }
    );

  }

}