import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ArticlePreview, feedTypeParam } from './articles.types';
import { PageArticles } from './page.articles';
@Component({
  selector: 'rpp-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
})
export class ArticlesListComponent implements OnInit, OnDestroy {
  tags$: Observable<string[]>;
  tagsLoading$: Observable<boolean>;
  articles$: Observable<ArticlePreview[]>;
  articlesLoading$: Observable<boolean>;
  destroy$: Subject<void> = new Subject();

  constructor(private page: PageArticles, private readonly route: ActivatedRoute) {}

  ngOnInit() {
    this.tags$ = this.page.tags.data$;
    this.tagsLoading$ = this.page.tags.loading$;

    this.articles$ = this.page.articles.data$;
    this.articlesLoading$ = this.page.articles.loading$;

    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(p => {
      this.page.onEnterPage(p[feedTypeParam]);
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  onLoadMoreButton(){
    this.page.onLoadMoreArticles();
  }
}
