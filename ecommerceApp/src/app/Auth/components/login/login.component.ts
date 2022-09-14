import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUserDetais } from '../../models/IUserDeatails';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // userDetails!: IUserDetais;
  adminEmail = 'shaikh1@gmail.com';
  password = 123567;
  loginForm = this.fb.group({
    email: ['',Validators.required],
    password: ['',Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  onLogin() {
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    if (email && password) {
      this.authService.login(email, password).subscribe((data) => {
        this.authService.userDetails = data;
        this.authService.loggedInEvent.emit(true);
        this.router.navigate(['/admin']);
        console.log(data);
      });
    }
  }
}
