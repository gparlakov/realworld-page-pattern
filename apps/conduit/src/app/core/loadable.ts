import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

export class Loadable<T> {
  private _raw$ = new BehaviorSubject<LoadableOf<T>>({ status: 'initial' });
  raw$ = this._raw$.asObservable();

  data$ = this._raw$.pipe(
    filter(isLoaded),
    map((d: Loaded<T>) => d.value)
  );

  loading$ = this._raw$.pipe(map((d) => d.status === 'loading'));
  loadFn: () => Observable<T>;

  load(loadFn: () => Observable<T>) {
    this.loadFn = () => loadFn();
    const { status } = this._raw$.value;
    if (status !== 'loading' && status !== 'loaded') {
      this._raw$.next({ status: 'loading' });
      loadFn()
        .pipe(take(1))
        .subscribe({
          next: (v) => this._raw$.next({ status: 'loaded', value: v }),
          error: (e) => this._raw$.next({ status: 'errored', error: e }),
          complete: () => {},
        });
    }
  }

  reload() {
    this.clearCache();
    this.load(() => this.loadFn());
  }

  clearCache() {
    this._raw$.next({ status: 'initial' });
  }
}

export type Status = 'initial' | 'loading' | 'loaded' | 'errored';

export interface Initial {
  status: 'initial';
}

interface Loading {
  status: 'loading';
}

interface Loaded<T> {
  status: 'loaded';
  value: T;
}

interface Errored {
  status: 'errored';
  error: Error | HttpErrorResponse;
}

type LoadableOf<T> = Initial | Loading | Loaded<T> | Errored;

function isLoaded<T>(obj: any): obj is Loaded<T> {
  return obj != null && obj.status === 'loaded';
}
function isLoading<T>(obj: any): obj is Loading {
  return obj != null && obj.status === 'loading';
}
function isErrored<T>(obj: any): obj is Errored {
  return obj != null && obj.status === 'errored';
}
