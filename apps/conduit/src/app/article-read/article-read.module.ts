import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleReadComponent } from './article-read.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { ArticleMetaComponent } from './article-meta/article-meta.component';

@NgModule({
  declarations: [ArticleReadComponent, ArticleMetaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: ArticleReadComponent
    }]),
    ComponentsModule
  ],
  exports: [RouterModule]
})
export class ArticleReadModule { }
