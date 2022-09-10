import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  isLoggedIn = false;
  ngOnInit(): void {
    this.isLoggedIn = this.authService.userDetails ? true : false;
    this.authService.loggedInEvent.subscribe((data) => {
      this.isLoggedIn = data;
    });
  }
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
