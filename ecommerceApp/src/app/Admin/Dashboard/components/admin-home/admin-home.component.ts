import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Auth/services/auth.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    
  }

}
