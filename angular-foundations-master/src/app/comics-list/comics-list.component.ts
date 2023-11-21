import { Component, OnInit } from '@angular/core';
import { COMIC, COMICS } from '../data';
import { Comic, SimpleComic } from '../model';

@Component({
  selector: 'app-comics-list',
  templateUrl: './comics-list.component.html',
  styleUrls: ['./comics-list.component.css']
})
// export class ComicsListComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

// export class ComicsListComponent {
//   comic: SimpleComic = {
//   id: 21464,
//   title: 'Powers (2000)',
//   issueNumber: 18,
//   thumbnail: 'image/image_not_available.jpg',
//   price: 3.45,
//   description: 'Walker and Pilgrim investigate...'
//   }
  export class ComicsListComponent {
    // comic: SimpleComic = COMIC;
    comics: Comic[] = COMICS; 
    
  }
