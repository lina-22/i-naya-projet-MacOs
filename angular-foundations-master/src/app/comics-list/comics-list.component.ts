import { Component, OnInit } from '@angular/core';
import { title } from 'process';
import { ComicService } from '../comic.service';
import { COMIC, COMICS } from '../data';
import { Comic, SimpleComic } from '../model';
import { TabService, } from '../tab.service';

@Component({
  selector: 'app-comics-list',
  templateUrl: './comics-list.component.html',
  styleUrls: ['./comics-list.component.css']
})
export class ComicsListComponent implements OnInit {
  comics: Comic[]=[];
  comicsFiltre:Comic[]=[];
  constructor(private tabService:TabService, private comicService: ComicService){
    
  }
  ngOnInit() {
    this.comics =this.comicService.getComics();
    this.comicsFiltre=this.comics;
    this.tabService.titleChangedSource.subscribe (title=>{
      if(title==null||title==undefined||title=="All"){
      console.log(title+"*************************************");
      this.comicsFiltre= this.comics;
    }else {
    
      console.log(title+"*************************************")
      this.comicsFiltre =this.comics.filter(
        el=>el.title.toLowerCase().includes(title.toLowerCase()))} });
 }

}

// export class ComicsListComponent {
//   comic: SimpleComic = {
//   id: 21464,
//   title: 'Powers (2000)',
//   issueNumber: 18,
//   thumbnail: 'image/image_not_available.jpg',
//   price: 3.45,
//   description: 'Walker and Pilgrim investigate...'
//   }
  //export class ComicsListComponent {
    // comic: SimpleComic = COMIC;
   // comics: Comic[] = COMICS; 
   // constructor(tabService:TabService){
      
   // }
    
 // }
