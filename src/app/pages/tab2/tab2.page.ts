import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public categories: string[] = ['business','entertainment','general','health','science','sports','technology']
  public selectedCategory: string = this.categories[0];
  public articles: Article[] = [];
  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getTopHeadLinesByCategory(this.selectedCategory).subscribe(articles => {
      console.log(articles);
      this.articles = [...articles];
    });
  }

  segmentChanged(category:Event){
    this.selectedCategory = (category as CustomEvent).detail.value;
    // console.log(category.detail.value)

    this.newsService.getTopHeadLinesByCategory(this.selectedCategory).subscribe(articles => {
      console.log(articles);
      this.articles = [...articles];
    });
  }

  loadData(){
    this.newsService.getTopHeadLinesByCategory(this.selectedCategory, true).subscribe(articles => {
      console.log(articles)
      if(articles.length === this.articles.length) {
        this.infiniteScroll.disabled = true;
        // event.target.disabled = true;
        return;
      }
      this.articles = articles;
      this.infiniteScroll.complete();
      // event.target.complete();
    });
  }
}
