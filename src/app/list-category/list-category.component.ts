import { Component, OnInit } from '@angular/core';
import {Category} from '../Models/Category';
import {CategoryService} from '../Services/category.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  categories: Array<Category>= [] ;

  errorMessage: string;
  constructor(private _categroyService: CategoryService) { }

  getCategory() {
    this._categroyService.getCategory().subscribe(
        categories => this.categories = categories, error => this.errorMessage = <any> error
    );
  }

  ngOnInit() {
    this.getCategory();
  }



}