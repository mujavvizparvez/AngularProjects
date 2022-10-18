import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/Admin/categories/services/category.service';
import { MessageService } from 'src/app/Auth/services/message.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  categoryForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    photoUrl: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });
  constructor(
    private categoryService: CategoryService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  onAddCategory() {
    let category = this.categoryForm.value;
    category.createdBy = 1;
    category.createdDate = new Date();
    this.categoryService.addCategory(category).subscribe((data) => {
      this.messageService.setSuccessMessage('Category added successfully');
      this.router.navigate(['admin/category/details']);
      console.log(data);
    });
    console.log(this.categoryForm.value);
  }
}
