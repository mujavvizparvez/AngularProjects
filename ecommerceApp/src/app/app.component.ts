import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from './Auth/services/auth.service';
import { MessageService } from './Auth/services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ecommerceApp';
  isAdmin = false;
  errorMessage: string = '';
  successMessage: string = '';
  // enteredSearchValue: string = '';
  searchText: string = '';

  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.authService.getUserDetailsFromLocalStorage();
    this.messageService.errorMessageEvent.subscribe((data) => {
      this.errorMessage = data;
    });
    this.messageService.successMessageEvent.subscribe((data) => {
      this.successMessage = data;
    });
  }
  // @Output()
  // searchTextChanged: EventEmitter<string> = new EventEmitter<string>();
  // onSearchTextEntered(searchValue: string) {
  //   this.searchText = searchValue;
  //   console.log(this.searchText);
  // }
}
