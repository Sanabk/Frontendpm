import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AnnonceService} from "../annonce.service";
@Component({
  selector: 'app-edit-annonce',
  templateUrl: './edit-annonce.component.html',
  styleUrls: ['./edit-annonce.component.css']
})
export class EditAnnonceComponent implements OnInit {


  public id: number;
  title: string;
  description: string;
  category: string;
  phone: number;
  city: string;
  picture: string;
  errors= [];

  constructor(private router: Router , private route: ActivatedRoute, private _annonceService: AnnonceService) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
  }

  editAnnonce(title, description, category, phone, city, picture) {
    let annonce: any;
    annonce = {title: title, description: description, category: category, phone: phone, city: city, picture: picture};
    this._annonceService.editAnnonce(annonce, this.id).subscribe(( result => {

      this.router.navigate(['/annonce']);

    }), editError => this.errors = editError);


  }

}