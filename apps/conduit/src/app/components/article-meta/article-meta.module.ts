import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleMetaComponent } from './article-meta.component';

@NgModule({
  declarations: [ArticleMetaComponent],
  exports: [ArticleMetaComponent],
  imports: [
    CommonModule
  ]
})
export class ArticleMetaModule { }
