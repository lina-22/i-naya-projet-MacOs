import { Injectable } from '@angular/core';
import { COMIC, COMICS } from './data';

@Injectable({
  providedIn: 'root'
})
export class ComicService {
  getComics(){
    return COMICS;
  }
  constructor() { }
}
