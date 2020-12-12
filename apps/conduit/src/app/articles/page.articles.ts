import { HttpClient, HttpParams } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { map, retry, startWith, take, withLatestFrom } from 'rxjs/operators';
import { articlesFeedURL, articlesURL, tagsURL } from '../core/api-urls';
import { Loadable } from '../core/loadable';
import { ArticlesPreviewResponse, TagsResponse } from '../core/types';
import { ArticlePreview, Feed, mapToArticlePreview } from './articles.types';
import { stringIsNotEmpty } from '../core/string-is-empty';
import { of } from 'rxjs';
import { onErrorStatus, onUnhandledError, onUnhandledErrorDefault } from '../core/error-matchers';
import { NotifyUser } from '../core/notify-user';
import { Router } from '@angular/router';
export interface ArticlesFilter {
  tag?: string | string[]; //=AngularJS

  //Filter by author:
  author?: string; //=jake

  //Favorited by user:
  favorited?: string; //=jake

  //Limit number of articles (default is 20):
  limit: string; //=20

  //Offset/skip number of articles (default is 0):
  offset?: string; //=0

  [param: string]: string | string[];
}

export const reset = 'reset';

export const defaultLimit = '5';

@Injectable({ providedIn: 'root' })
export class PageArticles {
  tags = new Loadable<string[]>();
  articles = new Loadable<ArticlePreview[]>();
  filter: ArticlesFilter;

  constructor(
    private readonly http: HttpClient,
    private readonly notify: NotifyUser,
    private readonly handler: ErrorHandler,
    private readonly router: Router
    ) {}

  onEnterPage(type: Feed) {
    this.tags.clearCache();
    this.tags.load(() =>
      this.http
        .get<TagsResponse>(tagsURL)
        .pipe(map((r) => r.tags.filter(stringIsNotEmpty)))
    );

    // initially reset the articles then we'll load more on demand
    this.loadArticles(null, reset, type);
  }

  private loadArticles(filter?: ArticlesFilter, doReset?: typeof reset, type: Feed = 'global' ) {
    this.filter = filter || { limit: defaultLimit };

    if (doReset === reset) {
      this.articles.clearCache();
      // start with an empty array
      this.articles.load(() => of([]));
    }

    this.articles.data$.pipe(take(1)).subscribe(current => {
      this.articles.clearCache();
      this.articles.load(() =>
        this.http
          .get<ArticlesPreviewResponse>(type === 'global' ? articlesURL : articlesFeedURL, { params: this.filter })
          .pipe(
            retry(2),
            map(mapToArticlePreview),
            map(next => [...current, ...next]),
            onErrorStatus(401, e => {
               // navigate to login and back here
              this.notify.error('Unauthorized!', 'Go to login?', () => this.router.navigateByUrl('/login?redirectTo='));
            }),
            onUnhandledError(e => {
              // reload the current articles back to the loadable
              this.articles.clearCache();
              this.articles.load(() => of(current));
              this.handler.handleError(e);
              this.notify.error('Articles fetch failed!');
            })
        )
      )
    });
  }

  onLeavePage() {}

  onLoadMoreArticles() {
    const filter =
      this.filter && isValidNumber(this.filter.offset)
        ? {
            ...this.filter,
            offset: `${
              parseInt(this.filter.offset, 10) + parseInt(defaultLimit, 10)
            }`,
          }
        : { offset: '0', limit: defaultLimit };
    this.loadArticles(filter);
  }
}

function isValidNumber(v: any): v is number {
  return v != null && (!isNaN(v) || !isNaN(parseInt(v, 10)));
}
