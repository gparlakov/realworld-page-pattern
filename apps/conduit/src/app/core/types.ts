export interface TagsResponse {
  tags: string[];
}

export interface AuthorResponse {
  username: string; // 'jake';
  bio: string; // 'I work at statefarm';
  image: string; // 'https://i.stack.imgur.com/xHWG8.jpg';
  following: boolean;
}
export interface ArticlePreviewResponse {
  slug: string; //'how-to-train-your-dragon';
  title: string; //'How to train your dragon';
  description: string; //'Ever wonder how?';
  body: string; //'It takes a Jacobian';
  tagList: string[]; // ['dragons', 'training'];
  createdAt: string; // '2016-02-18T03:22:56.637Z';
  updatedAt: string; // '2016-02-18T03:48:35.824Z';
  favorited: boolean;
  favoritesCount: number;
  author: AuthorResponse;
}
export interface ArticlesPreviewResponse {
  articles: ArticlePreviewResponse[];
  articlesCount: 2;
}
