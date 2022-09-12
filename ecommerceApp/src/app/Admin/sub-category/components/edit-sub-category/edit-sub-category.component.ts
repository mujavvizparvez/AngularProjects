import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/Admin/categories/models/ICategory';
import { CategoryService } from 'src/app/Admin/categories/services/category.service';
import { ISubCategory } from '../../models/ISubCatetogory';
import { SubCategoryService } from '../../services/sub-category.service';

@Component({
  selector: 'app-edit-sub-category',
  templateUrl: './edit-sub-category.component.html',
  styleUrls: ['./edit-sub-category.component.css'],
})
export class EditSubCategoryComponent implements OnInit {
  categories: ICategory[] = [];
  subCategoryId!: string;
  subCategoryForm = new FormGroup({
    name: new FormControl(''),
    categoryId: new FormControl(''),
    category: new FormControl(''),
    type: new FormControl(''),
    photoUrl: new FormControl(''),
    description: new FormControl(''),
  });
  constructor(
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
    this.subCategoryId = this.route.snapshot.params['name'];
    this.subCategoryService
      .getSubCategoryById(this.subCategoryId)
      .subscribe((data: ISubCategory) => {
        this.subCategoryForm.setValue({
          name: data.name,
          categoryId: data.categoryId,
          category: data.category,
          type: data.type,
          photoUrl: data.photoUrl,
          description: data.description,
        });
      });
  }
  onUpdateSubCategory() {
    this.subCategoryService
      .updateSubcategory(this.subCategoryForm.value as ISubCategory, this.subCategoryId)
      .subscribe((data) => {
        this.router.navigate(['admin/subcategory/details']);
        console.log(data);
      });
  }
}

