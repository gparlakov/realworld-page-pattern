import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { articlesURL } from '../core/api-urls';
import { Loadable } from '../core/loadable';
import { NotifyUser } from '../core/notify-user';
import { ArticleDetails } from './article-read.types';

@Injectable({ providedIn: 'root' })
export class PageArticleRead {

  public article = new Loadable<ArticleDetails>();

  constructor(
    private readonly http: HttpClient,
    private error: ErrorHandler,
    private notify: NotifyUser,
    private router: Router
  ) {}

  onPageEnter(slug: string) {
    this.article.clearCache();
    this.article.load(() =>
      this.http
        .get<{ article: ArticleDetails }>(`${articlesURL}/${slug}`)
        .pipe(map((a) => a.article))
    );
  }
}
