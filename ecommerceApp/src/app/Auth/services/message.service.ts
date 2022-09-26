import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  // sendMessage = new EventEmitter<any>

  // giveSendMessage(message:string) {
  //     this.sendMessage.emit(message)
  // }

  successMessageEvent = new EventEmitter<string>();
  setSuccessMessage(message: string) {
    this.successMessageEvent.emit(message);
  }
}
