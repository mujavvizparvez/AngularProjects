import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/Admin/categories/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  categoryForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    type: new FormControl(''),
    photoUrl: new FormControl(''),
    description: new FormControl(''),
  });
  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  onAddCategory() {
    let category = this.categoryForm.value;
    this.categoryService.addCategory(category).subscribe((data) => {
      this.router.navigate(['admin/category/details']);
      console.log(data);
    });
    console.log(this.categoryForm.value);
  }
}
