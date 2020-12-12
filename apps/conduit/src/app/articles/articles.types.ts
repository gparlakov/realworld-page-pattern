import { ArticlesPreviewResponse } from '../core/types';

export interface ArticlePreview {
  profileImg: string;
  author: string;
  publishedOn: string;
  likes: number;
  slug: string;
  title: string;
  shortDescription: string;
}

export const feedTypeParam = 'type';
export const globalFeedPathParam = 'global';
export const myFeedPathParam = 'my';
export type Feed = typeof globalFeedPathParam | typeof myFeedPathParam;

export function mapToArticlePreview(value: ArticlesPreviewResponse): ArticlePreview[] {
  return value.articles.map((ar) => ({
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
