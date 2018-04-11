import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AnnonceService} from "../annonce.service";

@Component({
  selector: 'app-add-annonce',
  templateUrl: './add-annonce.component.html',
  styleUrls: ['./add-annonce.component.css']
})
export class AddAnnonceComponent implements OnInit {


  title: string ;
  description: string;
  category: string;
  phone: number;
  city: string;
  picture: string;

  errors= [];


  constructor(private _annonceService: AnnonceService , private router: Router) { }

  addAnnonce(title, description, category, phone, city, picture) {

    let annonce: any;
    annonce = {title: title, description: description, category: category, phone: phone, city: city, picture: picture};
    this._annonceService.addAnnonce(annonce).subscribe(( annonce => {

      this.router.navigate(['/annonce']);

    }), addError => this.errors = addError);

  }





  ngOnInit() {
  }

}
