import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IUser } from 'src/app/Dashboard/models/IUser';
import { UserService } from 'src/app/Dashboard/services/users.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  users: IUser[] = [];
  registerForm: FormGroup = new FormGroup({
    fullName: new FormControl('', Validators.required),
    mobileNumber: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}
  onRegister() {
    let user = this.registerForm.value;
    user.userId = Guid.create().toString();
    this.userService.addUser(user).subscribe((data) => {});

    if (user.email && user.password) {
      this.authService.register(user.email, user.password).subscribe((data) => {
        console.log(data);
      });
    }
  }
}
