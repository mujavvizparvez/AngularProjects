import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/Admin/categories/models/ICategory';
import { CategoryService } from 'src/app/Admin/categories/services/category.service';
import { ISubCategory } from '../../models/ISubCatetogory';
import { SubCategoryService } from '../../services/sub-category.service';

@Component({
  selector: 'app-sub-category-details',
  templateUrl: './sub-category-details.component.html',
  styleUrls: ['./sub-category-details.component.css'],
})
export class SubCategoryDetailsComponent implements OnInit {
  categories: ICategory[] = [];
  subCategories: ISubCategory[] = [];
  constructor(
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSubCategory();
  }

  getSubCategory() {
    this.subCategories = [];
    this.categoryService
      .getCategories()
      .subscribe((categories: ICategory[]) => {
        this.subCategoryService
          .getSubCategory()
          .subscribe((subCategories: ISubCategory[]) => {
            for (let category of categories) {
              for (let SubCategory of subCategories) {
                if (category.id === SubCategory.categoryId) {
                  this.subCategories.push({
                    ...SubCategory,
                    categoryName: category.name,
                  });
                }
              }
            }
          });
      });
  }

  onDeleteSubCategory(id: any) {
    if (confirm('Are you sure you want to delete subcategory')) {
      this.subCategoryService.deleteSubCategory(id).subscribe((data) => {
        this.getSubCategory();
      });
    } else {
      return;
    }
  }
}
