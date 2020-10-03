import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, withLatestFrom } from 'rxjs/operators';
import { articlesURL, tagsURL } from '../core/api-urls';
import { Loadable } from '../core/loadable';
import { ArticlesPreviewResponse, TagsResponse } from '../core/types';
import { ArticlePreview } from './articles.types';
import { stringIsNotEmpty } from '../core/string-is-empty';
export interface ArticlesFilter {
  tag?: 'string'; //=AngularJS

  //Filter by author:
  author?: 'string'; //=jake

  //Favorited by user:
  favorited?: 'string'; //=jake

  //Limit number of articles (default is 20):
  limit: number; //=20

  //Offset/skip number of articles (default is 0):
  offset?: number; //=0
}

export const reset = 'reset';

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

    this.articles.data$.subscribe((v) => console.log(v));
  }

  private loadArticles(filter?: ArticlesFilter, doReset?: typeof reset) {
    this.filter = filter || { limit: 20 };
    this.articles.clearCache();
    this.articles.load(() =>
      this.http
        .get<ArticlesPreviewResponse>(articlesURL, this.doFiltring(filter))
        .pipe(
          map(this.mapToArticlePreview()),
          withLatestFrom(this.articles.data$),
          map(([next, current]) =>
            doReset === reset ? next : [...current, ...next]
          )
        )
    );
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

  private doFiltring(filter?: ArticlesFilter) {
    return filter != null
      ? Object.keys(filter).reduce((params, v) => ({ ...params, ...hasToString(filter[v]) ? {v: filter[v].toString()} : {} }), {})
      : undefined;
  }

  onLeavePage() {}

  onLoadMoreArticles() {
    const filter =
      this.filter && isValidNumber(this.filter.offset)
        ? { ...this.filter, offset: this.filter.offset + 20 }
        : { offset: 0, limit: 20 };
    this.loadArticles(filter);
  }
}

function isValidNumber(v: any): v is number {
  return v != null && (!isNaN(v) || !isNaN(parseInt(v, 10)));
}

function hasToString(v: any): v is { toSting(): string } {
  return v != null && typeof v.toString === 'function';
}
