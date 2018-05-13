import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AnnonceComponent } from './annonce/annonce.component';
import { AddAnnonceComponent } from './add-annonce/add-annonce.component';
import { DeleteAnnonceComponent } from './delete-annonce/delete-annonce.component';
import { LoginComponent } from './login/login.component';
import {AuthService} from './Services/auth.service';
import {AnnonceService} from './Services/annonce.service';
import {AuthGuard} from './auth.guard';
import { EditAnnonceComponent } from './edit-annonce/edit-annonce.component';
import {Routes, RouterModule} from '@angular/router';
import { HttpModule } from '@angular/http';
import {FormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import {CategoryService} from './Services/category.service';
import { SearchPipe } from './search.pipe';
import {ReclamationService} from './Services/reclamation.service';
import {AddReclamationComponent} from "./add-reclamation/add-reclamation.component";
import {ReclamationComponent} from "./reclamation/reclamation.component";
import {RegisterService} from "./Services/register.service";
import { AgmCoreModule } from '@agm/core';
import { LandingPageComponent } from './landing-page/landing-page.component';


const routes: Routes = [
  {path: '', component : AppComponent},
  {path: 'login', component : LoginComponent},
  {path: 'annonce', component : AnnonceComponent, canActivate : [AuthGuard]},
  {path: 'category', component : ListCategoryComponent, canActivate : [AuthGuard]},
  {path: 'add-annonce', component : AddAnnonceComponent, canActivate : [AuthGuard]},
  {path: 'edit-annonce/:id', component : EditAnnonceComponent, canActivate  : [AuthGuard]},
  {path: 'delete-annonce', component : DeleteAnnonceComponent, canActivate  : [AuthGuard]},
  {path: 'register', component : RegisterComponent},
  {path: 'homepage', component : LandingPageComponent},
  {path: 'add-reclamation', component : AddReclamationComponent,canActivate : [AuthGuard]},
  {path: 'reclamation', component : ReclamationComponent,canActivate : [AuthGuard]},

];


@NgModule({
  declarations: [
    AppComponent,
    AnnonceComponent,
    AddAnnonceComponent,
    DeleteAnnonceComponent,
    LoginComponent,
    EditAnnonceComponent,
    RegisterComponent,
    ListCategoryComponent,
    SearchPipe,
    AddReclamationComponent,
    ReclamationComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot( routes ),
    HttpModule,
      HttpClientModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCrxo9oHA3cqfzWKXm8q-P7mkG01NsPISc',
      libraries: ["places"]
    })
  ],
  providers: [AuthService, AnnonceService, CategoryService, ReclamationService, RegisterService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
