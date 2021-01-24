import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ArticleDetails } from './article-read.types';
import { PageArticleRead } from "./page.article-read";
@Component({
  selector: 'rpp-article-read',
  templateUrl: './article-read.component.html',
  styleUrls: ['./article-read.component.scss']
})
export class ArticleReadComponent implements OnInit {
  article$: Observable<ArticleDetails>;
  articleLoading$: Observable<boolean>;

  constructor(private readonly route: ActivatedRoute, private readonly page: PageArticleRead) { }

  ngOnInit(): void {
    this.page.onPageEnter(this.route.snapshot.params['id']);
    this.articleLoading$ = this.page.article.loading$;
    this.article$ = this.page.article.data$;
  }
}
