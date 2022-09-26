import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

getTopHeadLines(){
  return this.http.get(`https://newsapi.org/v2/everything?q=tesla&from=2022-08-26&sortBy=publishedAt`, {
    params: {
      apiKey
    }
  });
}
}
