import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ReclamationService} from '../Services/reclamation.service';
import {Directive, ElementRef, EventEmitter, Output} from '@angular/core';
import {NgModel} from '@angular/forms';
declare var google:any;

@Component({
  selector: 'app-add-reclamation',
  templateUrl: './add-reclamation.component.html',
  styleUrls: ['./add-reclamation.component.css']
})
export class AddReclamationComponent implements OnInit {
  title: string ;
  context: string;

  errors=<any>[];

   constructor(private _reclamationService: ReclamationService , private router: Router) { }

  addReclamation(title, context) {

    let reclamation: any;
    reclamation = {title: title, context: context};
    this._reclamationService.addReclamation(reclamation).subscribe(( reclamation => {

      this.router.navigate(['/reclamations']);

    }), addError => this.errors = addError);

  }

  ngOnInit() {
  }

}
