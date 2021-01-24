export type ArticleMetaInput  = {
  slug: string;
  favoritesCount: number;
  favorited: boolean;
  author?: {
    username: string; // "jake",
    following: boolean;
    image: string;
  };
} | {
  slug: string;// "2016-02-18T03:22:56.637Z",
  likes: number;
  author: string;
  profileImg: string;
}


export interface ArticleMeta {
  slug: string;
  likes: number;
  author: string;
  authorImage: string;
  following: boolean;
}
