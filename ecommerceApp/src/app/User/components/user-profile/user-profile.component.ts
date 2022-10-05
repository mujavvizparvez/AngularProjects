import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/Dashboard/services/order.service';
import { IUserDetais } from '../../../Auth/models/IUserDeatails';
import { IUser } from '../../../Dashboard/models/IUser';
import { UserService } from '../../../Dashboard/services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  
  user?: IUser = {
    fullName: '',
    email: '',
    address: '',
    pinCode: 0,
    dateOfBirth: new Date(),
    state: '',
    mobileNumber: 0,
    gender: '',
    userId: '',
    password: '',
  };
  userId: string = '';
  userForm: FormGroup = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    mobileNumber: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    pinCode: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
  });

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private orderService:OrderService
  ) {}

  ngOnInit(): void {
    let userDetailsJson = localStorage.getItem('userDetails');
    let userDetails!: IUserDetais;
    if (userDetailsJson) userDetails = JSON.parse(userDetailsJson);
    this.userId = userDetails.userId;

    this.userService.getUser().subscribe((data) => {
      this.user = data.find((p) => p.userId == this.userId);
      this.userForm.setValue({
        fullName: this.user?.fullName,
        email: this.user?.email,
        mobileNumber: this.user?.mobileNumber,
        dateOfBirth: this.user?.dateOfBirth,
        gender: this.user?.gender,
        pinCode: this.user?.pinCode,
        state: this.user?.state,
        address: this.user?.address,
      });
    });
  }
  onUpdateUserDetails() {
    let user = this.userForm.value;
    user.userId = this.user?.userId;
    user.password = this.user?.password;
    this.userService
      .updateUser(this.user?.id ?? '', user)
      .subscribe((data) => {});
  }
}
