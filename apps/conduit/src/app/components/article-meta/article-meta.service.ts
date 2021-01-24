import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { articlesURL, followURL } from '../../core/api-urls';
import {
  onErrorStatus,
  onUnhandledErrorDefault
} from '../../core/error-matchers';
import { NotifyUser } from '../../core/notify-user';
import { } from './article-meta.component';
import { ArticleMeta, ArticleMetaInput } from './article-meta.types';

@Injectable()
export class ArticleMetaService {
  private _article$ = new BehaviorSubject<ArticleMeta>(null);
  public article$ = this._article$.asObservable();

  constructor(
    private error: ErrorHandler,
    private notify: NotifyUser,
    private router: Router,
    private http: HttpClient
  ) {}

  onArticleInput(a: ArticleMetaInput) {
    this._article$.next({
      slug: a.slug,
      author: typeof a.author === 'string'? a.author : a.author.username,
      authorImage: 'profileImg' in a ? a.profileImg : a.author.image,
      likes: 'likes' in a ? a.likes : a.favoritesCount,
      following: 'favorited' in a ? a.favorited : false
    });
  }

  onFavoriteRequest() {
    return this.http
      .post(`${articlesURL}/${this._article$.value.slug}/favorite`, {})
      .pipe(
        onErrorStatus(401, () => {
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
        ),
        take(1)
      )
      .subscribe(() => {
        const c = this._article$.value;
        this._article$.next({
          ...c,
          following: false,
          likes: isNaN(c.likes) ? 0 : c.likes + 1,
        });
      });
  }
  onUnfavoriteRequest() {
    return this.http
      .delete(`${articlesURL}/${this._article$.value.slug}/favorite`, {})
      .pipe(
        onErrorStatus(401, () => {
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
        ),
        take(1)
      )
      .subscribe(() => {
        const c = this._article$.value;
        this._article$.next({
          ...c,
          following: false,
          likes: isNaN(c.likes) ? 0 : c.likes - 1,
        });
      });
  }

  onUnfollowAuthorRequest() {
    this.http
      .delete(followURL(this._article$.value.author), {})
      .pipe(
        onErrorStatus(401, () => {
          this.notify.error(
            'Authentication required:',
            'Need to login to unfollow this author',
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
          'Could not follow author'
        ),
        take(1)
      )
      .subscribe(() => {
        const a = this._article$.value;
        this._article$.next({
          ...a,
          following: false,
        });
      });
  }
  onFollowAuthorRequest() {
    return this.http
      .post(followURL(this._article$.value.author), {})
      .pipe(
        onErrorStatus(401, () => {
          this.notify.error(
            'Authentication required:',
            'Need to login to follow this author',
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
          'Could not unfollow author'
        ),
        take(1)
      )
      .subscribe(() => {
        const a = this._article$.value;
        this._article$.next({
          ...a,
          following: true,
        });
      });
  }
}
