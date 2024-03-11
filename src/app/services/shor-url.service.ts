import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShorUrlService {
  url : string = "https://api-ssl.bitly.com/v4/shorten"

  constructor(private http : HttpClient) {

  }

  convertToUrlShort(nameUrl : string) : Observable<any> {
    const body = {
      long_url : nameUrl
    }
    return this.http.post(this.url, body);
  }
}
