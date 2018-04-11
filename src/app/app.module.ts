import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AnnonceComponent } from './annonce/annonce.component';
import { AddAnnonceComponent } from './add-annonce/add-annonce.component';
import { DeleteAnnonceComponent } from './delete-annonce/delete-annonce.component';
import { LoginComponent } from './login/login.component';
import {AuthService} from "./auth.service";
import {AnnonceService} from "./annonce.service";
import {AuthGuard} from "./auth.guard";
import { EditAnnonceComponent } from './edit-annonce/edit-annonce.component';
import {Routes, RouterModule} from '@angular/router';
import { HttpModule } from '@angular/http';
import {FormsModule} from "@angular/forms";
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {path: '', component : AppComponent},
  {path: 'login', component : LoginComponent},
  {path: 'annonce', component : AnnonceComponent, canActivate : [AuthGuard]},
  {path: 'add-annonce', component : AddAnnonceComponent, canActivate : [AuthGuard]},
  {path: 'edit-annonce/:id', component : EditAnnonceComponent, canActivate  : [AuthGuard]},
  {path: 'delete-annonce', component : DeleteAnnonceComponent, canActivate  : [AuthGuard]},
];


@NgModule({
  declarations: [
    AppComponent,
    AnnonceComponent,
    AddAnnonceComponent,
    DeleteAnnonceComponent,
    LoginComponent,
    EditAnnonceComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot( routes ),
    HttpModule,
    FormsModule
  ],
  providers: [AuthService, AnnonceService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
