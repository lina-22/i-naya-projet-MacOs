import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { COMIC, COMICS } from './data';
import { Comic } from './model';

@Injectable({
  providedIn: 'root'
})
export class ComicService {
  getComics():Observable<Comic[]>{
    return of(COMICS);
  }
  constructor(private http:HttpClient) { }

  getItems(url: string): Observable<object> {
    return this.http.get(url, );
  }
}
