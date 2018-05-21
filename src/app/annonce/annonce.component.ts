import { Component, OnInit } from '@angular/core';
import {Annonce} from '../Models/Annonce';
import {AnnonceService} from '../Services/annonce.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.css']
})
export class AnnonceComponent implements OnInit {

  annonces: Array<Annonce>= [] ;

  errorMessage: string;
  constructor(private _annonceService: AnnonceService , private router : Router) { }

  getAnnonce() {
    this._annonceService.getAnnonce().subscribe(
        annonces => this.annonces = annonces, error => this.errorMessage = <any> error
    );
  }

  ngOnInit() {
    // if(typeof (Storage) !== "undefined"){
    //   if(sessionStorage.getItem('type') != 'professionnel'){
    //     this.router.navigate(['/homepage']);
    //   }
    // }

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