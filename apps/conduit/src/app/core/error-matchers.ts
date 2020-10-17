import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler } from '@angular/core';
import { isObservable, Observable, of, OperatorFunction, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotifyUser } from './notify-user';

export function errorMatcher(e) {
    return {
        isNullOrUndefined(): boolean {
            return e == null;
        },
        matchesString(s: string): boolean {
            return e === s || typeof e === 'string' && e.includes(s);
        },
        matchesStatus(s: number): boolean {
            return e != null && e.status === s;
        },
        matchesStatusAndMessage(s: number, message: string): boolean {
            return e != null &&
                e.status === s &&
                e.error != null &&
                typeof e.error.message === 'string' &&
                e.error.message.includes(message);
        }
    };
}

export function onUnhandledError<T>(cb: (e: Error | HttpErrorResponse) => Observable<T> | void): OperatorFunction<T, T> {
    if (typeof cb !== 'function') {
        throw new Error('Pass in a function callback for matching case');
    }
    return (e$: Observable<T>): Observable<T> => e$.pipe(
        catchError((e) => {
            const r = cb(e);
            return isObservable(r) ? r : of(<T>{});
        })
    );
}

export function onUnhandledErrorDefault<T>(
    handler: ErrorHandler, notify: NotifyUser, messageTitle: string, messageBody?: string, value: T = <T>{}
): OperatorFunction<T, T> {
    return (e$: Observable<T>): Observable<T> => e$.pipe(
        catchError((e) => {
            notify.error(messageTitle || 'Failure!', messageBody || 'An error occurred. We\'ll get notified and fix it soon!');
            handler.handleError(e || new Error('Missing error so we added one for the call stack.'));
            return of(value);
        })
    );
}

export function onErrorStatus<T>(status: number, cb: (e: Error | HttpErrorResponse) => Observable<T> | void): OperatorFunction<T, T> {
    if (typeof cb !== 'function') {
        throw new Error('Pass in a function callback for matching case');
    }
    return (e$: Observable<T>): Observable<T> => e$.pipe(
        catchError(e => {
            const m = errorMatcher(e);
            if (m.matchesStatus(status)) {
                const r = cb(e);
                return isObservable(r) ? r : of(<T>{});
            }
            return throwError(e);
        })
    );
}

export function onError<T>(
    status: number,
    message: string,
    cb: (e: Error | HttpErrorResponse) => Observable<T> | void
): OperatorFunction<T, T> {
    if (typeof cb !== 'function') {
        throw new Error('Pass in a function callback for matching case');
    }
    return (e$: Observable<T>): Observable<T> => e$.pipe(
        catchError(e => {
            const m = errorMatcher(e);
            if (m.matchesStatusAndMessage(status, message)) {
                const r = cb(e);
                return isObservable(r) ? r : of(<T>{});
            }
            return throwError(e);
        })
    );
}
