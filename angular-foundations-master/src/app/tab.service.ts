import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabService {
  titleChangedSource:Subject<string>= new Subject;
  titleChanged$:Observable<String>=new Subject<String>();
  
  changeTitle(title: string){
    this.titleChangedSource.next(title);
  }



  constructor() { }
}
