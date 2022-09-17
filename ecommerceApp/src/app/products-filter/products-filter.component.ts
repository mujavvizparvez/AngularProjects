import { Component, OnInit } from '@angular/core';
import { ICategory } from '../Admin/categories/models/ICategory';
import { CategoryService } from '../Admin/categories/services/category.service';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.css']
})
export class ProductsFilterComponent implements OnInit {
 categories:ICategory[]=[]
  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories: ICategory[])=> {
      this.categories=categories
    })
  }

}
