import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/Admin/categories/models/ICategory';
import { CategoryService } from 'src/app/Admin/categories/services/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit {
  categoryId: string = '';
  categoryForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    type: new FormControl(''),
    photoUrl: new FormControl(''),
    description: new FormControl(''),
  });
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.params['id'];
    this.categoryService.getCategoryById(this.categoryId).subscribe((data) => {
      console.log(data)
      this.categoryForm.setValue({
        name: data.name,
        type: data.type,
        photoUrl: data.photoUrl,
        description: data.description,
      });
      console.log(data);
    });
  }
  onUpdateCategory() {
    this.categoryService.updateCategory(
      this.categoryForm.value,
      this.categoryId
    ).subscribe((data) => {
      this.router.navigate(['admin/category/details']);
    });
  }
}
