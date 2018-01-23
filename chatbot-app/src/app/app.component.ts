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
  response: Response;
   constructor(private _chatService: ChatService) {
   }
   
   ngOnInit() : void {
      this._chatService.getMsg()
      .subscribe(response => {this.response = response});
   }
}
