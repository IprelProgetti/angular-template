import { Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { mergeMap, map, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataInjectionService {
  // TODO: read config file
  private inputTopic = "Mix";
  private url = 'http://localhost:8091';
  private socket: any;
  
  @Output()
  public data: Observable<any>;

  private getLiveDataSource(): Observable<any>{
    let observable = new Observable<any>(observer => {
      this.socket = io(this.url);
      this.socket.on(this.inputTopic, (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    })
    return observable;
  }

  constructor() {
    this.data = this.getLiveDataSource();
  }

  
  public getTopic(topicName:string): Observable<any>{
    return this.data.pipe(
      // switchMap
      map((msg)=>{ 
        var content = JSON.parse(msg.y);
        return content[topicName];
      })
    );
  }

}
