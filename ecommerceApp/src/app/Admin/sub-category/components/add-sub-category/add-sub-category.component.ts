import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/Admin/categories/models/ICategory';
import { CategoryService } from 'src/app/Admin/categories/services/category.service';
import { ISubCategory } from '../../models/ISubCatetogory';
import { SubCategoryService } from '../../services/sub-category.service';

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.css'],
})
export class AddSubCategoryComponent implements OnInit {
  categories: ICategory[] = [];
  subCategories: ISubCategory[] = [];

  subCategoryForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),

    type: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    photoUrl: new FormControl('', Validators.required),
    categoryId: new FormControl('', Validators.required),
  });
  constructor(
    private subCategoryService: SubCategoryService,
    private router: Router,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
      console.log(data);
    });
  }

  onAddSubCategory() {
    let subCategory = this.subCategoryForm.value;
    console.log(this.subCategoryForm.value);
    this.subCategoryService.addSubCategory(subCategory).subscribe((data) => {
      this.router.navigate(['admin/subcategory/details']);
    });
  }
}
