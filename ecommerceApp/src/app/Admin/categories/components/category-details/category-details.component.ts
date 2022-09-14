import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/Admin/categories/models/ICategory';
import { CategoryService } from 'src/app/Admin/categories/services/category.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css'],
})
export class CategoryDetailsComponent implements OnInit {
  categories: ICategory[] = [];
  totalLength!: number;
  page: number = 1;
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .subscribe((categories: ICategory[]) => {
        this.categories = categories;
        this.totalLength = categories.length;
        console.log(categories);
      });
  }
  onDeleteCategory(id: any) {
    this.categoryService.deleteCategory(id).subscribe((data) => {
      this.categoryService
        .getCategories()
        .subscribe((category: ICategory[]) => {
          this.categories = category;
        });
    });
  }
}
