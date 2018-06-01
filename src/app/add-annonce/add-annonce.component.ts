import {Router} from '@angular/router';
import {AnnonceService} from '../Services/annonce.service';
import {Category} from "../Models/Category";
import {CategoryService} from "../Services/category.service";
import {Component, ViewChild, ElementRef, NgZone, OnInit} from '@angular/core';
import {MapsAPILoader} from '@agm/core';
import {} from '@types/googlemaps';

@Component({
  selector: 'app-add-annonce',
  templateUrl: './add-annonce.component.html',
  styleUrls: ['./add-annonce.component.css']
})
export class AddAnnonceComponent implements OnInit {
  @ViewChild('address') public searchElement: ElementRef;


  title: string;
  description: string;
  category: string;
  phone: number;
  city: string='';
  picture: string;
  errors= <any>[];
  categories: Array<Category>= [];
  errorMessage: string;
  phone_error : any;

  //noinspection JSAnnotator
  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private _annonceService: AnnonceService , private router: Router , private _categoryService: CategoryService) { }
  getCategory() {
    this._categoryService.getCategory().subscribe(
        categories => {
          this.categories = categories, error => this.errorMessage = <any> error;

        }
    );
  }
  addAnnonce(title, description, category, phone, city, picture) {

    console.log(city);
    if(phone.length != 8) {
      this.phone_error = "erreur";

      let annonce: any;
      annonce = {
        title: title,
        description: description,
        category: category,
        phone: phone,
        city: city,
        picture: picture
      };
      this._annonceService.addAnnonce(annonce).subscribe(result => {
        console.log("ok");
        console.log(result);
        this.router.navigate(['/annonce']);

      });
    }


  }

  ngOnInit() {
    if(typeof (Storage) !== "undefined"){
      if(sessionStorage.getItem('type') != 'professionnel'){
        this.router.navigate(['/home']);
      }
    }
    this.getCategory();
    //noinspection TypeScriptUnresolvedFunction
    this.mapsAPILoader.load().then(
        () => {
          let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, {types: ["address"]});

          autocomplete.addListener("place_changed", () => {
            this.ngZone.run(() => {
              let place: google.maps.places.PlaceResult = autocomplete.getPlace();

              if (place.geometry === undefined || place.geometry === null) {
                return;
              }

            });
          });
        }
    );
  }

}



