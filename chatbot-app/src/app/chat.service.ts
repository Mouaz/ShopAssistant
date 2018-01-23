import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
//import { ChatMessage } from './ChatMessage';

@Injectable()
export class ChatService {
   private _chatturl='http://localhost:8081/chat?msg=';
   constructor(private _http: Http){}
     
   getMsg(inp): Observable<any> {
       if(inp=='')
       inp = 'hi';
       let response = this._http.get(this._chatturl+inp).map((response: Response) => response.text());
    //    return response; ;
      return response;
    //   .map((response: Response) => response.json())
    //   .do(data => console.log(JSON.stringify(data)));
   }
}