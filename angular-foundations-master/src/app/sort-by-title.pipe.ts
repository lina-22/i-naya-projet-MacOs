import { Pipe, PipeTransform } from '@angular/core';
import { Comic } from './model';

@Pipe({
  name: 'sortByTitle'
})
export class SortByTitlePipe implements PipeTransform {

  transform(comics: Comic[], args?: any): Comic[] {
    return comics.sort((comic1, comic2) => {
      let byTitle = comic1.title.localeCompare(comic2.title);
      if (byTitle == 0) {
        return comic1.issueNumber - comic2.issueNumber;
      }
      return byTitle;
    });
    
  }
//  "2023-11-01:11h:23m:23s" | date(yy-)//11-01-23 
}
