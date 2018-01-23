import { Component } from '@angular/core';
import { ChatService } from './chat.service';
import { Http , Response } from '@angular/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ChatService]
})
export class AppComponent {
  title = 'Chat with us';
  response: String;
  request: String;
  msgs = [];
  clicked(event) { 
    this.msgs.push(this.request+'');
    this._chatService.getMsg(this.request)
      .subscribe(response => {this.response = response;
        this.msgs.push(this.response+'');});
 } 
   constructor(private _chatService: ChatService) {
   }
   /*
   ngOnInit() : void {
      this._chatService.getMsg('hi')
      .subscribe(response => {this.response = response});
   }*/
}
