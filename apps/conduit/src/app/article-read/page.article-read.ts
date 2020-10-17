import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Loadable } from '../core/loadable';
import { articlesURL } from '../core/api-urls';
import { ArticleDetails } from './article-read.types';
import { map, switchMap, take } from 'rxjs/operators';
import { onErrorStatus, onUnhandledErrorDefault } from '../core/error-matchers';
import { NotifyUser } from '../core/notify-user';
import { Router } from '@angular/router';

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
  onFavoriteRequest() {
    this.article.data$
      .pipe(
        take(1),
        switchMap((a) => {
          return this.http.post(`${articlesURL}/${a.slug}/favorite`, {});
        }),
        onErrorStatus(401, (e) => {
          this.notify.error(
            'Authentication required',
            'Need to login to favorite this article',
            {
              title: 'Take you to login?',
              cb: () => {
                this.router.navigateByUrl('/login');
              },
            }
          );
        }),
        onUnhandledErrorDefault(
          this.error,
          this.notify,
          'Could not favorite article',
          'What can you do - nothging?'
        )
      )
      .subscribe();
  }
  onUnfavoriteRequest() {
    this.article.data$
      .pipe(
        take(1),
        switchMap((a) => {
          return this.http.post(`${articlesURL}/${a.slug}/unfavorite`, {});
        }),
        onErrorStatus(401, (e) => {
          this.notify.error(
            'Authentication required:',
            'Need to login to favorite this article',
            {
              title: 'Take you to login?',
              cb: () => {
                this.router.navigateByUrl('/login');
              },
            }
          );
        }),
        onUnhandledErrorDefault(
          this.error,
          this.notify,
          'Could not unfavorite article'
        )
      )
      .subscribe();
  }

  onUnfollowAuthorRequest() {
    throw new Error('Method not implemented.');
  }
  onFollowAuthorRequest() {
    throw new Error('Method not implemented.');
  }
}
