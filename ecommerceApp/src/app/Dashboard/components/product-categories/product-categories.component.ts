import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/Admin/categories/models/ICategory';
import { CategoryService } from 'src/app/Admin/categories/services/category.service';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css'],
})
export class ProductCategoriesComponent implements OnInit {
  categories: ICategory[] = [];
  constructor(
    private categoryService: CategoryService,
    private routr: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCategoryByType('male');
  }

  getCategoryByType(type: string) {
    this.categoryService
      .getCategories()
      .subscribe((categories: ICategory[]) => {
        this.categories = categories.filter((f) => f.type == type);
      });
  }

}