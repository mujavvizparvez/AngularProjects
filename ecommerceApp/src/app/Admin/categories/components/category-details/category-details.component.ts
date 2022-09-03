import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/Admin/models/ICategory';
import { CategoryService } from 'src/app/Admin/services/category.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css'],
})
export class CategoryDetailsComponent implements OnInit {
  categories:ICategory[]=[]
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .subscribe((categories: ICategory[]) => {
        this.categories = categories;
        console.log(categories);
      });
  }
}
