import { Component, HostBinding, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleMetaService } from "./article-meta.service";
import { ArticleMeta, ArticleMetaInput } from './article-meta.types';

@Component({
  selector: 'rpp-article-meta',
  templateUrl: './article-meta.component.html',
  styleUrls: ['./article-meta.component.scss'],
  providers: [ArticleMetaService]
})
export class ArticleMetaComponent {

  @Input()
  set article(value: ArticleMetaInput) {
    this.f.onArticleInput(value);
  };
  article$: Observable<ArticleMeta>;

  @HostBinding('class')
  className: 'article-meta';

  constructor(private f: ArticleMetaService) {
    this.article$ = f.article$;
  }

  onFollowAuthorButton() {
    this.f.onFollowAuthorRequest()
  }

  onUnfollowAuthorButton() {
    this.f.onUnfollowAuthorRequest();
  }

  onFavoriteButton() {
    this.f.onFavoriteRequest();
  }
  onUnfavoriteButton() {
    this.f.onUnfavoriteRequest();
  }

}
