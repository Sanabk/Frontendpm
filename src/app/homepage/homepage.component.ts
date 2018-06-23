import { Component, OnInit } from '@angular/core';
import {AnnonceService} from "../Services/annonce.service";
import {Annonce} from "../Models/Annonce";
import {Router} from "@angular/router";
import {CategoryService} from "../Services/category.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  annonces: Array<Annonce>= [] ;
  categories : any;
  errorMessage: string;

  constructor(private _annonceService: AnnonceService, private router: Router , private categoryService : CategoryService  ) { }

  getAllAnnonce() {
    this._annonceService.getAllAnnonce().subscribe(
        annonces => this.annonces = annonces, error => this.errorMessage = <any> error
    );
  }


  ngOnInit() {
    if(typeof (Storage) !== "undefined"){
      if(sessionStorage.getItem('id') != undefined){
        if(sessionStorage.getItem('type') != 'Particular') {
          this.router.navigate(['/annonce']);
        }
      }
      else{
        this.router.navigate(['/login']);

      }
    }
    console.log('ok');
    this.getAllAnnonce();

    this.categoryService.getCategory()
        .subscribe(res=>this.categories=res);

  }

  checkValue(id : any , event: any){
    this.annonces=[];

    let ann : Array<Annonce>= [] ;
    this._annonceService.getAllAnnonce().subscribe(
        annonces =>{

          for(let a of annonces){
            if(a.category.id == id){
              ann.push(a);
            }
          }
          this.annonces=[];
          this.annonces=ann;

        }, error => this.errorMessage = <any> error
    );

  }

}
