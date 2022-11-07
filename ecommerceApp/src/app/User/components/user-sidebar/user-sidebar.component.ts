import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Auth/services/auth.service';
import { IUser } from 'src/app/Dashboard/models/IUser';
import { UserService } from 'src/app/Dashboard/services/users.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css'],
})
export class UserSidebarComponent implements OnInit {
  componentName="user-sidebar"
  user!: IUser;
  constructor(private userService: UserService, private authService: AuthService
  , private router:Router) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe((data) => {});
  }

  onlogout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
  sum(a:number,b:number) {
    return a+b
  }
}
