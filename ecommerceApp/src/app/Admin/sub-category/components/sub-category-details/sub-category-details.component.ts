import { Component, OnInit } from '@angular/core';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
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
  totalLength!: number;
  page: number = 1;
  constructor(
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSubCategory();
    this.totalLength = this.subCategories.length;
  }

  getSubCategory() {
    this.subCategories = [];
    this.categoryService
      .getCategories()
      .subscribe((categories: ICategory[]) => {
        this.subCategoryService
          .getSubCategories()
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
