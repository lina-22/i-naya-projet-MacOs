import { Component } from '@angular/core';
import { TabService } from '../tab.service';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.css']
})
export class TabBarComponent { 
  selectedIndex: number=0; 
  isSelected(index: number): boolean{
    if (index ==this.selectedIndex){
      return true;
    }else
    return false;
  }

  select(index: number, title:string){
    this.selectedIndex=index;
    this.tabService.changeTitle(title);
  }

  constructor(private tabService:TabService){

  }
}
