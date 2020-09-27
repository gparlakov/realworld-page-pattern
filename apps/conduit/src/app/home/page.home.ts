import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Loadable } from '../core/loadable';
import { tagsURL } from '../core/api-url';
import { TagsResponse } from '../core/types';
import { map } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class PageHome {
  public tags = new Loadable<string[]>();

  constructor(private readonly http: HttpClient) {}

  onEnterPage() {
    this.tags.clearCache();
    this.tags.load(() =>
      this.http.get<TagsResponse>(tagsURL).pipe(map((r) => r.tags))
    );
  }

  onLeavePage() {
    this.tags.clearCache();
  }
}
