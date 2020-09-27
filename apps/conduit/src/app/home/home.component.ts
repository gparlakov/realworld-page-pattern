import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticlePreview } from './home.types';
import { PageHome } from './page.home';
@Component({
  selector: 'rpp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tags$: Observable<string[]>;
  tagsLoading$: Observable<boolean>;
  articles$: Observable<ArticlePreview[]>;
  articlesLoading$: Observable<boolean>;

  constructor(private page: PageHome) {}

  ngOnInit() {
    this.tags$ = this.page.tags.data$;
    this.tagsLoading$ = this.page.tags.loading$;
    this.articles$ = this.page.articles.data$;
    this.articlesLoading$ = this.page.articles.loading$;
    this.page.onEnterPage();
  }
}
