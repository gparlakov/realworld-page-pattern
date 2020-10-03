import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { articlesURL, tagsURL } from '../core/api-urls';
import { Loadable } from '../core/loadable';
import { ArticlesPreviewResponse, TagsResponse } from '../core/types';
import { ArticlePreview } from './articles.types';
import { stringIsNotEmpty } from '../core/string-is-empty';

@Injectable({ providedIn: 'root' })
export class PageArticles {
  public tags = new Loadable<string[]>();
  public articles = new Loadable<ArticlePreview[]>();

  constructor(private readonly http: HttpClient) {}

  onEnterPage() {
    this.tags.clearCache();
    this.tags.load(() =>
      this.http
        .get<TagsResponse>(tagsURL)
        .pipe(map((r) => r.tags.filter(stringIsNotEmpty)))
    );

    this.articles.clearCache();
    this.articles.load(() =>
      this.http.get<ArticlesPreviewResponse>(articlesURL).pipe(
        map((a) =>
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
          }))
        )
      )
    );
  }

  onLeavePage() {
    this.tags.clearCache();
  }
}
