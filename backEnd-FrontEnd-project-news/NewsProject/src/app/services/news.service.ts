import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Source } from '../model/Source';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private api_url = environment.api_url;
  
  constructor(private http: HttpClient) { }


  initSources():Observable<Source[]> {
    return this.http.get<Source[]>(this.api_url);
  }


  initArticles() {
    return this.http.get(this.api_url);  }

  getArticlesByID(source: String) {
    return this.http.get(this.api_url);
    }

}
