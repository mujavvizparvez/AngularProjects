import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  successMessageEvent = new EventEmitter<string>();
  errorMessageEvent = new EventEmitter<string>();

  setSuccessMessage(message: string) {
    this.successMessageEvent.emit(message);
    this.removeMessageTimer();
  }

  setErrorMessage(message: string) {
    this.errorMessageEvent.emit(message);
    this.removeMessageTimer();
  }

  removeMessageTimer() {
    setTimeout(() => {
      this.successMessageEvent.emit('');
      this.errorMessageEvent.emit('');
    },5000)
  }
}
