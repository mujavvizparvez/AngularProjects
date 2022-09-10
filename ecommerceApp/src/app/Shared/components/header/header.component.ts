import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.userDetails ? true : false;
    this.authService.loggedInEvent.subscribe((data) => {
      this.isLoggedIn = data;
    });
  }
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
