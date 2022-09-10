import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    fullName: new FormControl(''),
    mobileNumber: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  onRegister() {
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    if (email && password) {
      this.authService.register(email, password).subscribe((data) => {
        console.log(data);
      });
    }
  }
}
