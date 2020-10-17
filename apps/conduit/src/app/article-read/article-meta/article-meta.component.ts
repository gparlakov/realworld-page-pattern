import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticleDetails } from '../article-read.types';

@Component({
  selector: 'rpp-article-meta',
  templateUrl: './article-meta.component.html',
  styleUrls: ['./article-meta.component.scss']
})
export class ArticleMetaComponent implements OnInit {

  @Input()
  article: ArticleDetails;

  @Output()
  favorite = new EventEmitter();

  @Output()
  unfavorite = new EventEmitter();

  @Output()
  follow = new EventEmitter();

  @Output()
  unfollow = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onFollowAuthorButton() {
    this.follow.emit();
  }
  onUnfollowAuthorButton() {
    this.unfollow.emit();
  }

  onFavoriteButton() {
    this.favorite.emit();
  }
  onUnfavoriteButton() {
    this.unfavorite.emit();
  }

}
