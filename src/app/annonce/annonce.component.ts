import { Component, OnInit } from '@angular/core';
import {Annonce} from '../Models/Annonce';
import {AnnonceService} from '../Services/annonce.service';
import {Router} from "@angular/router";
import Swal from 'sweetalert2';
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
    if(typeof (Storage) !== "undefined"){
        if(sessionStorage.getItem('id') != undefined) {
            if (sessionStorage.getItem('type') != 'Professional') {
                this.router.navigate(['/home']);
            }
        }
        else{
            this.router.navigate(['/login']);

        }
    }

    this.getAnnonce();
  }

  deleteAnnonce(id) {
    //noinspection TypeScriptUnresolvedFunction

      let context = this;
      Swal({
          title: 'Are you sure?',
          text: 'You will not be able to recover this imaginary file!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it'
      }).then((result) => {
          if (result.value) {
              Swal(
                  'Deleted!',
                  'Your imaginary file has been deleted.',
                  'success'
              )
              context._annonceService.deleteAnnonce(id)
                  .subscribe(
                      result => {
                        context.getAnnonce();
                      }
                  );
              // For more information about handling dismissals please visit
              // https://sweetalert2.github.io/#handling-dismissals
          } else {
              Swal(
                  'Cancelled',
                  'Your imaginary file is safe :)',
                  'error'
              )
          }
      })

  }

}