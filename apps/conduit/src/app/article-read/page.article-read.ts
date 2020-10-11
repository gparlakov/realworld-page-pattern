import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Loadable } from '../core/loadable';
import { articlesURL } from '../core/api-urls';
import { ArticleDetails } from './article-read.types';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PageArticleRead {
  public article = new Loadable<ArticleDetails>();

  constructor(private readonly http: HttpClient) {}

  onPageEnter(slug: string) {
    this.article.clearCache();
    this.article.load(() =>
      this.http
        .get<{ article: ArticleDetails }>(`${articlesURL}/${slug}`)
        .pipe(map((a) => a.article))
    );
  }
}
