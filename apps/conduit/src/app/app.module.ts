import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { globalFeedPathParam } from './articles/articles.types';
import { UglyTemporaryUserNotificationsImplementBetterOneWithAToast } from './core/notify-user';
import { TokenInterceptor } from "./core/token.interceptor";


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
        path: 'login',
        loadChildren: () =>
          import('./login/login.module').then((h) => h.LoginModule),
      },
      {
        path: 'register',
        loadChildren: () =>
          import('./register/register.module').then((h) => h.RegisterModule),
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
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(h: UglyTemporaryUserNotificationsImplementBetterOneWithAToast) {
    console.log('we just need this to start logging messages', h)
  }
}
