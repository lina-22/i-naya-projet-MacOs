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
  constructor() { }
}
