import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    mobileNumber: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  onRegister() {
    // const fullName = this.registerForm.value.fullName;
    // const mobileNumber = this.registerForm.value.mobileNumber;
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    if (email && password) {
      this.authService.register(email, password).subscribe((data) => {
        console.log(data);
      });
    }
  }
}
