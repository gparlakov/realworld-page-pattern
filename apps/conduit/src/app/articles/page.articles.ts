import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, startWith, take, withLatestFrom } from 'rxjs/operators';
import { articlesURL, tagsURL } from '../core/api-urls';
import { Loadable } from '../core/loadable';
import { ArticlesPreviewResponse, TagsResponse } from '../core/types';
import { ArticlePreview } from './articles.types';
import { stringIsNotEmpty } from '../core/string-is-empty';
import { of } from 'rxjs';
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

  constructor(private readonly http: HttpClient) {}

  onEnterPage() {
    this.tags.clearCache();
    this.tags.load(() =>
      this.http
        .get<TagsResponse>(tagsURL)
        .pipe(map((r) => r.tags.filter(stringIsNotEmpty)))
    );

    this.loadArticles(null, reset);
  }

  private loadArticles(filter?: ArticlesFilter, doReset?: typeof reset) {
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
          .get<ArticlesPreviewResponse>(articlesURL, { params: this.filter })
          .pipe(
            map(this.mapToArticlePreview()),
            map(next => [...current, ...next])
          )
      );
    });
  }

  private mapToArticlePreview(): (
    value: ArticlesPreviewResponse,
    index: number
  ) => {
    profileImg: string;
    author: string;
    publishedOn: string;
    likes: number;
    slug: string;
    title: string;
    shortDescription: string;
  }[] {
    return (a) =>
      a.articles.map((ar) => ({
        profileImg: ar?.author?.image || 'generic-image',
        author: ar?.author?.username || 'unknown author',
        publishedOn: ar?.createdAt,
        likes: ar?.favoritesCount,
        slug: ar.slug,
        title: ar.title,
        shortDescription:
          typeof ar.description === 'string'
            ? ar.description.slice(
                0,
                ar.description.length > 400 ? 400 : ar.description.length
              )
            : '-',
      }));
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
