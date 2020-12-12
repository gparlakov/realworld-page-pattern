import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, UrlSegment } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UglyTemporaryUserNotificationsImplementBetterOneWithAToast } from './core/notify-user';
import { globalFeedPathParam } from './articles/articles.types';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'article/:id',
        loadChildren: () =>
          import('./article-read/article-read.module').then(
            (h) => h.ArticleReadModule
          ),
      },
      {
        path: 'articles',
        loadChildren: () =>
          import('./articles/articles-list.module').then((h) => h.ArticlesListModule),
      },
      {
        path: '',
        redirectTo: `/articles/feed/${globalFeedPathParam}`,
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: '',
      },
    ]),

    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(h: UglyTemporaryUserNotificationsImplementBetterOneWithAToast) {
    console.log('we just need this to start logging messages', h)
  }
}
