import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesListComponent } from './articles-list.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { feedTypeParam, globalFeedPathParam } from './articles.types';
import { ArticleMetaModule } from '../components/article-meta/article-meta.module';


@NgModule({
  declarations: [ArticlesListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: `feed/${globalFeedPathParam}`
      },
      {
        path: `feed/:${feedTypeParam}`,
        component: ArticlesListComponent,
      }
    ]),
    ComponentsModule,
    ArticleMetaModule
  ]
})
export class ArticlesListModule {}
