import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/Dashboard/models/IUser';
import { UserService } from 'src/app/Dashboard/services/users.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {
  user!: IUser;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe((data) => {
    })
  }

}
