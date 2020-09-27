import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PageHome } from './page.home';
@Component({
  selector: 'rpp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tags$: Observable<string[]>;
  tagsLoading$: Observable<boolean>;

  constructor(private page: PageHome) {}

  ngOnInit() {
    this.tags$ = this.page.tags.data$;
    this.tagsLoading$ = this.page.tags.loading$;
    this.page.onEnterPage();
  }
}
