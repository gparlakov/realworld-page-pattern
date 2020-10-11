import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, UrlSegment } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

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
        path: '',
        loadChildren: () =>
          import('./articles/articles-list.module').then((h) => h.HomeModule),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
