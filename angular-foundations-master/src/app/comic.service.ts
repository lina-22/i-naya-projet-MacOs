import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { COMIC, COMICS } from "./data";
import { Comic } from "./model";

@Injectable({
  providedIn: "root",
})
export class ComicService {
  // marvel api -
  private publicKey = environment.apiKey;
  private privateKey = environment.privateKey;
  private hash = environment.hash;
  private apiBaseURL = "https://gateway.marvel.com/comics";
  private ext = "characters";

  private completeUrl = "https://gateway.marvel.com/v1/public/comics?ts=1700602408992&apikey=6bcf208e93d99f2987f7778dd2ee17a5&hash=1ad229f40d63f41474eca55bc55af188"

  private key = environment.apiKey;
  private api = environment.baseUrl;

  getComics(): Observable<Comic[]> {
    return of(COMICS);
  }
  constructor(private http: HttpClient) {}

  getItems(url: string): Observable<object> {
    return this.http.get(url);
  }

  getComicsApi(): Observable<any> {
    return this.http.get<any>(
      this.completeUrl
    );
  }
}
