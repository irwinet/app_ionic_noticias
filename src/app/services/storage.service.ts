import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  private _localArticles: Article[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async saveRemoveArticle(article: Article){
    const exists = this._localArticles.find(x => x.title === article.title);

    if(exists){
      this._localArticles = this._localArticles.filter(x => x.title !== article.title);
    }
    else{
      this._localArticles = [article, ...this._localArticles];
    }

    this._storage.set('articles', this._localArticles);
  }

}
