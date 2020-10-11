import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticlePreview } from './articles.types';
import { PageArticles } from './page.articles';
@Component({
  selector: 'rpp-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
})
export class ArticlesListComponent implements OnInit {
  tags$: Observable<string[]>;
  tagsLoading$: Observable<boolean>;
  articles$: Observable<ArticlePreview[]>;
  articlesLoading$: Observable<boolean>;

  constructor(private page: PageArticles) {}

  ngOnInit() {
    this.tags$ = this.page.tags.data$;
    this.tagsLoading$ = this.page.tags.loading$;

    this.articles$ = this.page.articles.data$;
    this.articlesLoading$ = this.page.articles.loading$;
    this.page.onEnterPage();
  }

  onLoadMoreButton(){
    this.page.onLoadMoreArticles();
  }
}
