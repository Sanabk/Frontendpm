import {Component, OnInit, NgZone, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AnnonceService} from '../Services/annonce.service';
import {Category} from '../Models/Category';
import {CategoryService} from '../Services/category.service';
import {MapsAPILoader} from "@agm/core";
import {Annonce} from "../Models/Annonce";
@Component({
  selector: 'app-edit-annonce',
  templateUrl: './edit-annonce.component.html',
  styleUrls: ['./edit-annonce.component.css']
})
export class EditAnnonceComponent implements OnInit {

  @ViewChild('address') public searchElement: ElementRef;

  public latitude: number;
  public longitude: number;
  public zoom: number;
  public id: number;
  annonce : Annonce;
  title: string;
  description: string;
  category: string;
  phone: number;
  city: string;
  picture: string;
  categories: Array<Category>= [];
  errors= <any>[];
  errorMessage: string;
  categoryid : any;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone,private router: Router , private route: ActivatedRoute, private _annonceService: AnnonceService,  private _categoryService: CategoryService) {
    this.id = this.route.snapshot.params['id'];
  }


  getCategory() {
    this._categoryService.getCategory().subscribe(
        categories => this.categories = categories, error => this.errorMessage = <any> error
    );
  }
  editAnnonce(title, description, category, phone, city, picture) {
    let annonce: any;
    annonce = {title: title, description: description, category: category, phone: phone, city: city, picture: picture};
    this._annonceService.editAnnonce(annonce, this.id).subscribe(( result => {

      this.router.navigate(['/annonce']);

    }), editError => this.errors = editError);


  }
  ngOnInit() {
    if(typeof (Storage) !== "undefined"){
      if(sessionStorage.getItem('type') != 'professionnel'){
        this.router.navigate(['/home']);
      }
    }

    this._annonceService.getAnnonceById(this.id)
        .subscribe(res=> {
              this.annonce = res;
              this.title = this.annonce.title;
              this.description = this.annonce.description;
              this.categoryid = this.annonce.category.id;
              console.log(this.annonce.category);
              this.city = this.annonce.city;
              this.phone = this.annonce.phone;
              this.picture = this.annonce.picture;
             // this.category=this.annonce.name;
            }
        );
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
              this.latitude = place.geometry.location.lat();
              this.longitude = place.geometry.location.lng();
              this.zoom = 12;
            });
          });
        }
    );
  }
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
}


